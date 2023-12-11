/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-10-13 10:27:14
 */
import { TableColumn } from '@/types/tableColumn';
import hostIp from '@/components/host-ip';
import { createVNode } from 'vue';
import memberLog from './index.vue';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('log.actTime'),
    dataIndex: 'create_at',
    width: 200,
  },
  {
    title: t('log.eventName'),
    dataIndex: 'event_type',
    width: 200,
  },
  {
    title: t('log.hostIp'),
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
    title: t('log.logLevel'),
    dataIndex: 'level',
    width: 150,
  },
  {
    title: t('log.actDes'),
    dataIndex: 'opexplian',
    width: 300,
  },
];
export interface Option {
  value: string;
  label: string;
  children?: Option[];
}
export { memberLog };
