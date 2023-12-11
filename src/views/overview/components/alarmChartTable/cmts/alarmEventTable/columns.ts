/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-18 12:19:10
 * @LastEditTime: 2022-11-25 14:46:43
 */
import { TableColumn } from '@/types/tableColumn';
import hostIp from '@/components/host-ip';
import { createVNode } from 'vue';
export const useColumns = (T): TableColumn[] => [
  {
    title: T('overview.lastAttack'),
    dataIndex: 'update_at',
    ellipsis: true,
  },
  {
    title: T('common.hostIp'),
    dataIndex: 'ip',
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.host_id,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
      }),
  },
  {
    title: T('arcomn.attackType'),
    dataIndex: 'dtype',
    customRender: ({ record }) =>
      createVNode('span', { class: 'attRskType', title: record.dtypename }, record.dtypename),
  },
];
