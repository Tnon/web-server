/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-03-09 16:10:54
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'reinforce-layout-baseline';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'baseline',
    name: routeName,
    meta: {
      title: 'reinforce.baseline',
      icon: '#ax-nav-cl-baseline',
      permission: routeName,
      single: true,
    },
    redirect: '/reinforce/baseline',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '基线检查',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/baseline/index.vue'),
      },
      {
        path: 'detail',
        name: `${routeName}-detail`,
        meta: {
          parentSelectedKeys: routeName,
          title: '任务详情',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/baseline/views/detail/index.vue'),
      },
      {
        path: 'rule',
        name: `${routeName}-rule`,
        meta: {
          parentSelectedKeys: routeName,
          title: '基线规则',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/baseline/views/rule/index.vue'),
      },
      {
        path: 'task',
        name: `${routeName}-task`,
        meta: {
          parentSelectedKeys: routeName,
          title: '任务列表',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/baseline/views/task/index.vue'),
      },
    ],
  },
];
export default routes;
