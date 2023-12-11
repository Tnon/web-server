/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-11 18:39:15
 * @LastEditTime: 2022-10-25 10:43:44
 */
import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import { RouterTransition } from '@/components/transition';

const routeName = 'report-layout-reportCreate';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'reportCreate',
    name: routeName,
    redirect: '/report/reportCreate',
    meta: {
      title: 'report.reportCreate',
      permission: routeName,
    },
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          title: '生成报表-首页',
          parentSelectedKeys: routeName,
          permission: routeName,
        },
        component: () => import('@/views/report/reportCreate/index.vue'),
      },
    ],
  },
];
export default routes;
