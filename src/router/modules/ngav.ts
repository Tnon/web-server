/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2022-10-25 16:48:30
 */
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';

const routeName = 'acdr';
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
  {
    path: '/acdr',
    name: routeName,
    redirect: '/acdr',
    component: markRaw(RouterTransition),
    meta: {
      title: 'menu.ngav',
      icon: '#ax-Mnav-attack',
      permission: routeName,
    },
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          //首页
          title: '事件首页',
          permission: routeName,
        },
        component: () => import(/* webpackChunkName: "acdr-index" */ '@/views/ngav/index.vue'),
      },
      {
        path: 'detail',
        name: `${routeName}-detail`,
        meta: {
          //首页
          title: '事件详情',
          permission: routeName,
        },
        component: () => import(/* webpackChunkName: "acdr-index" */ '@/views/ngav/flow/index.vue'),
      },
    ],
  },
];

export default routes;
