/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 10:20:42
 * @LastEditTime: 2022-11-29 13:12:40
 */
import uadpList from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import systemInfo from '@/components/systemInfo';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'ip',
    width: 200,
    sorter: true,
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
    title: t('operation.sysMsg'),
    dataIndex: 'os',
    sorter: true,
    width: 300,
    customRender: ({ record, text }) =>
      createVNode(systemInfo, { kernel_version: record.kernel_version, os: text }),
  },
  {
    title: t('operation.agtMver'),
    dataIndex: 'agent_version',
    sorter: true,
    width: 150,
  },
  {
    title: t('operation.rectime'),
    dataIndex: 'uninstalled_at',
    width: 150,
    sorter: true,
  },
  // {
  //   title: t('operation.recresult'),
  //   dataIndex: 'uninstalled_result',
  //   width: 150,
  // },
];
export default uadpList;
