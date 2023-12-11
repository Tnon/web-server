/*
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2022-07-04 19:06:46
 * @LastEditTime: 2022-09-30 17:19:40
 */
import { TableColumn } from '@/types/tableColumn';
import appDetail from './index.vue';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.processName'),
    dataIndex: 'proc_name',
  },
  {
    title: t('asset.prcever'),
    dataIndex: 'version',
  },
  {
    title: t('asset.processPath'),
    dataIndex: 'proc_path',
  },
  {
    title: 'PID',
    dataIndex: 'process_id',
  },
  {
    title: t('asset.startTime'),
    dataIndex: 'start_time',
  },
];
export default appDetail;
