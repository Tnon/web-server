/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:18:44
 * @LastEditTime: 2023-02-27 20:39:22
 */
import { E_Check_Result } from '../checkResult/type';
import advanSearch from './index.vue';
export const getCheckResult = (t) => {
  return [
    {
      label: t('reinforce.pass'),
      value: E_Check_Result.Pass,
    },
    {
      label: t('reinforce.npass'),
      value: E_Check_Result.NoPass,
    },
    {
      label: t('reinforce.passsb'),
      value: E_Check_Result.Error,
    },
  ];
};
export default advanSearch;
