/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 14:33:38
 * @LastEditTime: 2023-03-02 19:34:19
 */
import { TableColumn } from '@/types/tableColumn';
import baseDetail from './index.vue';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('reinforce.jcxmc'), //检查项名称
    dataIndex: 'name',
    width: 150,
  },
  {
    title: t('reinforce.gfsdfgg'), //检查系统/应用
    dataIndex: 'os',
    width: 200,
  },
  {
    title: t('reinforce.sgsdf'), //检查项类别
    dataIndex: 'type',
    width: 200,
  },
  {
    title: t('reinforce.ggssd'), //检查项说明
    dataIndex: 'description',
    width: 200,
  },
];
export default baseDetail;
