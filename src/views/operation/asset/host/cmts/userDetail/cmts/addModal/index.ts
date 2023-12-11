/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 18:56:23
 * @LastEditTime: 2023-07-18 14:17:58
 */
import addModal from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { enableUser } from '@/api/operation/user';
import { useModal } from '@/hooks';
import { computed, createVNode } from 'vue';
import { userInfo } from '@/components/userInfo';
import { message } from 'ant-design-vue';
import { useUserToken } from '@/store/modules/user';
import { USERTOKEN } from '@/store/modules/user/type';
export default addModal;
const userTokenStore = useUserToken();
//获取管理员类型 lDAP还是普通
const userType = computed(() => userTokenStore.userInfo);
export const useColumns = (t: any): TableColumn[] => [
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
        disabled: () =>
          userType.value.u_type !== (USERTOKEN.safe as any) &&
          userType.value.u_type !== (USERTOKEN.super as any),
        checked: (record) => record.enable === 1,
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
];
