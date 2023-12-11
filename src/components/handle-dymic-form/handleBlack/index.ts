/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 15:16:23
 * @LastEditTime: 2023-02-21 20:09:22
 */
import handleBlack from './index.vue';
export const getInitRules = (t) => {
  return {
    methods: {
      required: true,
      message: t('arcomn.qxzczfs'),
    },
    group: {
      required: false,
      message: t('strategy.psleyyfzAll'),
    },
    attribute: {
      required: true,
      message: t('strategy.qaxsgs'),
    },
    logic: {
      required: true,
      message: t('strategy.shjgz'),
    },
    rules: {
      required: true,
      message: t('strategy.shjfdes'),
    },
    value: {
      required: true,
      message: t('strategy.attrvnotem'),
    },
  };
};
export default handleBlack;
