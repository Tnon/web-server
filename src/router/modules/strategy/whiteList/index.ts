/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-02-16 19:55:47
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'strategy-layout-white';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'white',
    name: routeName,
    meta: {
      title: 'strategy.white',
      icon: '#ax-nav-whitelist',
      permission: routeName,
      single: true,
    },
    redirect: '/strategy/white',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          permission: routeName,
          title: '攻击检测白白名单首页',
        },
        component: () => import('@/views/strategy/white/index.vue'),
      },
    ],
  },
];
export default routes;
