/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-10-13 10:27:17
 */
import { TableColumn } from '@/types/tableColumn';
import memberLog from './index.vue';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('log.actTime'),
    dataIndex: 'create_at',
    width: 200,
  },
  {
    title: t('log.adminRole'),
    dataIndex: 'u_type',
    width: 150,
  },
  {
    title: t('log.useName'),
    dataIndex: 'email',
    width: 200,
  },
  {
    title: t('log.model'),
    dataIndex: 'modtype',
    width: 200,
  },
  {
    title: t('log.logLevel'),
    dataIndex: 'oplevel',
    width: 150,
  },
  {
    title: t('log.actDes'),
    dataIndex: 'description',
    width: 300,
  },
];
export interface Option {
  value: string;
  label: string;
  children?: Option[];
}
export { memberLog };
