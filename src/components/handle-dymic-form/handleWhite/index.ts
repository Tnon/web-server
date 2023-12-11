/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 15:16:23
 * @LastEditTime: 2023-02-21 20:38:04
 */
import handleWhite from './index.vue';
export const isHavMulRule = (attribute) => {
  const multipleArr: any = [];
  return multipleArr.includes(attribute);
};
export const getInitRules = (t) => {
  return {
    attribute: {
      required: true,
      message: t('strategy.qaxsgs'),
    },
    //关系或与非
    logic: {
      required: true,
      message: t('strategy.shjgz'),
    },
    //规则大于小于
    rules: {
      required: true,
      message: t('strategy.shjfdes'),
    },
    //规则值
    value: {
      required: true,
      message: t('strategy.attrvnotem'),
    },
  };
};
export default handleWhite;
