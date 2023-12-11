/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-14 10:54:19
 * @LastEditTime: 2023-08-29 15:30:37
 */
import { SelectLevel, ALL_PERMISSION } from '@/store/modules/user/type';
export const routersSingleMap: ALL_PERMISSION = {
  checkedKeys: [],
  halfCheckedKeys: [],
  permissionMap: [
    {
      routerName: 'overview',
      title: '总览',
      checkLevel: SelectLevel.None,
    },
    {
      routerName: 'monitor',
      title: '监控',
      checkLevel: SelectLevel.None,
    },
    {
      routerName: 'attack',
      title: '告警',
      checkLevel: SelectLevel.None,
    },
    {
      routerName: 'acdr',
      title: '事件',
      checkLevel: SelectLevel.None,
    },
    {
      routerName: 'hostAsset',
      title: '资产',
      checkLevel: SelectLevel.None,
      children: [
        {
          routerName: 'hostAsset-layout-overview',
          title: '总览',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'hostAsset-layout-assetRisk',
          title: '资产漏洞',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'hostAsset-layout-assetRisk-kernelvul',
              title: '内核漏洞',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetRisk-appvul',
              title: '应用漏洞',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetRisk-webvul',
              title: 'web漏洞',
              checkLevel: SelectLevel.None,
            },
          ],
        },
        {
          routerName: 'hostAsset-layout-accountRisk',
          title: '风险资产',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'hostAsset-layout-accountRisk-apprisk',
              title: '应用风险',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-accountRisk-sysrisk',
              title: '系统风险',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-accountRisk-accrisk',
              title: '账户风险',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-accountRisk-weakpwd',
              title: '系统弱密码',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-accountRisk-appweakpwd',
              title: '应用弱密码',
              checkLevel: SelectLevel.None,
            },
          ],
        },
        {
          routerName: 'hostAsset-layout-assetInfo',
          title: '基础资产',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'hostAsset-layout-assetInfo-host',
              title: '主机',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-process',
              title: '进程',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-port',
              title: '端口',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-account',
              title: '账号',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-service',
              title: '服务',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-kernel',
              title: '内核',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-env',
              title: '环境变量',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-share',
              title: '共享文件夹',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-webservice',
              title: 'web服务',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-webframe',
              title: 'web框架',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-website',
              title: 'web站点',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-webapp',
              title: 'web应用',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-app',
              title: '软件应用',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-database',
              title: '数据库',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-package',
              title: '系统安装包',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-jar',
              title: 'Jar包',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-python',
              title: 'Python包',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-npm',
              title: 'Npm包',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-task',
              title: '计划任务',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-xinetd',
              title: 'Xinetd网络托管服务',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-webjs',
              title: 'webjs',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'hostAsset-layout-assetInfo-webapi',
              title: 'webapi',
              checkLevel: SelectLevel.None,
            },
          ],
        },
      ],
    },
    {
      routerName: 'strategy',
      title: '策略',
      checkLevel: SelectLevel.None,
      children: [
        {
          routerName: 'strategy-layout-safe',
          title: '安全防护策略',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'strategy-layout-asset',
          title: '资产清点策略',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'strategy-layout-white',
          title: '攻击检测白名单',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'strategy-layout-black',
          title: '全局自动拦截名单',
          checkLevel: SelectLevel.None,
        },
      ],
    },
    {
      routerName: 'reinforce',
      title: '加固',
      checkLevel: SelectLevel.None,
      children: [
        {
          routerName: 'reinforce-layout-baseline',
          title: '基线检查',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'reinforce-layout-file',
          title: '文件保护',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'reinforce-layout-bait',
          title: '诱饵文件',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'reinforce-layout-secpatch',
          title: '安全补丁',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'reinforce-layout-virpatch',
          title: '虚拟补丁',
          checkLevel: SelectLevel.None,
        },
      ],
    },
    {
      routerName: 'report',
      title: '报告',
      checkLevel: SelectLevel.None,
      children: [
        {
          routerName: 'report-layout-reportCreate',
          title: '报表创建',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'report-layout-export',
          title: '报表导出',
          checkLevel: SelectLevel.None,
        },
      ],
    },
    {
      routerName: 'operation',
      title: '维护',
      checkLevel: SelectLevel.None,
      children: [
        {
          routerName: 'operation-layout-upgrade',
          title: '安装与升级',
          checkLevel: SelectLevel.None,
          // children: [
          //   {
          //     routerName: 'operation-layout-upgrade-layout-upgrade-client',
          //     title: '客户端',
          //     checkLevel: SelectLevel.None,
          //   },
          //   {
          //     routerName: 'operation-layout-upgrade-layout-upgrade-engine',
          //     title: '引擎库',
          //     checkLevel: SelectLevel.None,
          //   },
          // ],
        },
        {
          routerName: 'operation-layout-run',
          title: '运行管理',
          checkLevel: SelectLevel.None,
          // children: [
          //   {
          //     routerName: 'operation-layout-run-layout-run-client',
          //     title: '客户端',
          //     checkLevel: SelectLevel.None,
          //   },
          //   {
          //     routerName: 'operation-layout-run-layout-run-engine',
          //     title: '引擎库',
          //     checkLevel: SelectLevel.None,
          //   },
          // ],
        },
        {
          routerName: 'operation-layout-migrate',
          title: '迁移管理',
          checkLevel: SelectLevel.None,
        },
        {
          routerName: 'operation-layout-asset',
          title: '资产',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'operation-layout-asset-manage',
              title: '主机管理',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-asset-host',
              title: '主机组管理',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-asset-business',
              title: '业务组管理',
              checkLevel: SelectLevel.None,
            },
          ],
        },
        {
          routerName: 'operation-layout-user',
          title: '成员',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'operation-layout-user-manage',
              title: '用户管理',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-user-log',
              title: '用户日志',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-user-role',
              title: '角色权限',
              checkLevel: SelectLevel.None,
            },
          ],
        },
        {
          routerName: 'operation-layout-behavior',
          title: '日志',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'operation-layout-behavior-log',
              title: '主机行为日志',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-behavior-config',
              title: '收集配置',
              checkLevel: SelectLevel.None,
            },
          ],
        },
        {
          routerName: 'operation-layout-basics',
          title: '基础',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'operation-layout-basics-notice',
              title: '通知',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-basics-storage',
              title: '存储与备份',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-basics-syslog',
              title: 'Syslog设置',
              checkLevel: SelectLevel.None,
            },
            {
              routerName: 'operation-layout-basics-server',
              title: '统一管理',
              checkLevel: SelectLevel.None,
            },
          ],
        },
        {
          routerName: 'operation-layout-safe',
          title: '安全',
          checkLevel: SelectLevel.None,
          children: [
            {
              routerName: 'operation-layout-safe-basics',
              title: '基础安全',
              checkLevel: SelectLevel.None,
            },
          ],
        },
      ],
    },
    {
      routerName: 'setting',
      title: '产品设置',
      checkLevel: SelectLevel.None,
    },
    {
      routerName: 'avatar',
      title: '用户设置',
      checkLevel: SelectLevel.None,
    },
  ],
};
