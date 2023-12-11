/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-09 13:50:05
 * @LastEditTime: 2023-10-13 09:44:31
 */
import { TableColumn } from '@/types/tableColumn';
import operatingsysTable from './index.vue';
import systemType from '../systemType';
import { createVNode } from 'vue';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.systemInfo'),
    dataIndex: 'os',
    ellipsis: true,
    width: 300,
    customRender: ({ record }) => createVNode(systemType, { record }),
  },
  {
    title: t('asset.hostNum'),
    width: 100,
    dataIndex: 'count',
    fixed: 'right',
  },
];
export default operatingsysTable;
