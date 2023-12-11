/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2022-10-26 11:43:21
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'strategy-layout-safe';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'safe',
    name: routeName,
    meta: {
      title: 'strategy.safe',
      icon: '#ax-nav-securitypolicy',
      single: true,
      permission: routeName,
    },
    redirect: '/strategy/safe',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '安全防护策略首页',
          permission: routeName,
        },
        component: () => import('@/views/strategy/safe/index.vue'),
      },
    ],
  },
];
export default routes;
