/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2023-08-29 15:29:34
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-behavior';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'behavior',
    name: routeName,
    meta: {
      title: 'operation.behalog',
      permission: routeName,
    },
    redirect: '/operation/behavior/log',
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'log',
        name: `${routeName}-log`,
        meta: {
          title: 'operation.behaviorLog',
          icon: '#ax-wh-hostbehaviorjournal',
          permission: `${routeName}-log`,
        },
        component: () => import('@/views/operation/log/behavior/index.vue'),
      },
      {
        path: 'config',
        name: `${routeName}-config`,
        meta: {
          title: 'operation.collConfig',
          icon: '#ax-wh-hostbehaviorjournal',
          permission: `${routeName}-config`,
        },
        component: () => import('@/views/operation/log/config/index.vue'),
      },
    ],
  },
];
export default routes;
