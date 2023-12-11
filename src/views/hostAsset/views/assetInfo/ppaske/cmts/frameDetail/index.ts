/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 19:06:46
 * @LastEditTime: 2022-11-18 17:30:32
 */
import { TableColumn } from '@/types/tableColumn';
import frameDetail from './index.vue';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.namelabel'),
    dataIndex: 'name',
  },
  {
    title: t('asset.absolutePath'),
    dataIndex: 'path',
  },
];
export default frameDetail;
