/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-03-09 16:10:36
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'reinforce-layout-file';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'file',
    name: routeName,
    meta: {
      title: 'reinforce.filep',
      icon: '#ax-nav-cl-fileprotect',
      single: true,
      permission: routeName,
    },
    redirect: '/reinforce/file',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '文件保护',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/file/index.vue'),
      },
      {
        path: 'rule',
        name: `${routeName}-rule`,
        meta: {
          parentSelectedKeys: routeName,
          title: '监控规则 规则视图',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/file/views/rule/index.vue'),
      },
      {
        path: 'host',
        name: `${routeName}-host`,
        meta: {
          parentSelectedKeys: routeName,
          title: '监控规则 主机视图',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/file/views/host/index.vue'),
      },
      {
        path: 'form',
        name: `${routeName}-form`,
        meta: {
          parentSelectedKeys: routeName,
          title: '监控规则',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/file/views/ruleForm/index.vue'),
      },
    ],
  },
];
export default routes;
