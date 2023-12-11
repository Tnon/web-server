/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-04 11:07:37
 * @LastEditTime: 2023-10-26 20:06:29
 */
import serverRun from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { exportServerLog } from '@/utils/tools';
import { restartModule } from '@/api/operation/run';
import { createVNode } from 'vue';
import ServerRuningStatus, { RuningStatus } from './cmt/ServerRuningStatus';

export const useColumns = (t): TableColumn[] => [
  {
    title: t('operation.module'),
    dataIndex: 'name',
    width: 120,
  },
  {
    title: t('operation.currver'),
    dataIndex: 'old_version',
    width: 120,
  },
  {
    title: t('operation.runstau'),
    dataIndex: 'running_type',
    width: 80,
    customRender: ({ text }) => createVNode(ServerRuningStatus, { status: text }),
  },
  {
    title: t('asset.cpuUtil'),
    dataIndex: 'cpu_percentage',
    width: 100,
  },
  {
    title: 'I/O',
    dataIndex: 'block_read',
    width: 150,
    customRender: ({ record }) => record.block_read + '/' + record.block_write,
  },
  {
    title: t('operation.net') + 'I/O',
    dataIndex: 'network_rx',
    width: 150,
    customRender: ({ record }) => record.network_rx + '/' + record.network_tx,
  },
  {
    title: t('asset.memUtil'),
    dataIndex: 'memory_percentage',
    width: 100,
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: t('operation.logdown'),
            loading: (record) => record.downLoading,
            func: async ({ record }) => {
              record.downLoading = true;
              await exportServerLog('/server/log/download', record.name);
              record.downLoading = undefined;
              // getModuleLog({ module: record.name });
            },
          },
          {
            text: t('operation.resatser'),
            loading: (record) => record.loading,
            disabled: (record) => record.running_type === RuningStatus.NORMAL,
            func: async ({ record }, callback) => {
              record.loading = true;
              const { code } = await restartModule({ module: record.name });
              record.loading = undefined;
              !code && callback(true);
            },
          },
        ],
      },
    ],
  },
];

export default serverRun;
