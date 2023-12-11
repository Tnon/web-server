/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 14:24:15
 * @LastEditTime: 2023-01-11 17:27:23
 */
import { createVNode } from 'vue';
import leftTable from './index.vue';
import { TableColumn } from '@/types/tableColumn';

export const useColumns = (t: any, type: string): TableColumn[] => [
  {
    title: t('asset.alarmTime'),
    dataIndex: 'alarm_time',
  },
  {
    title: t(`asset.${type}`) + t('asset.usage'),
    dataIndex: 'utilization',
    customRender: ({ text }) => createVNode('span', null, `${text}%`),
  },
  {
    title: t('asset.alarmThreshold'),
    dataIndex: 'threshold',
    customRender: ({ text }) => createVNode('span', null, `${text}%`),
  },
];
export default leftTable;
