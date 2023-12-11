/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 15:16:23
 * @LastEditTime: 2023-02-21 20:29:18
 */
import handleThreat from './index.vue';
export const getInitRules = (t, autoHandle) => {
  return {
    methods: {
      required: autoHandle,
      message: t('arcomn.qxzczfs'),
    },
    group: {
      required: false,
      message: t('strategy.psleyyfzAll'),
    },
    attribute: {
      required: autoHandle,
      message: t('strategy.qaxsgs'),
    },
    logic: {
      required: autoHandle,
      message: t('strategy.shjgz'),
    },
    rules: {
      required: autoHandle,
      message: t('strategy.shjfdes'),
    },
    value: {
      required: autoHandle,
      message: t('strategy.attrvnotem'),
    },
  };
};
export default handleThreat;
