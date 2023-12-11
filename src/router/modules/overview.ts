/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-10-19 10:57:43
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
const routeName = 'overview';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/overview',
    name: routeName,
    component: markRaw(RouterTransition),
    redirect: '/overview',
    meta: {
      title: 'menu.overview',
      icon: '#ax-Mnav-dashboard',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          //首页
          title: '总览首页',
          permission: routeName,
        },
        component: () =>
          import(/* webpackChunkName: "overview-index" */ '@/views/overview/index.vue'),
      },
    ],
  },
];
export default routes;
