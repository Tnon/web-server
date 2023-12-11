/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:24:37
 * @LastEditTime: 2023-07-26 15:06:43
 */
import { ONLINESTATUS } from '@/enums/assetsType';
import { INJECTSTATUS } from '@/enums/pstatus';
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
  injectOptions: [
    {
      key: INJECTSTATUS.UNINJECT,
      value: t('operation.unnject'),
    },
    {
      key: INJECTSTATUS.INJECTED,
      value: t('operation.injected'),
    },
    {
      key: INJECTSTATUS.INJECTING,
      value: t('operation.injecting'),
    },
    {
      key: INJECTSTATUS.ERROR,
      value: t('operation.injecerr'),
    },
    {
      key: INJECTSTATUS.UNINSTALLED,
      value: t('operation.injunsal'),
    },
    {
      key: INJECTSTATUS.UNINSTALLING,
      value: t('operation.unining'),
    },
    {
      key: INJECTSTATUS.UNINSTALLING,
      value: t('operation.zjj'),
    },
  ],
});
export default batchPop;
