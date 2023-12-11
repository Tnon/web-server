/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-11-02 16:12:36
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-upgrade-layout-upgrade-server';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'server',
    name: routeName,
    meta: {
      title: 'operation.server',
      selectedKeys: routeName,
      parentSelectedKeys: `operation-layout-upgrade`,
      permission: 'operation-layout-upgrade',
    },
    component: () => import('@/views/operation/upgrade/server/index.vue'),
  },
];
export default routes;
