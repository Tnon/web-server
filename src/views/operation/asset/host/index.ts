/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-04-07 17:37:00
 */
import { useModal } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { StrategyType } from '@/views/strategy/common/types';
import { computed, createVNode, reactive, unref } from 'vue';
import businessDetail from './cmts/businessDetail';
import polictDetail from './cmts/policyDetail';
import userDetail from './cmts/userDetail';
import addModal from './cmts/addModal';
import hostNumber from './cmts/hostNumber';
import { deleteHostGroup, moveHostToBusGroup, renameHostGroup } from '@/api/operation/asset';
import { GROUPENUM } from '@/enums/moveGroup';
import { useUserToken } from '@/store/modules/user';
import { USERTOKEN } from '@/store/modules/user/type';
import delGroupForm from './cmts/delGroupForm';
import businessGroupForm from '../business/cmts/businessGroupForm';
const userTokenStore = useUserToken();
//获取管理员类型 lDAP还是普通
const userType = computed(() => userTokenStore.userInfo);
export const useColumns = (t: any, refreshTable: Function): TableColumn[] => [
  {
    title: t('operation.hostg'),
    dataIndex: 'name',
  },
  {
    //主机数量
    title: t('operation.hostnm'),
    dataIndex: 'host_num',
    customRender: ({ text, record }) =>
      createVNode(hostNumber, {
        hostNumber: text,
        group_id: record.id,
      }),
  },
  {
    title: t('operation.safpo'),
    dataIndex: 'safe_policy',
    customRender: ({ text }) =>
      text
        ? createVNode(polictDetail, {
            policyType: StrategyType.Safe,
            policyName: text.policy_name,
            policyId: text.policy_id,
            policySucc: text.policy_succ,
          })
        : '-',
  },
  {
    title: t('operation.asspo'),
    dataIndex: 'asset_policy',
    customRender: ({ text }) =>
      text
        ? createVNode(polictDetail, {
            policyType: StrategyType.Asset,
            policyName: text.policy_name,
            policyId: text.policy_id,
            policySucc: text.policy_succ,
          })
        : '-',
  },
  {
    title: t('operation.blbs'),
    dataIndex: 'business_group',
    customRender: ({ text }) =>
      text && text.length
        ? createVNode(businessDetail, {
            business_group_name: text[0].name ? text[0].name : '-',
          })
        : '-',
  },
  {
    title: t('operation.admr'),
    dataIndex: 'admin_num',
    customRender: ({ text, record }) =>
      record.id === GROUPENUM.ALL
        ? '-'
        : createVNode(userDetail, {
            userNumber: text,
            group_id: record.id,
            refreshTable,
          }),
  },

  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    fixed: 'right',
    //三权分立
    hidden:
      userType.value.u_type !== (USERTOKEN.admin as any) &&
      userType.value.u_type !== (USERTOKEN.super as any),
    actions: [
      {
        type: 'icon',
        disabled: (record) => record.id === GROUPENUM.UNGROUP || record.id === GROUPENUM.ALL, //未分组
        actionList: [
          {
            text: t('operation.move'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.movehtb'),
                  contentProps: {
                    business_group_idState: reactive({ business_group_id: undefined }),
                    placeholder: t('asset.selectGroup'),
                  },
                  handleOk: async (conRef) => {
                    await unref(conRef).validate();
                    const {
                      business_group_idState: { business_group_id },
                    } = conRef;
                    // 非未分组
                    await moveHostToBusGroup({
                      group_id: record.id,
                      business_group_id,
                    });

                    callback(true);
                  },
                },
                businessGroupForm,
              );
            },
          },
          {
            text: t('operation.rname'),
            func: ({ record }, callback) => {
              useModal(
                {
                  contentProps: {
                    fields: reactive({ group_name: record.name }),
                  },
                  title: t('asset.reName') + ' ' + t('common.group'),
                  handleOk: async (conRef) => {
                    await unref(conRef.formRef).validate();
                    await renameHostGroup({
                      id: record.id!,
                      new_group_name: conRef.fields.group_name,
                    });
                    callback(true);
                  },
                },
                addModal,
              );
            },
          },
          {
            text: t('operation.delete'),
            func: async ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.deletehg'),
                  contentProps: {
                    id: record.id,
                  },
                  handleOk: async (conRef) => {
                    await unref(conRef).validate();
                    const {
                      host_group_idState: { host_group_id },
                    } = conRef;
                    const { code } = await deleteHostGroup({
                      id: record.id,
                      move_to: host_group_id,
                    });
                    !code && callback();
                  },
                },
                delGroupForm,
              );
            },
          },
        ],
      },
    ],
  },
];
