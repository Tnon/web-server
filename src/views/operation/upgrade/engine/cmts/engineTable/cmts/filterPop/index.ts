/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:37
 * @LastEditTime: 2022-07-13 20:04:25
 */
import batchPop from './index.vue';

import { ENGINESTATUS } from '@/enums/pstatus';
import { ONLINESTATUS } from '@/enums/assetsType';
export const useUpgradeStatus = (t) => ({
  upgradeStatus: [
    {
      key: ENGINESTATUS.LATEST,
      value: t('operation.lastVer'),
    },
    {
      key: ENGINESTATUS.UPGRADEABLE,
      value: t('operation.adaupd'),
    },
    {
      key: ENGINESTATUS.UPGRADING,
      value: t('operation.updating'),
    },
    {
      key: ENGINESTATUS.PREPARE,
      value: t('operation.prepupgra'),
    },
    {
      key: ENGINESTATUS.FAILED,
      value: t('operation.adaerr'),
    },
  ],

  onlineStatus: [
    {
      key: ONLINESTATUS.ONLINE,
      value: t('common.onLine'),
    },
    {
      key: ONLINESTATUS.OFFLINE,
      value: t('common.offLine'),
    },
  ],
});
export default batchPop;
