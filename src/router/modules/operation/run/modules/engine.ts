/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-10-19 11:12:18
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-run-layout-run-engine';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'engine',
    name: routeName,
    meta: {
      title: 'operation.engine',
      selectedKeys: routeName,
      parentSelectedKeys: `operation-layout-run`,
      permission: `operation-layout-run`,
    },
    component: () => import('@/views/operation/run/engine/index.vue'),
  },
];
export default routes;
