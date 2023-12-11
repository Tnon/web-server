/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2023-01-13 11:01:41
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import strategyDraw from './index.vue';
export interface GroupMsg {
  group_id: number;
  group_name: string;
  policy_id: number;
  status: number;
}
export const useColumns = (t): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'ip',
    customRender: ({ record }) =>
      createVNode(hostIp, {
        host_id: record.mac,
        ip: record.ip,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
      }),
  },
  {
    title: t('asset.effStau'),
    dataIndex: 'effect_status',
    customRender: ({ text }) =>
      createVNode(
        'span',
        { style: { color: text ? '#18b666' : '#f8a04c' } },
        text ? t('asset.effeVe') : t('asset.notEffe'),
      ),
  },
];
export const useStaticColumns = (t): TableColumn[] => [
  {
    title: t('strategy.fzzjs'),
    dataIndex: 'host_total',
  },
  {
    title: t('strategy.disScope'),
    dataIndex: 'total',
  },
  {
    title: t('asset.effeVe'),
    dataIndex: 'success',
  },
  {
    title: t('asset.notEffe'),
    dataIndex: 'fail',
    customRender: ({ text }) => createVNode('span', { style: { color: '#f8a04c' } }, text),
  },
];
export default strategyDraw;
