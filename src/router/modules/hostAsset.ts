/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-10-19 10:58:40
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import hostAsset from './hostAsset/index';
const routeName = 'hostAsset';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/hostAsset',
    name: routeName,
    redirect: '/hostAsset',
    component: markRaw(RouterTransition),
    meta: {
      title: 'menu.assets',
      icon: '#ax-Mnav-property',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        meta: {
          title: '资产布局，手动重定向',
          permission: routeName,
        },
        component: () => import('@/views/hostAsset/index.vue'),

        children: [...hostAsset],
      },
    ],
  },
];

export default routes;
