/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:59:52
 * @LastEditTime: 2023-10-26 20:04:12
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import treeGroup from '@/components/treeGroupNp';
import hostIp from '@/components/host-ip';
import saftyStatus from '@/components/safty-status';
import customTag from '@/components/custom-tag';
import assetStatus from '../assetStatus';
import viewHostDetail from '../viewHostDetail';
import systemInfo from '@/components/systemInfo';
export const useColumns = (T, reload?: Function): TableColumn[] => [
  {
    title: T('common.hostIp'),
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
    dataIndex: 'group_kv_path', // 分组
    title: T('common.group'),
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    dataIndex: 'os', // 系统信息
    title: T('asset.systemInfo'),
    width: 300,
    customRender: ({ record, text }) =>
      createVNode(systemInfo, { kernel_version: record.kernel_version, os: text }),
  },
  {
    title: T('common.tag'), // 主机标签
    width: 150,
    dataIndex: 'tag',
    customRender: ({ record }) =>
      createVNode(customTag, {
        tag: record.tag,
        host_id: record.host_id,
        reload,
      }),
  },
  {
    title: T('asset.hsfsta'), // 主机安全状态
    width: 200,
    dataIndex: 'alarm_count',
    customRender: ({ record }) =>
      createVNode(saftyStatus, {
        alarm_count: record.alarm_count,
        event_count: record.event_count,
      }),
  },
  {
    title: T('asset.assetsafe'), // 资产健康状态
    width: 200,
    dataIndex: 'kernel_vul_count',
    customRender: ({ record }) =>
      createVNode(assetStatus, {
        vul_count: record.kernel_vul_count + record.app_vul_count + record.web_vul_count,
        risk_total_count: record.risk_total_count,
      }),
  },
  {
    title: T('asset.offlinelan'), // 离线时长
    width: 150,
    dataIndex: 'offline_duration',
  },
  {
    title: T('asset.lastOffLineTime'), // 最近离线时间
    width: 200,
    dataIndex: 'last_offline_at',
  },
  {
    title: T('asset.hostDetail'), // 查看详情
    width: 150,
    dataIndex: 'action',
    customRender: ({ record }) => createVNode(viewHostDetail, { record }),
  },
];
