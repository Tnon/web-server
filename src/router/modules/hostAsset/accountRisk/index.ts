/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-12 19:26:46
 * @LastEditTime: 2023-06-16 15:08:30
 */
import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import { RouterTransition } from '@/components/transition';
const routeName = 'hostAsset-layout-accountRisk';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'accountRisk',
    name: routeName,
    meta: {
      title: 'asset.accountRisk',
      permission: routeName,
      icon: '#ax-nav-zc-RiskAsset',
    },
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'apprisk',
        name: `${routeName}-apprisk`,
        redirect: '/hostAsset/accountRisk/apprisk/viewPro',
        meta: {
          title: 'asset.accountRiskapprisk',
          permission: `${routeName}-apprisk`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-apprisk-viewPro`,
            meta: {
              parentSelectedKeys: `${routeName}-apprisk`,
              type: 'apprisk',
              title: '应用风险视图',
              permission: `${routeName}-apprisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-apprisk-viewIp`,
            meta: {
              parentSelectedKeys: `${routeName}-apprisk`,
              type: 'apprisk',
              title: '主机视图',
              permission: `${routeName}-apprisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-apprisk-detail`,
            meta: {
              parentSelectedKeys: `${routeName}-apprisk`,
              type: 'apprisk',
              title: '视图详情',
              permission: `${routeName}-apprisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/detail/index.vue'),
          },
        ],
      },
      {
        path: 'sysrisk',
        name: `${routeName}-sysrisk`,
        redirect: '/hostAsset/accountRisk/sysrisk/viewPro',
        meta: {
          title: 'asset.accountRisksysrisk',
          permission: `${routeName}-sysrisk`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-sysrisk-viewPro`,
            meta: {
              parentSelectedKeys: `${routeName}-sysrisk`,
              type: 'sysrisk',
              title: '系统风险视图',
              permission: `${routeName}-sysrisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-sysrisk-viewIp`,
            meta: {
              parentSelectedKeys: `${routeName}-sysrisk`,
              type: 'sysrisk',
              title: '主机视图',
              permission: `${routeName}-sysrisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-sysrisk-detail`,
            meta: {
              parentSelectedKeys: `${routeName}-sysrisk`,
              type: 'sysrisk',
              title: '视图详情',
              permission: `${routeName}-sysrisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/detail/index.vue'),
          },
        ],
      },
      {
        path: 'accrisk',
        name: `${routeName}-accrisk`,
        redirect: '/hostAsset/accountRisk/accrisk/viewPro',
        meta: {
          title: 'asset.accountRiskaccrisk',
          permission: `${routeName}-accrisk`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-accrisk-viewPro`,
            meta: {
              parentSelectedKeys: `${routeName}-accrisk`,
              type: 'accrisk',
              title: '账户风险视图',
              permission: `${routeName}-accrisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-accrisk-viewIp`,
            meta: {
              parentSelectedKeys: `${routeName}-accrisk`,
              type: 'accrisk',
              title: '主机视图',
              permission: `${routeName}-accrisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-accrisk-detail`,
            meta: {
              parentSelectedKeys: `${routeName}-accrisk`,
              type: 'accrisk',
              title: '视图详情',
              permission: `${routeName}-accrisk`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/appSysAccRisk/detail/index.vue'),
          },
        ],
      },
      {
        path: 'weakpwd',
        name: `${routeName}-weakpwd`,
        redirect: '/hostAsset/accountRisk/weakpwd/viewPro',
        meta: {
          title: 'asset.accountRiskweakpwd',
          permission: `${routeName}-weakpwd`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-weakpwd-viewPro`,
            meta: {
              parentSelectedKeys: `${routeName}-weakpwd`,
              type: 'weakpwd',
              title: '系统弱密码视图',
              permission: `${routeName}-weakpwd`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/accountRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-weakpwd-viewIp`,
            meta: {
              parentSelectedKeys: `${routeName}-weakpwd`,
              type: 'weakpwd',
              title: '主机视图',
              permission: `${routeName}-weakpwd`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/accountRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-weakpwd-detail`,
            meta: {
              parentSelectedKeys: `${routeName}-weakpwd`,
              type: 'weakpwd',
              title: '视图详情',
              permission: `${routeName}-weakpwd`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/accountRisk/detail/index.vue'),
          },
        ],
      },
      {
        path: 'appweakpwd',
        name: `${routeName}-appweakpwd`,
        redirect: '/hostAsset/accountRisk/appweakpwd/viewPro',
        meta: {
          title: 'asset.accountRiskappweakpwd',
          permission: `${routeName}-appweakpwd`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-appweakpwd-viewPro`,
            meta: {
              parentSelectedKeys: `${routeName}-appweakpwd`,
              type: 'appweakpwd',
              title: '应用弱密码视图',
              permission: `${routeName}-appweakpwd`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/accountRisk/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-appweakpwd-viewIp`,
            meta: {
              parentSelectedKeys: `${routeName}-appweakpwd`,
              type: 'appweakpwd',
              title: '主机视图',
              permission: `${routeName}-appweakpwd`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/accountRisk/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-appweakpwd-detail`,
            meta: {
              parentSelectedKeys: `${routeName}-appweakpwd`,
              type: 'appweakpwd',
              title: '视图详情',
              permission: `${routeName}-appweakpwd`,
            },
            component: () =>
              import('@/views/hostAsset/views/riskAsset/accountRisk/detail/index.vue'),
          },
        ],
      },
    ],
  },
];
export default routes;
