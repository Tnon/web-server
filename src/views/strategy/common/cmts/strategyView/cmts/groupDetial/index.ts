/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-12 20:45:35
 * @LastEditTime: 2023-10-26 20:09:55
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import groupDetial from './index.vue';
export const useColumns = (T, showDraw): TableColumn[] => [
  {
    title: T('operation.group'), // 分组
    dataIndex: 'group_name',
  },
  {
    title: T('strategy.fzzjs'),
    dataIndex: 'host_total', //分组主机数
  },
  {
    title: T('strategy.xfzjs'),
    dataIndex: 'issued_total', //下发主机数
  },
  {
    title: T('strategy.ysxzjs'),
    dataIndex: 'effect_total', //生效主机数
  },
  {
    title: T('strategy.wsxzjs'),
    dataIndex: 'uneffect_total', //未生效主机数
  },
  {
    title: T('common.action'),
    dataIndex: 'action',
    customRender: ({ record }) =>
      createVNode(
        'span',
        {
          style: {
            cursor: 'pointer',
            color: '#18BA79',
          },
          onClick: () => {
            showDraw(record);
          },
        },
        T('asset.viewDetail'),
      ),
  },
];
export default groupDetial;
