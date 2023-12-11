/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 17:35:19
 * @LastEditTime: 2023-09-20 14:06:35
 */
import { useModal } from '@/hooks/use-modal';
import collConfig from './index.vue';
import { createVNode, reactive, unref } from 'vue';
import { TableColumn } from '@/types/tableColumn';
import { E_Enabled } from '@/views/reinforce/file/views/rule/type';
import {
  editConfigPath,
  switchRuleDf,
  getPatchDetial,
  delLogTypeDetailApi,
} from '@/api/operation/syslog';
import addCollCfg from '../addCollCfg';
import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
export default collConfig;
export const useColumns = (t: any, refreshTable, type_id: number): TableColumn[] => [
  {
    title: t('reinforce.tqy'), //停用 启用
    dataIndex: 'enabled',
    width: 100,
    actions: [
      {
        type: 'switch',
        checked: (record) => record.enabled === E_Enabled.Open,
        func: async ({ record }, callback) => {
          useModal(
            {
              title:
                record.enabled === E_Enabled.Open ? t('operation.stoRu') : t('operation.staRu'),
              handleOk: async () => {
                await switchRuleDf({
                  id: record.id,
                  enabled: record.enabled === E_Enabled.Open ? E_Enabled.Close : E_Enabled.Open,
                });
                callback(true);
              },
            },
            createVNode('span'),
          );
        },
      },
    ],
  },
  {
    title: t('operation.sjlj'), //路径
    dataIndex: 'path',
    width: 150,
  },
  {
    title: t('operation.yyfw'), //应用范围
    dataIndex: 'apply_type',
    width: 150,
    customRender: ({ record, text }) =>
      createVNode('span', null, text === E_Host_Range.All ? t('reinforce.qbzj') : record.apply_num),
  },
  {
    title: t('common.remarks'), //备注
    dataIndex: 'desc',
    width: 150,
  },
  {
    title: t('common.action'),
    dataIndex: 'name',
    width: 200,
    actions: [
      {
        type: 'groups',
        actionList: [
          {
            text: t('common.edit'),
            disabled: (record) => record.package_type === 1,
            func: async ({ record }) => {
              const fields = reactive({});
              const { code, ...res } = await getPatchDetial({ id: record.id });
              !code &&
                Object.assign(
                  fields,
                  res,
                  res.entities ? { entities: res.entities } : { entities: [] },
                );
              useModal(
                {
                  title: t('operation.bjrilxs'),
                  contentProps: {
                    fields,
                  },
                  handleOk: async (conRef) => {
                    await unref(conRef).validate();
                    const { code } = await editConfigPath({
                      ...unref(conRef).modelRef,
                      id: record.id,
                      type_id: type_id,
                      apply_type: E_Host_Range.Host,
                      enabled: record.enabled,
                    });
                    //刷新表格
                    !code && refreshTable();
                  },
                },
                addCollCfg,
              );
            },
          },
          {
            text: t('common.delete'),
            disabled: (record) => record.package_type === 1,
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.ckkf'),
                  dangerButton: true,
                  handleOk: async () => {
                    const { code } = await delLogTypeDetailApi({ id: record.id });
                    !code && callback();
                  },
                },
                createVNode('span'),
              );
            },
          },
        ],
      },
    ],
  },
];
