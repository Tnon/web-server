/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-08-25 15:12:46
 */
/**
 * @description: 防护状态
 */

export const Pstatus: string[] = [
  'UNHANDLEStatus',
  'WHITEStatus',
  'BLACKStatus',
  'LANJIEStatus',
  'CLEARStatus',
  'SBAOStatus',
  'GDANGStatus',
];
/**
 * @description: 攻击等级
 */
export const Alevel: string[] = [
  'lowAttack,#F0DA5A',
  'lowAttack,#F0DA5A',
  'midAttack,#F8A454',
  'highAttack,#F05064',
];
/**
 * @description: 风险等级
 */
export const Rlevel: string[] = [
  'lowRisk,#F0DA5A',
  'lowRisk,#F0DA5A',
  'midRisk,#F8A454',
  'highRisk,#F05064',
];

/**
 * @description: 报告生成状态
 */
export const Slevel: string[] = [
  'reportCreating,#F0DA5A',
  'reportCreated,#18ba79',
  'reportAbnormal,#F05064',
];

// 颜色集合
export enum COLORS {
  SUCCESS = '#18BA79',
  ERROR = '#F05064',
  NORMAL = '#000',
  WARNING = '#F8A454',
}
//升级状态
export enum UPGRADESTATUS {
  LATEST = 1,
  UPGRADEABLE,
  PREPARE,
  UPGRADING,
  FAILED,
  PackageCheckIng = 12,
  WAITING,
}
//适配状态
export enum ADAPTASTATUS {
  Adapted = 1,
  Updateable,
  Prepare,
  Updating,
  Error,
  UnAdapted = 10,
  PackageCheckIng = 12,
  WAITING,
}
//引擎版本
export enum ENGINESTATUS {
  LATEST = 1,
  UPGRADEABLE,
  PREPARE,
  UPGRADING,
  FAILED,
}
//备份状态
export enum BAKSTATUS {
  BAKING = 1,
  BAKSUCCESS,
  BAKFAIL,
  IMPORTING,
  IMPSUCCESS,
  IMPFAIL,
}

//迁移状态
export enum MIGSTATUS {
  NOTMIG,
  SUCCESS = 10,
  MANUAL = 6,
}

//策略应用状态
export enum PLIAPPSTATUS {
  ERROR,
  SUCCESS,
}

//策略黑白名单
export enum POLICYBLACKWHITE {
  WHITE,
  BLACK,
}
//注入状态
export const enum INJECTSTATUS {
  UNINJECT = 1, //已注入
  INJECTED, //注入成功
  INJECTING, //注入中
  ERROR, //注入异常
  UNINSTALLED, //已卸载
  SELFDOWN, //自降级
  UNINSTALLING = 10, //卸载中
}
//自检测状态
export const enum SELFDETESTATUS {
  UNKNOWN,
  NORMAL,
  ERROR,
  PAUSE,
}
//驱动运行状态
export const enum DRIVERRUNING {
  UNKNOWN,
  RUNING,
  STOP,
}

//驱动运行状态
export const enum DRIVERSTATUS {
  ERROR = 1,
  RUNING,
  STOP,
}
export const enum ABN_Reason {
  LANPING = '1',
  OTHER = '2',
}
