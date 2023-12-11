/*
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2022-07-06 10:24:37
 * @LastEditTime: 2022-12-27 20:39:23
 */
import { ONLINESTATUS } from '@/enums/assetsType';
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
});
export default batchPop;
