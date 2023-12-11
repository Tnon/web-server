/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 10:59:01
 * @LastEditTime: 2023-08-03 18:55:51
 */
import countModal from '@/components/countModal';
import showState from '@/components/showState';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import fileMonitor from './index.vue';
import pathDetail from '../pathDetail';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('reinforce.rulena'), //规则名称
    dataIndex: 'rule_name',
    width: 150,
  },
  {
    title: t('arcomn.file_dir'), //文件目录
    dataIndex: 'file_path',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        title: t('arcomn.file_dir'),
        showItems: [text],
      }),
  },

  {
    title: t('reinforce.jkzt'), //监控状态
    dataIndex: 'monitor_state',
    width: 200,
    customRender: ({ text, record }) =>
      createVNode(showState, {
        type: text,
        reason: record.monitor_exception,
      }),
  },
  {
    title: t('asset.detail'),
    dataIndex: 'exception_list',
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(pathDetail, { exception_list: text, file_path: record.file_path }),
  },
];
export default fileMonitor;
