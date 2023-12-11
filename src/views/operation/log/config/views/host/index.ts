/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-09-14 18:44:28
 */
import { createVNode } from 'vue';
import hostView from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import hostIp from '@/components/host-ip';
import collStatus from './cmts/collStatus';
//获取管理员类型 lDAP还是普通
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'ip',
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.host_id,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.host_name,
      }),
  },
  {
    title: t('strategy.hostg'),
    dataIndex: 'group_name',
  },
  {
    title: t('operation.cjzt'),
    dataIndex: 'name',
    customRender: ({ record }) =>
      createVNode(collStatus, {
        normal: record.syslog_count,
        total: record.syslog_total,
        ip: record.ip,
        host_id: record.host_id,
      }),
  },
];
export default hostView;
