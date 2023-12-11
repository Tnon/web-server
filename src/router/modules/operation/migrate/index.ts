/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2022-10-19 11:12:46
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-migrate';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'migrate',
    name: routeName,
    meta: {
      title: 'operation.migrate',
      single: true,
      icon: '#ax-wh-transfer',
      permission: routeName,
    },
    redirect: '/operation/migrate',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          title: '迁移',
          parentSelectedKeys: routeName,
          permission: routeName,
        },
        component: () => import('@/views/operation/migrate/index.vue'),
      },
    ],
  },
];
export default routes;
