/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:18:44
 * @LastEditTime: 2023-02-20 15:19:00
 */
import { E_Risk_Level } from '../../type';
import advanSearch from './index.vue';
export default advanSearch;

export const getRiskLevelOptions = (t) => {
  return [
    {
      label: t('reinforce.yz'),
      value: E_Risk_Level.Danger,
    },
    {
      label: t('arcomn.highAttack'),
      value: E_Risk_Level.High,
    },
    {
      label: t('arcomn.midAttack'),
      value: E_Risk_Level.Mid,
    },
    {
      label: t('arcomn.lowAttack'),
      value: E_Risk_Level.Low,
    },
  ];
};
