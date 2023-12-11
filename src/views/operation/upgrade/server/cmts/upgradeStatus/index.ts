/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 19:36:15
 * @LastEditTime: 2022-12-24 13:39:27
 */
import upgradeStatus from './index.vue';
//升级状态
export const enum SERVERUPGRADESTATUS {
  UPGRADEABLE = 1,
  UPGRADING,
  SUCCESS,
  FAILED,
  PREPARE,
  LASTED,
}
export default upgradeStatus;
