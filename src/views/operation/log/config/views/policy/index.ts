/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-26 20:06:17
 */
import { useModal } from '@/hooks';
import policyView from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import collConfig from './cmts/collConfig';
import { createVNode } from 'vue';
import { delLogTypeApi } from '@/api/operation/syslog';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('operation.rzlx'),
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('operation.rzsm'),
    dataIndex: 'desc',
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 200,
    actions: [
      {
        type: 'groups',
        actionList: [
          {
            text: t('operation.collConfig'),
            func: ({ record }) => {
              useModal(
                {
                  title: t('operation.collConfig'),
                  footer: false,
                  width: 800,
                  wrapClassName: 'modalBodyNopad',
                  contentProps: {
                    type_id: record.id,
                  },
                },
                collConfig,
              );
            },
          },
          {
            text: t('common.delete'),
            disabled: (record) => record.type === 1,
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.sdeufkg'),
                  dangerButton: true,
                  handleOk: async () => {
                    const { code } = await delLogTypeApi({ id: record.id });
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
export default policyView;
