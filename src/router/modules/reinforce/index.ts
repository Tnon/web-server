/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-26 14:45:43
 * @LastEditTime: 2023-03-09 16:12:45
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import reinforceRouters from './modules';
const routeName = 'reinforce';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/reinforce',
    name: routeName,
    redirect: '/reinforce',
    component: markRaw(RouterTransition),
    meta: {
      title: 'menu.reinforce',
      icon: '#ax-Mnav-reinforce',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        meta: {
          title: '加固布局，需重定向',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/index.vue'),
        children: [...reinforceRouters],
      },
    ],
  },
];

export default routes;
