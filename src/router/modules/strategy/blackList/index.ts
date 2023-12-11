/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-02-16 19:55:58
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'strategy-layout-black';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'black',
    name: routeName,
    meta: {
      title: 'strategy.black',
      icon: '#ax-nav-blockinglist',
      single: true,
      permission: routeName,
    },
    redirect: '/strategy/black',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '全局自动拦截名单首页',
          permission: routeName,
        },
        component: () => import('@/views/strategy/black/index.vue'),
      },
    ],
  },
];
export default routes;
