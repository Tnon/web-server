/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-10-19 11:11:24
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-upgrade-layout-upgrade-client';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'client',
    name: routeName,
    meta: {
      title: 'operation.client',
      selectedKeys: routeName,
      parentSelectedKeys: `operation-layout-upgrade`,
      permission: 'operation-layout-upgrade',
    },
    component: () => import('@/views/operation/upgrade/client/index.vue'),
  },
];
export default routes;
