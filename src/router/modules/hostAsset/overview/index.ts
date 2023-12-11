/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-13 10:50:21
 * @LastEditTime: 2022-10-19 10:59:15
 */
import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import { RouterTransition } from '@/components/transition';
const routeName = 'hostAsset-layout-overview';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'overview',
    name: routeName,
    //有且仅有一个子路由，自动重定向
    redirect: '/hostAsset/overview/host',
    meta: {
      title: 'asset.overview',
      permission: routeName,
      icon: '#ax-Mnav-dashboard',
    },
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'host',
        name: `${routeName}-host`,
        meta: {
          title: 'asset.host',
          parentSelectedKeys: routeName,
          permission: routeName,
        },
        component: () => import('@/views/hostAsset/views/overview/index.vue'),
      },
    ],
  },
];
export default routes;
