/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 19:03:40
 * @LastEditTime: 2022-08-05 18:40:18
 */
import versionDetail from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
export const useColumns = (t, callback, type, closeModal): TableColumn[] => [
  {
    title:
      type === 'driver_upgraded_status'
        ? t('operation.driver_upgraded_status')
        : t('operation.agent_upgraded_status'),
    dataIndex: 'version',
    sorter: true,
  },
  {
    title: t('operation.hostnum'),
    dataIndex: 'host_count',
    sorter: true,
    customRender: ({ record, text }) =>
      createVNode(
        'span',
        {
          style: { color: '#18BA79', cursor: 'pointer' },
          onClick: () => {
            callback(record.version);
            closeModal();
          },
        },
        text,
      ),
  },
  {
    title: t('operation.hrate'),
    dataIndex: 'percent',
    sorter: true,
    customRender: ({ text }) => text + '%',
  },
];
export default versionDetail;
