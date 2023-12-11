/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 19:06:46
 * @LastEditTime: 2022-07-26 09:55:55
 */
import { TableColumn } from '@/types/tableColumn';
import siteDetail from './index.vue';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.xnlj'),
    dataIndex: 'virtual_path',
  },
  {
    title: t('asset.wllj'),
    dataIndex: 'real_path',
  },
  {
    title: t('asset.wjjsyz'),
    dataIndex: 'author',
  },
  {
    title: t('asset.wjjssz'),
    dataIndex: 'group',
  },
  {
    title: t('asset.wjjqx'),
    dataIndex: 'authority',
  },
];
export default siteDetail;
