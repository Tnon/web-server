/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 10:20:42
 * @LastEditTime: 2022-08-05 18:04:00
 */
import uadpList from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';
import systemInfo from '@/components/systemInfo';
export const useColumns = (t): TableColumn[] => [
  {
    title: t('operation.host'),
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
        cantJump: record.status === 1,
      }),
  },
  {
    title: t('operation.uadatype'),
    dataIndex: 'status_text',
    width: 150,
    customRender: ({ text }) => createVNode('span', { style: { color: '#F75555' } }, text),
  },
  {
    title: t('operation.sysMsg'),
    dataIndex: 'os',
    width: 300,
    sorter: true,
    customRender: ({ record, text }) =>
      createVNode(systemInfo, { kernel_version: record.kernel_version, os: text }),
  },
  {
    dataIndex: 'group_kv_path',
    title: t('common.group'),
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    title: t('operation.updatetime'),
    width: 200,
    dataIndex: 'info_time',
  },
  {
    title: t('common.agentVersion'),
    dataIndex: 'agent_version',
    width: 150,
  },
];
export default uadpList;
