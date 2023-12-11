/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:59:52
 * @LastEditTime: 2022-12-27 15:45:29
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import treeGroup from './cmts/treeGroup';
import hostIp from '@/components/host-ip';
import customTag from '@/components/custom-tag';
import systemInfo from '@/components/systemInfo';
import businessDetail from '@/views/operation/asset/host/cmts/businessDetail';
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
    title: T('operation.group'), // 分组
    dataIndex: 'group_kv_path',
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    dataIndex: 'os', // 系统信息
    title: T('asset.systemInfo'),
    width: 200,
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
    title: T('operation.busg'), // 所属业务组
    width: 150,
    dataIndex: 'business_group',
    customRender: ({ text }) =>
      text && text.length
        ? createVNode(businessDetail, {
            business_group_name: text[0].name ? text[0].name : '-',
          })
        : '-',
  },
  {
    title: T('asset.perLi'), // 责任人
    width: 150,
    dataIndex: 'responsible_person',
  },
  {
    title: T('asset.macRoom'), // 机房位置
    width: 150,
    dataIndex: 'host_location',
  },
];
