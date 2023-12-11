/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-14 11:06:33
 * @LastEditTime: 2023-10-26 20:08:54
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import viewHostPatch from './cmts/viewHostPatch';
import levelCount from '../../cmts/levelCount';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.hostIp'),
    dataIndex: 'ip',
    width: 200,
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
    title: t('operation.hostg'), //主机组
    dataIndex: 'host_group',
    width: 150,
  },
  {
    title: t('reinforce.wxcdfb'), //危险程度分布
    dataIndex: 'vul_counts',
    width: 150,
    customRender: ({ text }) => createVNode(levelCount, { vulCounts: text ?? [] }),
  },
  {
    title: t('asset.viewDetail'),
    dataIndex: 'action',
    width: 150,
    customRender: ({ record }) =>
      createVNode(viewHostPatch, { ip: record.ip ?? '', host_id: record.host_id }),
  },
];
