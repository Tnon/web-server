/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-09 13:50:05
 * @LastEditTime: 2022-11-25 15:16:04
 */
import { TableColumn } from '@/types/tableColumn';
import offlineTable from './index.vue';
import hostIp from '@/components/host-ip';
import { createVNode } from 'vue';

export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.host'), // 主机
    dataIndex: 'ip',
    width: 200,
    // sorter: true,
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
    title: t('common.offLineTime'), //'离线时间'
    dataIndex: 'last_offline_at',
    ellipsis: true,
    width: 200,
  },
];
export default offlineTable;
