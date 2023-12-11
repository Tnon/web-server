/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-10-19 11:12:12
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-run-layout-run-client';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'client',
    name: routeName,
    meta: {
      title: 'operation.client',
      selectedKeys: routeName,
      parentSelectedKeys: `operation-layout-run`,
      permission: `operation-layout-run`,
    },
    component: () => import('@/views/operation/run/client/index.vue'),
  },
];
export default routes;
