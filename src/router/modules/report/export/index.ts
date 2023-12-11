/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-11 18:38:56
 * @LastEditTime: 2022-10-19 14:05:10
 */
import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import { RouterTransition } from '@/components/transition';

const routeName = 'report-layout-export';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'export',
    name: routeName,
    redirect: '/report/export',
    meta: {
      title: 'report.dataExport',
      permission: routeName,
    },
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          title: '数据导出-首页',
          parentSelectedKeys: routeName,
          permission: routeName,
        },
        component: () => import('@/views/report/export/index.vue'),
      },
    ],
  },
];
export default routes;
