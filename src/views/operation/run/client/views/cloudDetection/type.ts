/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-02-09 16:44:55
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';

// reload
export const useColumns = (t): TableColumn[] => [
  {
    title: t('common.hostIp'), // 主机
    dataIndex: 'ip',
    sorter: true,
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
    title: t('operation.belGrp'),
    dataIndex: 'group_kv_path',
    sorter: true,
    width: 150,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    title: t('common.tag'), // 主机标签
    dataIndex: 'tag',
    width: 150,
  },
  {
    title: t('operation.webshellFinished'),
    dataIndex: 'ws_finish_count',
    sorter: true,
    width: 200,
  },
  {
    title: t('operation.webshellScanning'),
    dataIndex: 'ws_doing_count',
    sorter: true,
    width: 200,
  },
  {
    title: t('operation.antivirusFinished'),
    dataIndex: 'virus_finish_count',
    sorter: true,
    width: 230,
  },
  {
    title: t('operation.antivirusScanning'),
    dataIndex: 'virus_doing_count',
    sorter: true,
    width: 230,
  },
];
