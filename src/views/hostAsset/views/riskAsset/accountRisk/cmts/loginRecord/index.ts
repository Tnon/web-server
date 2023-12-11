/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-08 12:18:31
 * @LastEditTime: 2022-09-28 15:07:20
 */
import loginRecord from './index.vue';
import { TableColumn } from '@/types/tableColumn';

export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('asset.loginIp'),
    dataIndex: 'ip',
    width: 200,
  },
  {
    title: t('asset.lastedLoginTime'),
    dataIndex: 'login_time',
    width: 200,
  },
];
export default loginRecord;
