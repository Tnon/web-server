/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-14 10:08:22
 * @LastEditTime: 2023-04-15 13:36:52
 */
/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-04-15 13:35:50
 */
import { RouterTransition } from '@/components/transition';
import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
const routeName = 'reinforce-layout-secpatch';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'secpatch',
    name: routeName,
    meta: {
      title: 'reinforce.secpatch',
      icon: '#ax-nav-cl-SecurityPatch',
      single: true,
      permission: routeName,
    },
    redirect: '/reinforce/secpatch',
    component: markRaw(RouterTransition),
    children: [
      {
        path: '',
        name: `${routeName}-index`,
        meta: {
          parentSelectedKeys: routeName,
          title: '安全补丁',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/secpatch/index.vue'),
      },
      {
        path: 'detail',
        name: `${routeName}-detail`,
        meta: {
          parentSelectedKeys: routeName,
          title: '安全补丁详情',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/secpatch/views/detail/index.vue'),
      },
      {
        path: 'host',
        name: `${routeName}-host`,
        meta: {
          parentSelectedKeys: routeName,
          title: '安全补丁主机视图',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/secpatch/views/host/index.vue'),
      },
      {
        path: 'hostdetail',
        name: `${routeName}-hostdetail`,
        meta: {
          parentSelectedKeys: routeName,
          title: '安全补丁主机视图详情',
          permission: routeName,
        },
        component: () => import('@/views/reinforce/secpatch/views/host/views/detail/index.vue'),
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
