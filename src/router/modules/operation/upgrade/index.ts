/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2022-10-19 11:10:53
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import upgrationRouters from './modules';
import { markRaw } from 'vue';
const routeName = 'operation-layout-upgrade';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'upgrade',
    name: routeName,
    meta: {
      title: 'operation.upgrade',
      icon: '#ax-wh-installandupgrade',
      single: true,
      permission: routeName,
    },
    redirect: '/operation/upgrade/client',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        redirect: '/operation/upgrade/client',
        meta: {
          title: '安装与升级布局，需重定向',
          permission: routeName,
        },
        component: () => import('@/views/operation/upgrade/index.vue'),
        children: [...upgrationRouters],
      },
    ],
  },
];
export default routes;
