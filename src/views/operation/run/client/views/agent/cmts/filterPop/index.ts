/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:37
 * @LastEditTime: 2022-07-25 15:11:52
 */
import { ONLINESTATUS } from '@/enums/assetsType';
import { SELFDETESTATUS } from '@/enums/pstatus';
import batchPop from './index.vue';
export const useSelectOptions = (t) => ({
  onlineOptions: [
    {
      key: ONLINESTATUS.ONLINE,
      value: t('common.onLine'),
    },
    {
      key: ONLINESTATUS.OFFLINE,
      value: t('common.offLine'),
    },
  ],
  selfDeteOptions: [
    {
      key: SELFDETESTATUS.NORMAL,
      value: t('operation.deteNor'),
    },
    {
      key: SELFDETESTATUS.ERROR,
      value: t('operation.deteErr'),
    },
    {
      key: SELFDETESTATUS.PAUSE,
      value: t('operation.suspend'),
    },
  ],
  //屏蔽windows
  // osTypeOptions: [
  //   {
  //     key: OSTYPE.LINUX,
  //     value: 'Linux',
  //   },
  //   {
  //     key: OSTYPE.WINDOWS,
  //     value: 'Windows',
  //   },
  // ],
});
export default batchPop;
