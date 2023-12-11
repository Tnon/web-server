/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 11:22:35
 * @LastEditTime: 2023-07-10 14:13:16
 */
import { TableColumn } from '@/types/tableColumn';
import tabTable from './index.vue';
import { createVNode } from 'vue';
import runStatus from '../runStatus';
import nameDesc from '../nameDesc';
export default tabTable;
export const useColumns = (type: string): TableColumn[] => {
  return type === 'collection'
    ? [
        {
          dataIndex: 'status',
          width: 100,
          customRender: ({ text, record }) =>
            createVNode(runStatus, {
              status: text,
              err_msg: record.err_msg ?? 0,
              stop_time: record.stop_time ?? '',
            }),
        },
        {
          dataIndex: 'name',
          customRender: ({ text, record }) =>
            createVNode(nameDesc, { name: text, desc: record.desc }),
        },
      ]
    : [
        {
          dataIndex: 'status',
          width: 100,
          customRender: ({ text, record }) =>
            createVNode(runStatus, {
              status: text,
              err_msg: record.err_msg ?? '',
              stop_time: record.stop_time ?? '',
            }),
        },
        {
          dataIndex: 'name',
          customRender: ({ text, record }) =>
            createVNode(nameDesc, { name: text, desc: record.desc }),
        },
        {
          dataIndex: 'version',
          width: 100,
        },
      ];
};
