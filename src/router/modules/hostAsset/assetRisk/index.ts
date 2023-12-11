import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import { RouterTransition } from '@/components/transition';
const routeName = 'hostAsset-layout-assetRisk';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'assetRisk',
    name: routeName,
    meta: {
      title: 'asset.assetRisk',
      permission: routeName,
      icon: '#ax-nav-zc-AssetVulnerability',
    },
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'kernelvul',
        name: `${routeName}-kernelvul`,
        redirect: '/hostAsset/assetRisk/kernelvul/viewPro',
        meta: {
          title: 'asset.assetRiskkernel',
          permission: `${routeName}-kernelvul`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-kernelvul-viewPro`,
            meta: {
              title: '内核风险漏洞视图',
              parentSelectedKeys: `${routeName}-kernelvul`,
              type: 'kernelvul',
              permission: `${routeName}-kernelvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-kernelvul-viewIp`,
            meta: {
              title: '内核风险主机视图',
              parentSelectedKeys: `${routeName}-kernelvul`,
              type: 'kernelvul',
              permission: `${routeName}-kernelvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-kernelvul-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-kernelvul`,
              type: 'kernelvul',
              permission: `${routeName}-kernelvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/detail/index.vue'),
          },
        ],
      },
      {
        path: 'appvul',
        name: `${routeName}-appvul`,
        redirect: '/hostAsset/assetRisk/appvul/viewPro',
        meta: {
          title: 'asset.assetRiskapp',
          permission: `${routeName}-appvul`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-appvul-viewPro`,
            meta: {
              title: '应用风险漏洞视图',
              parentSelectedKeys: `${routeName}-appvul`,
              type: 'appvul',
              permission: `${routeName}-appvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-appvul-viewIp`,
            meta: {
              title: '应用风险主机视图',
              parentSelectedKeys: `${routeName}-appvul`,
              type: 'appvul',
              permission: `${routeName}-appvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-appvul-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-appvul`,
              type: 'appvul',
              permission: `${routeName}-appvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/detail/index.vue'),
          },
        ],
      },
      {
        path: 'webvul',
        name: `${routeName}-webvul`,
        redirect: '/hostAsset/assetRisk/webvul/viewPro',
        meta: {
          title: 'asset.assetRiskweb',
          permission: `${routeName}-webvul`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-webvul-viewPro`,
            meta: {
              title: 'web风险漏洞视图',
              parentSelectedKeys: `${routeName}-webvul`,
              type: 'webvul',
              permission: `${routeName}-webvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-webvul-viewIp`,
            meta: {
              title: 'web风险漏洞主机视图',
              parentSelectedKeys: `${routeName}-webvul`,
              type: 'webvul',
              permission: `${routeName}-webvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-webvul-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-assetRisk-webvul`,
              type: 'webvul',
              permission: `${routeName}-webvul`,
            },
            component: () => import('@/views/hostAsset/views/assetRisk/detail/index.vue'),
          },
        ],
      },
    ],
  },
];
export default routes;
