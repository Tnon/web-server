/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2022-10-26 16:49:17
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'strategy-layout-asset';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'asset',
    name: routeName,
    meta: {
      title: 'strategy.asset',
      icon: '#ax-nav-assetspolicy',
      single: true,
      permission: routeName,
    },
    redirect: '/strategy/asset',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '资产清点策略首页',
          permission: routeName,
        },
        component: () => import('@/views/strategy/asset/index.vue'),
      },
    ],
  },
];
export default routes;
