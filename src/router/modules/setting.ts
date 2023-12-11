/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2022-10-19 11:53:44
 */
import { RouteRecordRaw } from 'vue-router';
const routeName = 'setting';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/setting',
    name: routeName,
    redirect: '/setting',
    component: markRaw(RouterTransition),
    meta: {
      title: '设置过度组件',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          title: '设置首页',
          permission: routeName,
        },
        component: () => import('@/views/setting/index.vue'),
      },
    ],
  },
];

export default routes;
