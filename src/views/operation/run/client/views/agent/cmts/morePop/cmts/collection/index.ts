/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 10:20:42
 * @LastEditTime: 2023-07-11 11:37:52
 */
import collection from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import checkStatus from '../checkStatus';
import runingStatus from '@/components/runingStatus';
import { ONLINESTATUS } from '@/enums/assetsType';
export const useColumns = (t, collectionSelection): TableColumn[] => [
  {
    title: t('common.hostIp'),
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
    title: t('operation.belGrp'),
    dataIndex: 'group_name',
    width: 200,
  },
  {
    title: t('common.agentVersion'), // agent版本
    dataIndex: 'agent_version',
    width: 150,
  },
  {
    title: t('operation.xwcjqdzt'), // 行为采集驱动 状态
    dataIndex: 'status',
    width: 150,
    customRender: ({ text }) => createVNode(runingStatus, { status: text }),
  },
  {
    title: t('strategy.jccjd'),
    dataIndex: 'process',
    width: 100,
    customHead: true,
    customRender: ({ record, text }) =>
      createVNode(checkStatus, {
        status: collectionSelection.process,
        host_id: record.host_id,
        checked: text,
        disabled: !(record.online === ONLINESTATUS.ONLINE),

        online: record.online,
      }),
  },
  {
    title: t('strategy.nccjd'),
    dataIndex: 'memory',
    width: 100,
    customHead: true,
    customRender: ({ record, text }) =>
      createVNode(checkStatus, {
        status: collectionSelection.memory,
        host_id: record.host_id,
        checked: text,
        disabled: !(record.online === ONLINESTATUS.ONLINE),

        online: record.online,
      }),
  },
  {
    title: t('strategy.wjcjd'),
    dataIndex: 'file',
    width: 100,
    customHead: true,
    customRender: ({ record, text }) =>
      createVNode(checkStatus, {
        status: collectionSelection.file,
        host_id: record.host_id,
        checked: text,
        disabled: !(record.online === ONLINESTATUS.ONLINE),

        online: record.online,
      }),
  },
  {
    title: t('strategy.wlcjd'),
    dataIndex: 'network',
    width: 100,
    customHead: true,
    customRender: ({ record, text }) =>
      createVNode(checkStatus, {
        status: collectionSelection.network,
        host_id: record.host_id,
        checked: text,
        disabled: !(record.online === ONLINESTATUS.ONLINE),

        online: record.online,
      }),
  },

  {
    title: t('strategy.qtcjd'),
    dataIndex: 'other',
    width: 100,
    customHead: true,
    customRender: ({ record, text }) =>
      createVNode(checkStatus, {
        status: collectionSelection.other,
        host_id: record.host_id,
        checked: text,
        disabled: !(record.online === ONLINESTATUS.ONLINE),

        online: record.online,
      }),
  },
];
export default collection;
