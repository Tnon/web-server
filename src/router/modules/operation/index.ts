/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-26 14:45:43
 * @LastEditTime: 2022-10-19 11:10:26
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import upgrationRouters from './modules';
const routeName = 'operation';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/operation',
    name: routeName,
    redirect: '/operation',
    component: markRaw(RouterTransition),
    meta: {
      title: 'menu.operation',
      icon: '#ax-Mnav-maintain',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        meta: {
          title: '维护布局，需重定向',
          permission: routeName,
        },
        component: () => import('@/views/operation/index.vue'),
        children: [...upgrationRouters],
      },
    ],
  },
];

export default routes;
