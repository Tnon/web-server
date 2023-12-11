/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-07-18 14:18:10
 */
import { TableColumn } from '@/types/tableColumn';
import {
  enableUser,
  updateUserPasswordApi,
  updateUserApi,
  batchDelUsers,
} from '@/api/operation/user';
import memberLog from './index.vue';
import { useModal, useValidatePwd } from '@/hooks';
import { computed, createVNode, reactive, unref } from 'vue';
import { userInfo } from '@/components/userInfo';
import { updatePwd } from '@/components/updatePwd';
import { message } from 'ant-design-vue';
import { pCompile } from '@/utils/urlUtils';
import { useUserToken } from '@/store/modules/user';
import { USERTOKEN, UserType } from '@/store/modules/user/type';
import { addModal } from './cmts/addModal';
import loginAuth from './cmts/loginAuth';
import { refreshPermission } from '@/utils/permission';
import { pwdConfirm } from '@/components/pwdConfirm';
const userTokenStore = useUserToken();
//获取管理员类型 lDAP还是普通
const userType = computed(() => userTokenStore.userInfo);

export const useColumns = (t: any, refreshTable): TableColumn[] => [
  {
    title: t('user.name') + '/' + t('user.account'),
    dataIndex: 'email',
    width: 300,
    customRender: ({ record }) =>
      createVNode(userInfo, {
        email: record.email,
        avatar: record.head_image,
        name: record.name,
      }),
  },
  {
    title: t('user.loginauth'),
    dataIndex: 'u_src',
    width: 150,
    customRender: ({ text }) => createVNode(loginAuth, { u_src: text }),
  },
  {
    title: t('user.mobNum'),
    dataIndex: 'mobile',
    width: 150,
  },
  {
    title: t('user.telNum'),
    dataIndex: 'telephone',
    width: 150,
  },
  {
    title: t('log.adminRole'),
    dataIndex: 'role_name',
    width: 150,
  },
  {
    title: t('common.lastLogin'),
    dataIndex: 'last_login_at',
    width: 200,
  },
  {
    title: t('report.creatTime'),
    dataIndex: 'created_at',
    width: 200,
  },
  {
    title: t('user.enaStu'),
    dataIndex: 'enable',
    width: 100,

    actions: [
      {
        type: 'switch',
        checked: (record) => record.enable === 1,
        //三权分立 安全管理员可编辑启用状态
        disabled: (record) =>
          record.embed ||
          (userType.value.u_type !== (USERTOKEN.safe as any) &&
            userType.value.u_type !== (USERTOKEN.super as any)),
        func: async ({ record }, callback) => {
          useModal(
            {
              title: record.enable === 1 ? t('user.stopAdmin') : t('user.startAdmin'),
              handleOk: async () => {
                const { code } = await enableUser({
                  id: record.id,
                  enable: record.enable === 1 ? 2 : 1,
                });
                if (!code) {
                  record.enable === 1 ? 2 : 1;
                  record.enable === 2
                    ? message.success(t('user.startSuc'))
                    : message.success(t('user.stopSuc'));
                  callback(true);
                }
              },
            },
            createVNode('span'),
          );
        },
      },
    ],
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    fixed: 'right',
    //三权分立
    hidden: !(
      userType.value.u_type === USERTOKEN.admin ||
      userType.value.u_type === USERTOKEN.super ||
      (userType.value.u_type === USERTOKEN.safe && userType.value.embed)
    ),
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: t('user.editMsg'),
            hidden: () =>
              !(
                userType.value.u_type === USERTOKEN.admin ||
                userType.value.u_type === USERTOKEN.super
              ),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('user.editMsg'),
                  contentProps: {
                    formData: reactive({
                      name: record.name,
                      email: record.email,
                      mobile: record.mobile === '-' ? '' : record.mobile,
                      telephone: record.telephone === '-' ? '' : record.telephone,
                      id: record.id,
                    }),
                    formDataExtra: reactive({ u_type: record.u_type, group_id: record.group_id }),
                    isadd: false,
                    disKeys: { email: true, name: record.u_src === UserType.LDAP },
                    isEmbed: record.embed, //是否是内置用户
                  },
                  handleOk: async (conRef) => {
                    await Promise.all([
                      unref(conRef.slotRef).validate(),
                      unref(conRef.extraSlotRef).validate(),
                    ]);
                    const sendForm = conRef.state;
                    const sendFormExtra = conRef.extraSlotRef.state;
                    await updateUserApi({ data: Object.assign({}, sendForm, sendFormExtra) }); // 传参到添加用户
                    if (sendFormExtra.u_src !== record.u_src) {
                      await refreshPermission();
                    }
                    callback(true);
                  },
                },
                addModal,
              );
            },
          },
          {
            text: t('user.updatePwd'),
            //内置安全管理员可修改密码
            // hidden: (record) => !(record.embed && record.u_type === USERTOKEN.safe),
            hidden: () => userType.value.u_type !== (USERTOKEN.safe as any),
            func: ({ record }) => {
              useModal(
                {
                  title: t('user.updatePwd'),
                  handleOk: async (conRef) => {
                    await unref(conRef.slotsForm).validate();
                    const { code } = await updateUserPasswordApi({
                      chpwd: {
                        new: pCompile(conRef.fields.newPassword),
                        old: pCompile(conRef.fields.oldPassword),
                      },
                      id: record.id,
                    });
                    if (code !== undefined) {
                      return Promise.reject('');
                    }
                  },
                },
                updatePwd,
              );
            },
          },
          {
            text: t('common.delete'),
            hidden: () =>
              userType.value.u_type !== (USERTOKEN.admin as any) &&
              userType.value.u_type !== (USERTOKEN.super as any),
            func: ({ record }) => {
              useModal(
                {
                  title: t('user.cfmdeluer'),
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    return useValidatePwd(
                      batchDelUsers,
                      {
                        useridarr: [record.id],
                      },
                      conRef,
                      refreshTable,
                      false,
                    );
                  },
                },
                createVNode(pwdConfirm),
              );
            },
          },
        ],
      },
    ],
  },
];

export { memberLog };
