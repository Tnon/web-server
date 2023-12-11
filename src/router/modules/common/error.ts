/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2022-10-10 14:02:08
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'error';
export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: `${routeName}-404`,
    meta: {
      title: '404',
    },
    component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue'),
  },
  {
    path: '/405',
    name: `${routeName}-405`,
    meta: {
      title: '405',
    },
    component: () => import(/* webpackChunkName: "405" */ '@/views/shared/error/405.vue'),
  },
];
