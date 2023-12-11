/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 19:05:14
 * @LastEditTime: 2023-09-14 18:58:28
 */
import { createVNode } from 'vue';
import collDetail from './index.vue';
export default collDetail;
import { TableColumn } from '@/types/tableColumn';
import collStatusBrage from '../collStatusBrage';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('operation.rzlx'),
    dataIndex: 'type_name',
  },
  {
    title: t('operation.sjlj'),
    dataIndex: 'path',
  },
  {
    title: t('operation.cjzts'),
    dataIndex: 'monitor_status',
    customRender: ({ text }) => createVNode(collStatusBrage, { status: text }),
  },
];
