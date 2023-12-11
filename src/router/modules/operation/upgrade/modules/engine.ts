/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-10-19 11:11:32
 */
import { RouteRecordRaw } from 'vue-router';

const routeName = 'operation-layout-upgrade-layout-upgrade-engine';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'engine',
    name: routeName,
    meta: {
      title: 'operation.engine',
      selectedKeys: routeName,
      parentSelectedKeys: `operation-layout-upgrade`,
      permission: 'operation-layout-upgrade',
    },
    component: () => import('@/views/operation/upgrade/engine/index.vue'),
  },
];
export default routes;
