/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-11-02 16:49:37
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-run-layout-run-server';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'server',
    name: routeName,
    meta: {
      title: 'operation.server',
      selectedKeys: routeName,
      parentSelectedKeys: `operation-layout-run`,
      permission: `operation-layout-run`,
    },
    component: () => import('@/views/operation/run/server/index.vue'),
  },
];
export default routes;
