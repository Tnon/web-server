/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-04-28 14:59:18
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'reinforce-layout-virpatch';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'virpatch',
    name: routeName,
    meta: {
      title: 'reinforce.virpatch',
      icon: '#ax-nav-cl-fileprotect',
      single: true,
      permission: routeName,
    },
    redirect: '/reinforce/virpatch',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '虚拟补丁',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/virpatch/index.vue'),
      },
      {
        path: 'detail',
        name: `${routeName}-detail`,
        meta: {
          parentSelectedKeys: routeName,
          title: '已启用补丁',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/virpatch/views/detail/index.vue'),
      },
      // {
      //   path: 'rule',
      //   name: `${routeName}-rule`,
      //   meta: {
      //     parentSelectedKeys: routeName,
      //     title: '监控规则 规则视图',
      //     permission: routeName,
      //   },
      //   component: () => import('@/views/reinforce/file/views/rule/index.vue'),
      // },
      // {
      //   path: 'host',
      //   name: `${routeName}-host`,
      //   meta: {
      //     parentSelectedKeys: routeName,
      //     title: '监控规则 主机视图',
      //     permission: routeName,
      //   },
      //   component: () => import('@/views/reinforce/file/views/host/index.vue'),
      // },
      // {
      //   path: 'form',
      //   name: `${routeName}-form`,
      //   meta: {
      //     parentSelectedKeys: routeName,
      //     title: '监控规则',
      //     permission: routeName,
      //   },
      //   component: () => import('@/views/reinforce/file/views/ruleForm/index.vue'),
      // },
    ],
  },
];
export default routes;
