/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:37
 * @LastEditTime: 2023-08-25 15:14:21
 */
import batchPop from './index.vue';

import { UPGRADESTATUS, ADAPTASTATUS } from '@/enums/pstatus';
import { ONLINESTATUS } from '@/enums/assetsType';
export const useUpgradeStatus = (t) => ({
  upgradeStatus: [
    {
      key: UPGRADESTATUS.LATEST,
      value: t('operation.lastVer'),
    },
    {
      key: UPGRADESTATUS.PackageCheckIng,
      value: t('operation.checking'),
    },
    {
      key: UPGRADESTATUS.UPGRADEABLE,
      value: t('operation.Upgradeable'),
    },
    {
      key: UPGRADESTATUS.PREPARE,
      value: t('operation.prepupgra'),
    },
    {
      key: UPGRADESTATUS.UPGRADING,
      value: t('operation.upgrading'),
    },
    {
      key: UPGRADESTATUS.WAITING,
      value: t('operation.dlz'),
    },
    {
      key: UPGRADESTATUS.FAILED,
      value: t('operation.upgraFail'),
    },
  ],
  adapedStatus: [
    {
      key: ADAPTASTATUS.Adapted,
      value: t('operation.adadriv'),
    },
    {
      key: UPGRADESTATUS.PackageCheckIng,
      value: t('operation.checking'),
    },
    {
      key: ADAPTASTATUS.Prepare,
      value: t('operation.driprepa'),
    },
    {
      key: ADAPTASTATUS.Updateable,
      value: t('operation.adaupd'),
    },
    {
      key: ADAPTASTATUS.UnAdapted,
      value: t('operation.unadaupd'),
    },
    {
      key: ADAPTASTATUS.Updating,
      value: t('operation.adaping'),
    },
    {
      key: ADAPTASTATUS.WAITING,
      value: t('operation.dlz'),
    },
    {
      key: ADAPTASTATUS.Error,
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
