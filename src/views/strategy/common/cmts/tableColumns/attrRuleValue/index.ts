/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 16:04:16
 * @LastEditTime: 2023-01-09 15:45:03
 */
import { E_Rules } from '@/components/handle-dymic-form/helpTips/type';
import attrRuleValue from './index.vue';
export const getRuleName = (t, rule: E_Rules): string => {
  const ruleNameStringArr = [
    '',
    t('arcomn.equl'),
    t('arcomn.cont'),
    t('arcomn.blong'),
    t('arcomn.repm'),
    t('arcomn.hzpp'),
    t('arcomn.regpp'),
  ];
  return ruleNameStringArr[rule];
};
export default attrRuleValue;
