/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 10:59:01
 * @LastEditTime: 2023-06-02 10:12:54
 */
import hostIp from '@/components/host-ip';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import ruleMonitor from './index.vue';
import fileActionMode from './cmts/fileActionMode';
export const useColumns = (t: any, refreshTable, ischeck, patch_id: string): TableColumn[] => [
  {
    title: t('arcomn.impactHost'),
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
    title: t('strategy.hostg'), //主机组
    dataIndex: 'group_name',
    width: 150,
  },
  {
    title: t('common.action'), //文件路径
    dataIndex: 'file_path',
    width: 350,
    customRender: ({ record }) =>
      createVNode(fileActionMode, {
        host_id: record.host_id,
        mode_val: record.status ?? 1,
        refreshTable,
        ischeck,
        patch_id,
      }),
  },
];
export default ruleMonitor;
