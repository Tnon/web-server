/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-09 15:17:17
 * @LastEditTime: 2023-02-14 18:00:02
 */
import { RouteRecordRaw } from 'vue-router';
import overviewRouters from './overview';
import assetRiskRouters from './assetRisk';
import accountRiskRouters from './accountRisk';
import assetInfoRouters from './assetInfo';
const routes: Array<RouteRecordRaw> = [
  //资产总览
  ...overviewRouters,
  //资产漏洞
  ...assetRiskRouters,
  //账户风险
  ...accountRiskRouters,
  //资产信息
  ...assetInfoRouters,
];
export default routes;
