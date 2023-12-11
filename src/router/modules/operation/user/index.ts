/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2022-10-25 09:40:06
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-user';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'user',
    name: routeName,
    meta: {
      title: 'operation.user',
      permission: routeName,
    },
    redirect: '/operation/user/manage',
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'manage',
        name: `${routeName}-manage`,
        meta: {
          title: 'operation.userManage',
          icon: '#ax-wh-admin',
          permission: `${routeName}-manage`,
        },
        component: () => import('@/views/operation/user/manage/index.vue'),
      },
      {
        path: 'log',
        name: `${routeName}-log`,
        meta: {
          title: 'operation.userLog',
          icon: '#ax-wh-adminjournal',
          permission: `${routeName}-log`,
        },
        component: () => import('@/views/operation/user/log/index.vue'),
      },
      {
        path: 'role',
        name: `${routeName}-role`,
        meta: {
          title: 'operation.userRole',
          icon: '#ax-wh-privileges',
          permission: `${routeName}-role`,
        },
        component: () => import('@/views/operation/user/role/index.vue'),
      },
    ],
  },
];
export default routes;
