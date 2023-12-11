/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-10-25 11:47:58
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import shared from './modules/common/shared';
import monitor from './modules/monitor';
import { errorRoutes } from './modules/common/error';
import { adminRouters, setAvatarRouters } from '@/router/common';
import { createGuard } from './guard';
import { App } from 'vue';
const routeName = 'Layout';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeName,
    meta: {
      title: '整体布局，手动重定向',
    },
    component: () => import('@/layout/index.vue'),
    children: [...adminRouters, ...setAvatarRouters],
  },
  ...monitor,
  ...shared,
  ...errorRoutes,
];

const router = createRouter({
  history: createWebHashHistory(''),
  routes,
});
export function setupRouter(app: App) {
  app.use(router);
  createGuard(router);
  return router;
}
export default router;
