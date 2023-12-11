import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import { RouterTransition } from '@/components/transition';
import hostDetailRouters from './detail';
const routeName = 'hostAsset-layout-assetInfo';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'assetInfo',
    name: routeName,
    meta: {
      title: 'asset.assetInfo',
      permission: routeName,
      icon: '#ax-nav-zc-BaseAsset',
    },
    component: markRaw(RouterTransition),
    children: [
      {
        path: 'host',
        name: `${routeName}-host`,
        redirect: '/hostAsset/assetInfo/host',
        meta: {
          title: 'asset.host',
          permission: `${routeName}-host`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: '',
            name: `${routeName}-host-index`,
            meta: {
              title: '主机',
              parentSelectedKeys: `${routeName}-host`,
              permission: `${routeName}-host`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/host/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-host-detail`,
            redirect: '/hostAsset/assetInfo/host/detail/host',
            meta: {
              title: '主机详情',
              parentSelectedKeys: `${routeName}-host`,
              permission: `${routeName}-host`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/hostDetail/index.vue'),
            children: [...hostDetailRouters],
          },
          {
            path: 'system',
            name: `${routeName}-host-system`,
            meta: {
              title: '系统信息视图',
              parentSelectedKeys: `${routeName}-host`,
              permission: `${routeName}-host`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/system/index.vue'),
          },
          {
            path: 'systemDetail',
            name: `${routeName}-host-systemDetail`,
            meta: {
              title: '系统信息详情视图',
              parentSelectedKeys: `${routeName}-host`,
              permission: `${routeName}-host`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/systemDetail/index.vue'),
          },
        ],
      },
      {
        path: 'process',
        name: `${routeName}-process`,
        redirect: '/hostAsset/assetInfo/process/viewPro',
        meta: {
          title: 'asset.process',
          permission: `${routeName}-process`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-process-viewPro`,
            meta: {
              title: '进程视图',
              parentSelectedKeys: `${routeName}-process`,
              type: 'process',
              permission: `${routeName}-process`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-process-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-process`,
              type: 'process',
              permission: `${routeName}-process`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-process-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-process`,
              type: 'process',
              permission: `${routeName}-process`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'port',
        name: `${routeName}-port`,
        redirect: '/hostAsset/assetInfo/port/viewPro',
        meta: {
          title: 'asset.port',
          permission: `${routeName}-port`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-port-viewPro`,
            meta: {
              title: '端口视图',
              parentSelectedKeys: `${routeName}-port`,
              type: 'port',
              permission: `${routeName}-port`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-port-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-port`,
              type: 'port',
              permission: `${routeName}-port`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-port-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-port`,
              type: 'port',
              permission: `${routeName}-port`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'account',
        name: `${routeName}-account`,
        redirect: '/hostAsset/assetInfo/account/viewPro',
        meta: {
          title: 'asset.account',
          permission: `${routeName}-account`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-account-viewPro`,
            meta: {
              title: '账户视图',
              parentSelectedKeys: `${routeName}-account`,
              type: 'account',
              permission: `${routeName}-account`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-account-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-account`,
              type: 'account',
              permission: `${routeName}-account`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-account-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-account`,
              type: 'account',
              permission: `${routeName}-account`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'service',
        name: `${routeName}-service`,
        redirect: '/hostAsset/assetInfo/service/viewPro',
        meta: {
          title: 'asset.service',
          permission: `${routeName}-service`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-service-viewPro`,
            meta: {
              title: '服务视图',
              parentSelectedKeys: `${routeName}-service`,
              type: 'service',
              permission: `${routeName}-service`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-service-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-service`,
              type: 'service',
              permission: `${routeName}-service`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-service-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-service`,
              type: 'service',
              permission: `${routeName}-service`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'kernel',
        name: `${routeName}-kernel`,
        redirect: '/hostAsset/assetInfo/kernel/viewPro',
        meta: {
          title: 'asset.kernel',
          permission: `${routeName}-kernel`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-kernel-viewPro`,
            meta: {
              title: '内核视图',
              parentSelectedKeys: `${routeName}-kernel`,
              type: 'kernel',
              permission: `${routeName}-kernel`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-kernel-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-kernel`,
              type: 'kernel',
              permission: `${routeName}-kernel`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-kernel-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-kernel`,
              type: 'kernel',
              permission: `${routeName}-kernel`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'env',
        name: `${routeName}-env`,
        redirect: '/hostAsset/assetInfo/env/viewPro',
        meta: {
          title: 'asset.env',
          permission: `${routeName}-env`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-env-viewPro`,
            meta: {
              title: '环境变量视图',
              parentSelectedKeys: `${routeName}-env`,
              type: 'env',
              permission: `${routeName}-env`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-env-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-env`,
              type: 'env',
              permission: `${routeName}-env`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-env-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-env`,
              type: 'env',
              permission: `${routeName}-env`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // 1025去掉共享文件夹
      // {
      //   path: 'share',
      //   name: `${routeName}-assetInfo-share`,
      //   redirect: '/hostAsset/assetInfo/share/viewPro',
      //   meta: {
      //     title: 'asset.share',
      //   },
      //   component: markRaw(RouterTransition),
      //   children: [
      //     {
      //       path: 'viewPro',
      //       name: `${routeName}-assetInfo-share-viewPro`,
      //       meta: {
      //         title: '共享文件夹视图',
      //         parentSelectedKeys: `${routeName}-assetInfo-share`,
      //         type: 'share',
      //       },
      //       component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
      //     },
      //     {
      //       path: 'viewIp',
      //       name: `${routeName}-assetInfo-share-viewIp`,
      //       meta: {
      //         title: '主机视图',
      //         parentSelectedKeys: `${routeName}-assetInfo-share`,
      //         type: 'share',
      //       },
      //       component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
      //     },
      //     {
      //       path: 'detail',
      //       name: `${routeName}-assetInfo-share-detail`,
      //       meta: {
      //         title: '详情',
      //         parentSelectedKeys: `${routeName}-assetInfo-share`,
      //         type: 'share',
      //       },
      //       component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
      //     },
      //   ],
      // },
      {
        path: 'webservice',
        name: `${routeName}-webservice`,
        redirect: '/hostAsset/assetInfo/webservice/viewPro',
        meta: {
          title: 'asset.webservice',
          permission: `${routeName}-webservice`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-webservice-viewPro`,
            meta: {
              title: 'web服务视图',
              parentSelectedKeys: `${routeName}-webservice`,
              type: 'webservice',
              permission: `${routeName}-webservice`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-webservice-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-webservice`,
              type: 'webservice',
              permission: `${routeName}-webservice`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-webservice-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-webservice`,
              type: 'webservice',
              permission: `${routeName}-webservice`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'webframe',
        name: `${routeName}-webframe`,
        redirect: '/hostAsset/assetInfo/webframe/viewPro',
        meta: {
          title: 'asset.webframe',
          permission: `${routeName}-webframe`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-webframe-viewPro`,
            meta: {
              title: 'web框架视图',
              parentSelectedKeys: `${routeName}-webframe`,
              type: 'webframe',
              permission: `${routeName}-webframe`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-webframe-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-webframe`,
              type: 'webframe',
              permission: `${routeName}-webframe`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-webframe-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-webframe`,
              type: 'webframe',
              permission: `${routeName}-webframe`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'website',
        name: `${routeName}-website`,
        redirect: '/hostAsset/assetInfo/website/viewPro',
        meta: {
          title: 'asset.website',
          permission: `${routeName}-website`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-website-viewPro`,
            meta: {
              title: 'web站点视图',
              parentSelectedKeys: `${routeName}-website`,
              type: 'website',
              permission: `${routeName}-website`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-website-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-website`,
              type: 'website',
              permission: `${routeName}-website`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-website-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-website`,
              type: 'website',
              permission: `${routeName}-website`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // web应用
      {
        path: 'webapp',
        name: `${routeName}-webapp`,
        redirect: '/hostAsset/assetInfo/webapp/viewPro',
        meta: {
          title: 'asset.webapp',
          permission: `${routeName}-webapp`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-webapp-viewPro`,
            meta: {
              title: 'web应用资产视图',
              parentSelectedKeys: `${routeName}-webapp`,
              type: 'webapp',
              permission: `${routeName}-webapp`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-webapp-viewIp`,
            meta: {
              title: 'web应用主机视图',
              parentSelectedKeys: `${routeName}-webapp`,
              type: 'webapp',
              permission: `${routeName}-webapp`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-webapp-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-webapp`,
              type: 'webapp',
              permission: `${routeName}-webapp`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'app',
        name: `${routeName}-app`,
        redirect: '/hostAsset/assetInfo/app/viewPro',
        meta: {
          title: 'asset.app',
          permission: `${routeName}-app`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-app-viewPro`,
            meta: {
              title: '软件应用视图',
              parentSelectedKeys: `${routeName}-app`,
              type: 'app',
              permission: `${routeName}-app`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-app-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-app`,
              type: 'app',
              permission: `${routeName}-app`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-app-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-app`,
              type: 'app',
              permission: `${routeName}-app`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // 数据库
      {
        path: 'database',
        name: `${routeName}-database`,
        redirect: '/hostAsset/assetInfo/database/viewPro',
        meta: {
          title: 'asset.database',
          permission: `${routeName}-database`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-database-viewPro`,
            meta: {
              title: '数据库资产视图',
              parentSelectedKeys: `${routeName}-database`,
              type: 'database',
              permission: `${routeName}-database`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-database-viewIp`,
            meta: {
              title: '数据库主机视图',
              parentSelectedKeys: `${routeName}-database`,
              type: 'database',
              permission: `${routeName}-database`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-database-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-database`,
              type: 'database',
              permission: `${routeName}-database`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      {
        path: 'package',
        name: `${routeName}-package`,
        redirect: '/hostAsset/assetInfo/package/viewPro',
        meta: {
          title: 'asset.package',
          permission: `${routeName}-package`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-package-viewPro`,
            meta: {
              title: 'web框架视图',
              parentSelectedKeys: `${routeName}-package`,
              type: 'package',
              permission: `${routeName}-package`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-package-viewIp`,
            meta: {
              title: '主机视图',
              parentSelectedKeys: `${routeName}-package`,
              type: 'package',
              permission: `${routeName}-package`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-package-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-package`,
              type: 'package',
              permission: `${routeName}-package`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // 新增Jar包
      {
        path: 'jar',
        name: `${routeName}-jar`,
        redirect: '/hostAsset/assetInfo/jar/viewPro',
        meta: {
          title: 'asset.jar',
          permission: `${routeName}-jar`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-jar-viewPro`,
            meta: {
              title: 'jar包资产视图',
              parentSelectedKeys: `${routeName}-jar`,
              type: 'jar',
              permission: `${routeName}-jar`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-jar-viewIp`,
            meta: {
              title: 'jar包主机视图',
              parentSelectedKeys: `${routeName}-jar`,
              type: 'jar',
              permission: `${routeName}-jar`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-jar-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-jar`,
              type: 'jar',
              permission: `${routeName}-jar`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // python包
      {
        path: 'python',
        name: `${routeName}-python`,
        redirect: '/hostAsset/assetInfo/python/viewPro',
        meta: {
          title: 'asset.python',
          permission: `${routeName}-python`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-python-viewPro`,
            meta: {
              title: 'python包资产视图',
              parentSelectedKeys: `${routeName}-python`,
              type: 'python',
              permission: `${routeName}-python`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-python-viewIp`,
            meta: {
              title: 'python包主机视图',
              parentSelectedKeys: `${routeName}-python`,
              type: 'python',
              permission: `${routeName}-python`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-python-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-python`,
              type: 'python',
              permission: `${routeName}-python`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // Npm包
      {
        path: 'npm',
        name: `${routeName}-npm`,
        redirect: '/hostAsset/assetInfo/npm/viewPro',
        meta: {
          title: 'asset.npm',
          permission: `${routeName}-npm`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-npm-viewPro`,
            meta: {
              title: 'npm包资产视图',
              parentSelectedKeys: `${routeName}-npm`,
              type: 'npm',
              permission: `${routeName}-npm`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-npm-viewIp`,
            meta: {
              title: 'npm包主机视图',
              parentSelectedKeys: `${routeName}-npm`,
              type: 'npm',
              permission: `${routeName}-npm`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-npm-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-npm`,
              type: 'npm',
              permission: `${routeName}-npm`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // 计划任务
      {
        path: 'task',
        name: `${routeName}-task`,
        redirect: '/hostAsset/assetInfo/task/viewPro',
        meta: {
          title: 'asset.task',
          permission: `${routeName}-task`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-task-viewPro`,
            meta: {
              title: '计划任务资产视图',
              parentSelectedKeys: `${routeName}-task`,
              type: 'task',
              permission: `${routeName}-task`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-task-viewIp`,
            meta: {
              title: '计划任务主机视图',
              parentSelectedKeys: `${routeName}-task`,
              type: 'task',
              permission: `${routeName}-task`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-task-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-task`,
              type: 'task',
              permission: `${routeName}-task`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // xinetd网络托管服务
      {
        path: 'xinetd',
        name: `${routeName}-xinetd`,
        redirect: '/hostAsset/assetInfo/xinetd/viewPro',
        meta: {
          title: 'asset.xinetd',
          permission: `${routeName}-xinetd`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-xinetd-viewPro`,
            meta: {
              title: 'xinetd资产视图',
              parentSelectedKeys: `${routeName}-xinetd`,
              type: 'xinetd',
              permission: `${routeName}-xinetd`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-xinetd-viewIp`,
            meta: {
              title: 'xinetd主机视图',
              parentSelectedKeys: `${routeName}-xinetd`,
              type: 'xinetd',
              permission: `${routeName}-xinetd`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-xinetd-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-xinetd`,
              type: 'xinetd',
              permission: `${routeName}-xinetd`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // webjs
      {
        path: 'webjs',
        name: `${routeName}-webjs`,
        redirect: '/hostAsset/assetInfo/webjs/viewPro',
        meta: {
          title: 'asset.webjs',
          permission: `${routeName}-webjs`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-webjs-viewPro`,
            meta: {
              title: 'webjs资产视图',
              parentSelectedKeys: `${routeName}-webjs`,
              type: 'webjs',
              permission: `${routeName}-webjs`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-webjs-viewIp`,
            meta: {
              title: 'webjs主机视图',
              parentSelectedKeys: `${routeName}-webjs`,
              type: 'webjs',
              permission: `${routeName}-webjs`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-webjs-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-webjs`,
              type: 'webjs',
              permission: `${routeName}-webjs`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
      // webapi
      {
        path: 'webapi',
        name: `${routeName}-webapi`,
        redirect: '/hostAsset/assetInfo/webapi/viewPro',
        meta: {
          title: 'asset.webapi',
          permission: `${routeName}-webapi`,
        },
        component: markRaw(RouterTransition),
        children: [
          {
            path: 'viewPro',
            name: `${routeName}-webapi-viewPro`,
            meta: {
              title: 'webapi资产视图',
              parentSelectedKeys: `${routeName}-webapi`,
              type: 'webapi',
              permission: `${routeName}-webapi`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewPro/index.vue'),
          },
          {
            path: 'viewIp',
            name: `${routeName}-webapi-viewIp`,
            meta: {
              title: 'webapi主机视图',
              parentSelectedKeys: `${routeName}-webapi`,
              type: 'webapi',
              permission: `${routeName}-webapi`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/viewIp/index.vue'),
          },
          {
            path: 'detail',
            name: `${routeName}-webapi-detail`,
            meta: {
              title: '详情',
              parentSelectedKeys: `${routeName}-webapi`,
              type: 'webapi',
              permission: `${routeName}-webapi`,
            },
            component: () => import('@/views/hostAsset/views/assetInfo/ppaske/detail.vue'),
          },
        ],
      },
    ],
  },
];
export default routes;
