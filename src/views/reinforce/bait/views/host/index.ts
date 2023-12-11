/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-26 20:07:45
 */

import hostIp from '@/components/host-ip';
import { useModal } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import fileMonitor from '../../cmts/fileMonitor';

export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('arcomn.impactHost'),
    dataIndex: 'ip',
    width: 200,
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.machine_id,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
      }),
  },
  {
    title: t('operation.hostg'), //主机组
    dataIndex: 'group_name',
    width: 150,
  },
  {
    title: t('reinforce.jkzt'), //监控状态
    dataIndex: 'protected_file',
    width: 200,
    customRender: ({ record }) =>
      createVNode(
        'span',
        {
          style: { color: '#18BA79', cursor: 'pointer' },
          onClick: () => {
            useModal(
              {
                title: t('reinforce.agzjkqkzaa', [record.ip]),
                wrapClassName: 'noheadModal',
                width: 900,
                footer: false,
                contentProps: {
                  title: t('reinforce.agzjkqkzaa', [record.ip]),
                  host_id: record.machine_id,
                },
              },
              fileMonitor,
            );
          },
        },
        record.protected_file + ' / ' + record.monitored_file,
      ),
  },
];
