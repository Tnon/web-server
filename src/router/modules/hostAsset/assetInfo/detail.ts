/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-12 15:44:37
 * @LastEditTime: 2023-02-21 20:54:14
 */
import { RouteRecordRaw } from 'vue-router';
const routeName = 'hostAsset-layout-assetInfo-host-detail';
export const assetRoutes: Array<RouteRecordRaw> = [
  {
    path: 'host',
    name: `${routeName}-host`,
    meta: {
      title: 'asset.hostMenu',
      selectedKeys: `${routeName}-host`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/host/index.vue'),
  },

  {
    path: 'asset',
    name: `${routeName}-asset`,
    meta: {
      title: 'asset.assetMenu',
      selectedKeys: `${routeName}-asset`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/asset/index.vue'),
  },
  {
    path: 'risk',
    name: `${routeName}-risk`,
    meta: {
      title: 'asset.riskMenu',
      selectedKeys: `${routeName}-risk`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/risk/index.vue'),
  },
  {
    path: 'vulnerability',
    name: `${routeName}-vulnerability`,
    meta: {
      title: 'asset.vulnerabilityMenu',
      selectedKeys: `${routeName}-vulnerability`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () =>
      import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/vulnerability/index.vue'),
  },
  {
    path: 'alarm',
    name: `${routeName}-alarm`,
    meta: {
      title: 'asset.alarmMenu',
      selectedKeys: `${routeName}-alarm`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/alarm/index.vue'),
  },
  {
    path: 'acdr',
    name: `${routeName}-acdr`,
    meta: {
      title: 'asset.acdrMenu',
      selectedKeys: `${routeName}-acdr`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/acdr/index.vue'),
  },
  {
    path: 'strategy',
    name: `${routeName}-strategy`,
    meta: {
      title: 'asset.policyMenu',
      selectedKeys: `${routeName}-strategy`,
      parentSelectedKeys: `hostAsset-layout-assetInfo-host`,
      keepIp: true,
    },
    component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/cmts/rule/index.vue'),
  },
];

export default assetRoutes;
