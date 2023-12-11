/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2022-10-19 11:11:58
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import upgrationRouters from './modules';
import { markRaw } from 'vue';
const routeName = 'operation-layout-run';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'run',
    name: routeName,
    meta: {
      title: 'operation.run',
      icon: '#ax-wh-function',
      single: true,
      permission: routeName,
    },
    redirect: '/operation/run/client',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        redirect: '/operation/run/client',
        meta: {
          title: '运行管理布局，需重定向',
          permission: routeName,
        },
        component: () => import('@/views/operation/run/index.vue'),
        children: [...upgrationRouters],
      },
    ],
  },
];
export default routes;
