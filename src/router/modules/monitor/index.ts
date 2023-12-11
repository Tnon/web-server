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
    path: '/monitor',
    name: 'monitor',
    component: () => import('@/views/monitor/index.vue'),
  },
];

export default routes;
