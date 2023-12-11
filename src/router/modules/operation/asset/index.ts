/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2023-04-07 17:02:02
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-asset';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'asset',
    name: routeName,
    meta: {
      title: 'operation.asset',
      permission: routeName,
    },
    redirect: '/operation/asset/manage',
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'manage',
        name: `${routeName}-manage`,
        meta: {
          title: 'operation.assetManage',
          icon: '#ax-form',
          permission: `${routeName}-manage`,
        },
        component: () => import('@/views/operation/asset/manage/index.vue'),
      },
      {
        path: 'host',
        name: `${routeName}-host`,
        meta: {
          title: 'operation.assetHostGroup',
          icon: '#ax-wh-grouping',
          permission: `${routeName}-host`,
        },
        component: () => import('@/views/operation/asset/host/index.vue'),
      },
      {
        path: 'business',
        name: `${routeName}-business`,
        meta: {
          title: 'operation.assetBusGroup',
          icon: '#ax-icon_weihu-yewuzu',
          permission: `${routeName}-business`,
        },
        component: () => import('@/views/operation/asset/business/index.vue'),
      },
      // {
      //   path: 'tag',
      //   name: `${routeName}-asset-tag`,
      //   meta: {
      //     title: 'operation.assetTag',
      //     icon: '#ax-wh-adminjournal',
      //   },
      //   component: () => import('@/views/operation/user/log/index.vue'),
      // },
    ],
  },
];
export default routes;
