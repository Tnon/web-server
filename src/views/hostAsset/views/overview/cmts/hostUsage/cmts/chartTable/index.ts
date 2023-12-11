/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-13 11:31:21
 * @LastEditTime: 2023-10-26 20:04:56
 */
import chartTable from './index.vue';
import hostIp from '@/components/host-ip';
import { createVNode } from 'vue';
import { TableColumn } from '@/types/tableColumn';
import { ChartNode } from '@/views/hostAsset/views/overview/type';

export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.host'),
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
    title: t('asset.usage'),
    dataIndex: 'usage',
    width: 100,
  },
];
// 颜色可置为空，因为会重新分配一次颜色
export const getInitData = (t: any): ChartNode[] => [
  {
    id: 'eighty_to_one_hundred_count',
    value: 0,
    name: '80 ~ 100%',
    itemStyle: {
      color: 'rgba(88,123,245,1)',
      isShow: true,
    },
  },
  {
    id: 'fifty_to_eighty_count',
    value: 0,
    name: '50 ~ 80%',
    itemStyle: {
      color: 'rgba(88,123,245,0.7)',
      isShow: true,
    },
  },
  {
    id: 'twenty_to_fifty_count',
    value: 0,
    name: '20 ~ 50%',
    itemStyle: {
      color: 'rgba(88,123,245,0.4)',
      isShow: true,
    },
  },
  {
    id: 'zero_to_twenty_count',
    value: 0,
    name: '0 ~ 20%',
    itemStyle: {
      color: 'rgba(88,123,245,0.1)',
      isShow: true,
    },
  },
  {
    id: 'other_count',
    value: 0,
    name: t('asset.unknown'),
    itemStyle: {
      color: '#F6F6F6 ',
      isShow: true,
    },
  },
];

export default chartTable;
