/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 21:09:07
 * @LastEditTime: 2023-03-28 17:47:20
 */
import flowLegend from './index.vue';
export const useLengendData = (
  t,
): {
  [k: string]: { name: string; font_class?: string; color?: string; opacity?: number }[];
} => ({
  //节点主体
  node: [
    {
      name: t('ngav.host'), //'主机',
      font_class: 'host',
    },
    {
      name: t('ngav.process'), //'进程',
      font_class: 'process',
    },
    {
      name: t('ngav.net'), //'网络',
      font_class: 'icon_gongji-IP',
    },
  ],
  //连接线
  // line: [
  //   {
  //     name: t('ngav.prcstr'), //'进程启动',
  //     color: 'rgba(0,0,0,.5)',
  //   },
  //   {
  //     name: t('ngav.gfaasr'), //'进程注入',
  //     color: '#D066EA',
  //   },
  //   {
  //     name: t('ngav.fdsg'), // '网络连接',
  //     color: '#587BF5',
  //   },
  // ],
  //攻击阶段
  // attack: [
  //   {
  //     name: t('ngav.vdsf'), //'权限获取',
  //     font_class: 'limitsauthority',
  //   },
  //   {
  //     name: t('ngav.vfgha'), //'权限维持',
  //     font_class: 'n-maintenanceauthority',
  //   },
  //   {
  //     name: t('ngav.ndfbg'), //'内网探测',
  //     font_class: 'n-intranetdetection',
  //   },
  //   {
  //     name: t('ngav.vfhda'), //'控制执行',
  //     font_class: 'n-executivecontrol',
  //   },
  //   {
  //     name: t('ngav.dsff'), //'数据窃取',
  //     font_class: 'n-datainterception',
  //   },
  // ],
  //攻击行为
  behavior: [
    {
      name: t('ngav.pzfw'), // '凭证访问',
      font_class: 'n-credentialAccess',
    },
    {
      name: t('ngav.qxts'), //'权限提升',
      font_class: 'n-permissionpromotion',
    },
    {
      name: t('ngav.cjh'), //'持久化',
      font_class: 'n-persistence',
    },
    {
      name: t('ngav.jckf'), //'检测绕过',
      font_class: 'n-detectionbypass',
    },
    {
      name: t('ngav.fdgs'), //'内网探测',
      font_class: 'n-intranetdetection',
    },
    {
      name: t('ngav.sfbg'), //'命令控制',
      font_class: 'n-commandcontrol',
    },
    {
      name: t('ngav.gjzz'), //'攻击执行',
      font_class: 'n-attackimplement',
    },
    {
      name: t('ngav.erty'), //'窃取破坏',
      font_class: 'n-stealdestroy',
    },
    {
      name: t('ngav.wgnj'), //'文件操作',
      font_class: 'n-fileimplement',
    },
    {
      name: t('ngav.hfsg'), //'网络操作',
      font_class: 'n-networkoperation',
    },
    {
      name: t('ngav.fvbz'), //'进程操作',
      font_class: 'n-processoperation',
    },
    {
      name: t('ngav.ncccz'), //'内存操作',
      font_class: 'n-memoryoperation',
    },
  ],
  //威胁等级
  level: [
    {
      name: t('ngav.high'), //'高',
      font_class: 'n-nodeprocess',
      color: '#F75555',
    },
    {
      name: t('ngav.mid'), //'中',
      font_class: 'n-nodeprocess',
      color: '#F8A556',
    },
    {
      name: t('ngav.low'), //'低',
      font_class: 'n-nodeprocess',
      color: '#F6C84D',
    },
    {
      name: t('ngav.none'), // '无危险行为',
      font_class: 'n-nodeprocess',
      color: '#888888',
    },
    {
      name: t('ngav.safe'), //'安全',
      font_class: 'n-nodeprocess',
      color: '#18BA79',
    },
  ],
  //拦截状态
  inject: [
    {
      name: t('ngav.wlj'), //'未拦截',
      font_class: 'n-nodeprocess',
      color: '#000',
    },
    {
      name: t('ngav.ylj'), //'已拦截',
      font_class: 'n-nodeprotect',
      color: '#000',
    },
  ],
  //运行状态
  runstatus: [
    {
      name: t('ngav.runing'), //'运行中',
      font_class: 'n-nodeprocess',
      opacity: 1,
    },
    {
      name: t('ngav.stopi'), //'已停止',
      font_class: 'n-nodeprocess',
      opacity: 0.1,
    },
  ],
  //信息获取状态
  nodeduqu: [
    {
      name: t('ngav.geting'), //'获取中',
      font_class: 'n-nodeloading',
      color: '#000',
    },
    {
      name: t('ngav.hqsb'), //'获取失败',
      font_class: 'n-nodeabnormal',
      color: '#000',
    },
  ],
});
export default flowLegend;
