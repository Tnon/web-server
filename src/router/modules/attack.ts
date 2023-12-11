/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2022-10-19 10:57:54
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';

const routeName = 'attack';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/attack',
    name: routeName,
    component: markRaw(RouterTransition),
    redirect: '/attack',
    meta: {
      title: 'menu.attack',
      icon: '#ax-Mnav-risk',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          //首页
          title: '告警首页',
          permission: routeName,
        },
        component: () => import(/* webpackChunkName: "attack-index" */ '@/views/attack/index.vue'),
      },
    ],
  },
];

export default routes;
