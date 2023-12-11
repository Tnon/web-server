/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-23 11:26:55
 */
import { TableColumn } from '@/types/tableColumn';
import handMove from '../cmts/handMove';
import { migStatus } from '../cmts/migStatus';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
export const useColumns = (t: any, reload: Function): TableColumn[] => [
  {
    title: t('setting.migHost'),
    width: 200,
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
    title: t('setting.manaUrl'),
    dataIndex: 'migrate_destination',
    width: 200,
  },
  {
    title: t('setting.migration'),
    dataIndex: 'migrate_status',
    width: 150,
    customRender: ({ text }) => createVNode(migStatus, { status: text }),
  },
  {
    title: t('setting.migRecord'),
    dataIndex: 'migrate_info',
    width: 200,
  },
  {
    title: t('setting.manMig'),
    dataIndex: 'actMig',
    width: 100,
    customRender: ({ record }) =>
      createVNode(handMove, {
        migrate_status: record.migrate_status,
        host_id: record.host_id,
        reload,
      }),
  },
];
