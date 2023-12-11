/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2022-10-19 11:53:54
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';

const routeName = 'avatar';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/avatar',
    name: routeName,
    redirect: '/avatar',
    component: markRaw(RouterTransition),
    meta: {
      title: '个人中心过度',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          title: '个人设置首页',
          permission: routeName,
        },
        component: () => import(/* webpackChunkName: "avatar-index" */ '@/views/avatar/index.vue'),
      },
    ],
  },
];

export default routes;
