/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 19:53:00
 * @LastEditTime: 2023-10-26 20:05:02
 */
import resourceAlarm from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import hostIp from '@/components/host-ip';
import { createVNode } from 'vue';

export const useColumns = (t, type: string): TableColumn[] => [
  {
    title: t('asset.host'),
    dataIndex: 'ip',
    width: 150,
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
    title: t('asset.alarmTime'),
    dataIndex: 'alarm_time',
    width: 100,
  },
  {
    title: t(`asset.${type}`) + t('asset.usage'),
    dataIndex: 'utilization',
    width: 100,
    customRender: ({ text }) => createVNode('span', null, `${text}%`),
  },
  {
    title: t('asset.alarmThreshold'),
    dataIndex: 'threshold',
    width: 100,
    customRender: ({ text }) => createVNode('span', null, `${text}%`),
  },
];
export default resourceAlarm;
