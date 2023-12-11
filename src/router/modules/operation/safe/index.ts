/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-28 20:57:46
 * @LastEditTime: 2022-10-25 11:54:28
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-safe';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'safe',
    name: routeName,
    meta: {
      title: 'operation.safe',
      permission: routeName,
    },
    redirect: '/operation/safe/basics',
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'basics',
        name: `${routeName}-basics`,
        meta: {
          title: 'operation.basicsSafe',
          icon: '#ax-wh-basicsecurity',
          permission: `${routeName}-basics`,
        },
        component: () => import('@/views/operation/safe/basics/index.vue'),
      },
    ],
  },
];
export default routes;
