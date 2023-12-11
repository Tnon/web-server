/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-28 20:57:46
 * @LastEditTime: 2023-02-15 16:14:46
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-basics';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'basics',
    name: routeName,
    meta: {
      title: 'operation.basics',
      permission: routeName,
    },
    redirect: '/operation/basics/notice',
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'notice',
        name: `${routeName}-notice`,
        meta: {
          title: 'operation.basicsNotice',
          icon: '#ax-wh-notice',
          permission: `${routeName}-notice`,
        },
        component: () => import('@/views/operation/basics/notice/index.vue'),
      },
      {
        path: 'storage',
        name: `${routeName}-storage`,
        meta: {
          title: 'operation.basicsStorage',
          icon: '#ax-wh-Storageandbackup',
          permission: `${routeName}-storage`,
        },
        component: () => import('@/views/operation/basics/storage/index.vue'),
      },
      {
        path: 'syslog',
        name: `${routeName}-syslog`,
        meta: {
          title: 'operation.basicsSyslog',
          icon: '#ax-wh-syslog',
          permission: `${routeName}-syslog`,
        },
        component: () => import('@/views/operation/basics/syslog/index.vue'),
      },
      {
        path: 'server',
        name: `${routeName}-server`,
        meta: {
          title: 'operation.tygl',
          icon: '#ax-wh-syslog',
          permission: `${routeName}-server`,
        },
        component: () => import('@/views/operation/basics/server/index.vue'),
      },
    ],
  },
];
export default routes;
