/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-07 09:50:54
 * @LastEditTime: 2023-02-24 14:42:37
 */
import { E_Enabled, E_Alarm_Level, E_Rule_Type } from '../../type';
import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
export const useStaticOptions = (t) => {
  return {
    enabledOptions: [
      {
        label: t('reinforce.qy'),
        value: E_Enabled.Open,
      },
      {
        label: t('reinforce.ty'),
        value: E_Enabled.Close,
      },
    ],
    alarm_levelOptions: [
      {
        label: t('arcomn.lowAttack'),
        value: E_Alarm_Level.Low,
      },
      {
        label: t('arcomn.midAttack'),
        value: E_Alarm_Level.Middle,
      },
      {
        label: t('arcomn.highAttack'),
        value: E_Alarm_Level.High,
      },
    ],
    rule_typeOptions: [
      {
        label: t('reinforce.rzgz'),
        value: E_Rule_Type.Preset,
      },
      {
        label: t('reinforce.csurule'),
        value: E_Rule_Type.Custom,
      },
    ],
    apply_typeOptions: [
      {
        label: t('reinforce.qbzj'),
        value: E_Host_Range.All,
      },
      {
        label: t('reinforce.zjz'),
        value: E_Host_Range.Group,
      },
      {
        label: t('reinforce.zj'),
        value: E_Host_Range.Host,
      },
    ],
  };
};
