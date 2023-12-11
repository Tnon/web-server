/*
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-09-06 09:48:38
 */
/**
 * @description: 资产 title/placeholder/number名称
 */
//在线状态
export enum ONLINESTATUS {
  ALL,
  ONLINE,
  OFFLINE,
  UNINSTALL,
}
//资产状态
export enum ASSETSTATUS {
  ALL,
  SAFE,
  HAVEVULTY, // 存在漏洞
  HAVERISK, //存在风险
}
//自检测状态
export const enum DETESTATUS {
  NORMAL = 1,
  ERROR,
}
//系统类型
export enum OSTYPE {
  ALL,
  WINDOWS,
  LINUX,
}
//安全状态
export enum SECURESTATUS {
  ALL,
  HEALTHY,
  ALARM,
  ACDR,
}

// 是否按照离线时间排序
export enum ORDERBYOFFLINE {
  UNORDER,
  ORDER,
}

// 分组
export enum GROUPS {
  ALL = -1,
}
//适配类型
export enum ADAPTYPE {
  NOTINSTALL = 1,
  NOTADAPED,
}
//驱动还是agent
export enum E_Operation_Type {
  AGENT = 1,
  DRIVER,
}
//上传类型 客户端
export enum UPCLIPKGTYPE {
  //Agent
  AGENT = 1,
  //自研hash引擎
  HASH,
  //预检测基线库
  BASELINE,
  // NGAV引擎/ACDR
  ACDR,
  //RASP规则引擎
  RASP,
  //基线规则引擎
  BASELINERULE,
  //风险检查规则引擎
  RISKCHECK,
}
//上传类型 服务端
export enum UPSERPKGTYPE {
  YARA = 1,
  CLAMAV,
  AVIRA,
  //漏扫
  VULNERABILITY,
  //基线
  BASELINERULE = 6,
  //安全补丁
  SECPATCH,
  //虚拟补丁规则引擎
  VRLPATCH,
  //风险检查规则引擎
  RISKCHECK,
}

// 漏洞类型对应的参数值（接口需要）
export enum vulType {
  overview,
  kernelvul,
  appvul,
  webvul,
}
// 漏洞危险程度
export const vulRiskLevel: String[] = [
  'lowRisk,#F6C84D', // 低危,占位用
  'lowRisk,#F6C84D', // 低危
  'middleRisk,#F8A556', // 中危
  'highRisk,#FB7E52', // 高危
  'serious,#F75555', // 严重
];
// 漏洞检出方式
export enum vulDetectionWay {
  'compareVersion' = 1,
  'pocVerify',
}
// 概览-使用率类型-接口值
export enum usageEnum {
  'CPU' = 1,
  'memory',
  'disk',
}
// 概览-使用率类型及颜色
export const usageTypeColor = ['CPU|88,123,245', 'memory|24,186,121', 'disk|148,93,248'];

// 采集点状态
// export const pointStatus: String[] = [
//   'normal,#18BA79', // 正常
//   'suspend,', // 暂停
//   'abnomal,', // 异常
// ];
export enum pointStatus {
  'normal,#18BA79' = 1, // 正常，绿色
  'suspend,#0000004d', // 暂停，灰色
  'abnomal,#F75555', // 异常,红色
}

export const NetardStatusList: string[] = ['asset.notConnect', 'asset.connected'];

export enum ReportFrequency {
  ThirtyMinute = 1800, // 30分钟
  OneHour = 3600, // 1小时
  TwoHour = 7200, // 2小时
  TwelveHour = 43200,
  TwentyFourHour = 86400,
}
export enum FlowUnit {
  MB = 1,
  GB,
}
export const flowUnitMap: string[] = ['MB', 'MB', 'GB'];
