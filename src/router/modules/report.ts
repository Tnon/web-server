/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-28 13:11:04
 * @LastEditTime: 2022-10-19 11:09:03
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import reportChildRoutes from './report/index';

const routeName = 'report';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/report',
    name: routeName,
    redirect: '/report',
    component: markRaw(RouterTransition),
    meta: {
      title: 'menu.report',
      icon: '#ax-Mnav-journal',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-layout`,
        meta: {
          //首页
          title: '报告布局，需重定向',
          permission: routeName,
        },
        component: () => import(/* webpackChunkName: "report-layout" */ '@/views/report/index.vue'),
        children: [...reportChildRoutes],
      },
    ],
  },
];
export default routes;
