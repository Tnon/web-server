/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-11 18:25:18
 * @LastEditTime: 2023-07-10 15:26:01
 */
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import { TableColumn } from '@/types/tableColumn';
import riskDraw from '../cmts/riskDraw';
import { comLevel } from '@/components/attack-risk-cmts/com-level';

export const getapi_columnsDetail = (
  type: string,
  T: any,
  uuid?: string,
  host_id?: string,
): TableColumn[] => {
  const api_columnsDetail: {
    [k: string]: TableColumn[];
  } = {
    appriskPro: [
      {
        title: T('asset.hostIp'), // 主机IP
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
        title: T('operation.group'), // 分组
        dataIndex: 'group_name',
        width: 150,
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 200,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'apprisk_scan_time',
        width: 200,
      },
      {
        title: T('asset.lookOver'),
        dataIndex: 'action',
        width: 100,
        customRender: ({ record }) =>
          createVNode(riskDraw, {
            title: record.name,
            uuid,
            host_id: record.host_id,
            type: 'apprisk',
          }),
      },
    ],
    appriskIp: [
      {
        title: T('asset.accountRiskapprisk'), // 应用风险
        dataIndex: 'name',
        width: 150,
      },
      {
        title: T('arcomn.level'),
        dataIndex: 'level',
        sorter: true,
        width: 100,
        customRender: ({ record }) => createVNode(comLevel, { level: record.level }),
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 200,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'apprisk_scan_time',
        width: 200,
      },
      {
        title: T('asset.lookOver'),
        dataIndex: 'action',
        width: 100,
        customRender: ({ record }) =>
          createVNode(riskDraw, {
            title: record.name,
            uuid: record.uuid,
            host_id,
            type: 'apprisk',
          }),
      },
    ],

    sysriskPro: [
      {
        title: T('asset.hostIp'), // 主机IP
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
        title: T('operation.group'), // 分组
        dataIndex: 'group_name',
        width: 150,
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 200,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'apprisk_scan_time',
        width: 200,
      },
      {
        title: T('asset.lookOver'),
        dataIndex: 'action',
        width: 100,
        customRender: ({ record }) =>
          createVNode(riskDraw, {
            title: record.name,
            uuid,
            host_id: record.host_id,
            type: 'sysrisk',
          }),
      },
    ],
    sysriskIp: [
      {
        title: T('asset.accountRisksysrisk'), // 系统风险
        dataIndex: 'name',
        width: 150,
      },
      {
        title: T('arcomn.level'),
        dataIndex: 'level',
        sorter: true,
        width: 100,
        customRender: ({ record }) => createVNode(comLevel, { level: record.level }),
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 200,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'apprisk_scan_time',
        width: 200,
      },
      {
        title: T('asset.lookOver'),
        dataIndex: 'action',
        width: 100,
        customRender: ({ record }) =>
          createVNode(riskDraw, {
            title: record.name,
            uuid: record.uuid,
            host_id,
            type: 'sysrisk',
          }),
      },
    ],

    accriskPro: [
      {
        title: T('asset.hostIp'), // 主机IP
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
        title: T('operation.group'), // 分组
        dataIndex: 'group_name',
        width: 150,
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 200,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'apprisk_scan_time',
        width: 200,
      },
      {
        title: T('asset.lookOver'),
        dataIndex: 'action',
        width: 100,
        customRender: ({ record }) =>
          createVNode(riskDraw, {
            title: record.name,
            uuid,
            host_id: record.host_id,
            type: 'accrisk',
          }),
      },
    ],
    accriskIp: [
      {
        title: T('asset.accountRiskaccrisk'), // 账户风险
        dataIndex: 'name',
        width: 150,
      },
      {
        title: T('arcomn.level'),
        dataIndex: 'level',
        sorter: true,
        width: 100,
        customRender: ({ record }) => createVNode(comLevel, { level: record.level }),
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 200,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'apprisk_scan_time',
        width: 200,
      },
      {
        title: T('asset.lookOver'),
        dataIndex: 'action',
        width: 100,
        customRender: ({ record }) =>
          createVNode(riskDraw, {
            title: record.name,
            uuid: record.uuid,
            host_id,
            type: 'accrisk',
          }),
      },
    ],
  };
  return api_columnsDetail[type];
};
