/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-12-28 18:24:41
 * @LastEditTime: 2022-12-29 11:33:07
 */
import { createVNode } from 'vue';
import tableView from './index.vue';
import { TableColumn } from '@/types/tableColumn';

export const useColumns = (t: any, type: string): TableColumn[] => [
  {
    title: t('asset.statistciTime'),
    dataIndex: 'collection_time',
    width: 200,
  },
  {
    title: t(`asset.${type}`) + t('asset.usage'),
    dataIndex: 'utilization',
    width: 200,
    customRender: ({ text }) => createVNode('span', null, `${text}%`),
  },
];
export default tableView;
