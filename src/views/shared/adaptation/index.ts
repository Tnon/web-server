/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 18:33:27
 */
import { TableColumn } from '@/types/tableColumn';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('setting.adaSys'),
    dataIndex: 'name',
  },
];
