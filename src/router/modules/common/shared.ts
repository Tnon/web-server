/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2023-05-31 14:03:29
 */
import { RouteRecordRaw } from 'vue-router';
/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/shared/login/index.vue'),
  },

  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/shared/download/index.vue'),
  },
  {
    path: '/adaptation',
    name: 'adaptation',
    meta: {
      permission: 'adaptation',
    },
    component: () => import('@/views/shared/adaptation/index.vue'),
  },
  {
    path: '/permission',
    name: 'permission',
    component: () => import('@/views/shared/permission/index.vue'),
  },
  {
    path: '/language',
    name: 'language',
    component: () => import(/* webpackChunkName: "language" */ '@/views/shared/language/index.vue'),
  },
];

export default routes;
