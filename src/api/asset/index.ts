/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-15 10:44:11
 * @LastEditTime: 2022-08-15 10:45:45
 */
import accountRisk from './accountRisk';
import assetRisk from './assetRisk';
import hostInfo from './hostInfo';
export default {
  ...accountRisk,
  ...assetRisk,
  ...hostInfo,
};
