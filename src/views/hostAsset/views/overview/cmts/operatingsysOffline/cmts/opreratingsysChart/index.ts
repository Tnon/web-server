/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-09 13:50:05
 * @LastEditTime: 2022-09-29 16:38:48
 */
import operatingsysChart from './index.vue';
import { ChartNode } from '@/views/hostAsset/views/overview/type';

export const chartInitData = (t): ChartNode[] => [
  {
    id: 'CentOS',
    name: 'CentOS',
    value: 0,
    itemStyle: {
      color: '#945DF8',
      isShow: true,
    },
  },
  {
    id: 'Redhat',
    name: 'Redhat',
    value: 0,
    itemStyle: {
      color: '#F75555',
      isShow: true,
    },
  },
  {
    id: 'Suse',
    name: 'Suse',
    value: 0,
    itemStyle: {
      color: '#18BA79',
      isShow: true,
    },
  },
  {
    id: 'Ubuntu',
    name: 'Ubuntu',
    value: 0,
    itemStyle: {
      color: '#F6C84D',
      isShow: true,
    },
  },
  {
    id: 'Amazon',
    name: 'Amazon',
    value: 0,
    itemStyle: {
      color: '#F8A556',
      isShow: true,
    },
  },
  {
    id: 'EulerOS',
    name: 'EulerOS',
    value: 0,
    itemStyle: {
      color: '#439EF6',
      isShow: true,
    },
  },
  {
    id: 'Others',
    name: t('asset.others'),
    value: 0,
    itemStyle: {
      color: '#888888',
      isShow: true,
    },
  },
];
export default operatingsysChart;
