/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-26 14:45:43
 * @LastEditTime: 2022-10-19 11:08:04
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import strategyRouters from './modules';
const routeName = 'strategy';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/strategy',
    name: routeName,
    redirect: '/strategy',
    component: markRaw(RouterTransition),
    meta: {
      title: 'menu.strategy',
      icon: '#ax-Mnav-policy',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        meta: {
          title: '策略布局，需重定向',
          permission: routeName,
        },
        component: () => import('@/views/strategy/index.vue'),
        children: [...strategyRouters],
      },
    ],
  },
];

export default routes;
