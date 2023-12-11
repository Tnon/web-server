/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-20 11:51:24
 * @LastEditTime: 2023-01-17 18:14:12
 */
import recordModal from './index.vue';
import { StrategyType } from '@/views/strategy/common/types';
import { delSafeStrategy, editSafeStrategy, getEditPageIndex } from '@/api/strategy/safe';
import { createVNode, reactive, unref } from 'vue';
import subGroup from './cmts/subGroup';
import { useModal } from '@/hooks';
import addModal from '@/views/strategy/common/cmts/addModal';
export const useTableConfig = (
  strategyType: StrategyType,
  t,
  tableConfig,
  refreshTableAndStrategy,
  selectStrategy,
  closeModal,
  pageOption,
  refreshStrategyList,
  globalID,
) => {
  tableConfig.columns = [
    {
      title: t('strategy.straName'),
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: t('strategy.polAppGroup'),
      dataIndex: 'policyrecord',
      width: 300,
      customRender: ({ record, text }) =>
        createVNode(subGroup, {
          name: record.name,
          policyrecord: text ?? [],
          id: record.id,
          reload: refreshTableAndStrategy,
          strategyType,
        }),
    },
    {
      title: t('strategy.lastDate'),
      dataIndex: 'updated_at',
      width: 200,
    },
    {
      title: t('common.action'),
      width: 100,
      dataIndex: 'action',
      fixed: 'right',
      actions: [
        {
          type: 'icon',
          actionList: [
            //策略重命名
            {
              text: t('strategy.straRnm'),
              disabled: (record) => record.id === globalID,
              func: ({ record }) => {
                useModal(
                  {
                    title: t('strategy.renmStra'),
                    contentProps: {
                      fields: reactive({ name: record.name }),
                    },
                    handleOk: async (conRef) => {
                      await unref(conRef.formRef).validate();
                      const { id } = await editSafeStrategy({
                        name: unref(conRef).fields.name,
                        id: record.id,
                        policy_type: strategyType,
                      });
                      if (id) {
                        // 刷新策略表格和列表
                        refreshTableAndStrategy();
                      }
                    },
                  },
                  addModal,
                );
              },
            },
            //策略删除
            {
              text: t('strategy.delete'),
              disabled: (record) => record.id === globalID,
              func: ({ record }) => {
                useModal(
                  {
                    title: t('strategy.deleteStra'),
                    handleOk: async () => {
                      const { code } = await delSafeStrategy({
                        id_string: record.id + '',
                        policy_type: strategyType,
                      });
                      if (!code) {
                        //选中默认全局策略
                        selectStrategy(globalID);
                        // 刷新策略表格和列表
                        refreshTableAndStrategy();
                      }
                    },
                  },
                  createVNode('span', null, t('strategy.delstrCfm')),
                );
              },
            },
            //策略编辑
            {
              text: t('strategy.editStra'),
              disabled: (record) => record.id === globalID,
              func: async ({ record }) => {
                //选中当前策略
                selectStrategy(record.id, true);
                const { page_index } = await getEditPageIndex({
                  id: record.id,
                  page_size: pageOption.page_size,
                  policy_type: strategyType,
                });
                pageOption.page_index = page_index || 1;
                await refreshStrategyList(true);
                closeModal();
              },
            },
          ],
        },
      ],
    },
  ];
};
export default recordModal;
