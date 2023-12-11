/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-22 17:54:11
 * @LastEditTime: 2023-06-26 17:41:05
 */
/**
 * @description: 引擎类别
 */
export enum ServerEngine {
  YARA = '1',
  CLAMAVWS = '2',
  WEBSHELL = '3',
  CLAMAVVIR = '4',
  AVIRA = '5',
  VULNERABILITY = '100',
  BASELINERULE = '101',
  SECPATCH = '102',
  VRLPATCH = '103',
  RISKCHECK = '104',
}
export enum ClientEngine {
  HASH = '1',
  BASELINE = '3',
  ACDR = '4',
  RASP = '5',
  BASELINERULE = '6',
  RISKCHECK = '7',
}
// //上传类型 客户端
// export enum UPCLIPKGTYPE {
//   //Agent
//   AGENT = 1,
//   //自研hash引擎
//   HASH,
//   //预检测基线库
//   BASELINE,
//   // NGAV引擎/ACDR
//   ACDR,
//   //RASP规则引擎
//   RASP,
//   //基线规则引擎
//   BASELINERULE,
//   //风险检查规则引擎
//   RISKCHECK,
// }
// //上传类型 服务端
// export enum UPSERPKGTYPE {
//   YARA = 1,
//   CLAMAV,
//   AVIRA,
//   //漏扫
//   VULNERABILITY,
//   //基线
//   BASELINERULE = 6,
//   //安全补丁
//   SECPATCH,
//   //虚拟补丁规则引擎
//   VRLPATCH,
//   //风险检查规则引擎
//   RISKCHECK,
// }
