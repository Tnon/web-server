/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-07-13 16:10:51
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'reinforce-layout-bait';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'bait',
    name: routeName,
    meta: {
      title: 'reinforce.baitp',
      icon: '#ax-nav-cl-BaitFile',
      single: true,
      permission: routeName,
    },
    redirect: '/reinforce/bait',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '诱饵文件',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/bait/index.vue'),
      },
      {
        path: 'rule',
        name: `${routeName}-rule`,
        meta: {
          parentSelectedKeys: routeName,
          title: '监控规则 规则视图',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/bait/views/rule/index.vue'),
      },
      {
        path: 'host',
        name: `${routeName}-host`,
        meta: {
          parentSelectedKeys: routeName,
          title: '监控规则 主机视图',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/bait/views/host/index.vue'),
      },
      {
        path: 'form',
        name: `${routeName}-form`,
        meta: {
          parentSelectedKeys: routeName,
          title: '监控规则',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/bait/views/ruleForm/index.vue'),
      },
    ],
  },
];
export default routes;
