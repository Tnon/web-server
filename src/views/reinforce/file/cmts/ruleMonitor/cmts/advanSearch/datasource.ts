/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-07 09:50:54
 * @LastEditTime: 2023-03-21 15:56:07
 */

import { E_Monitor_State } from '../../../fileMonitor/type';
import { E_Monitor_Mode } from '../../type';

export interface DataItem {
  value: E_Monitor_Mode | E_Monitor_State;
  label: string;
}
type OptionResult = Record<'monitor_stateOptions' | 'monitor_modeOptions', DataItem[]>;
export const getStatusData = (t): OptionResult => ({
  monitor_modeOptions: [
    {
      label: t('reinforce.jsb'),
      value: E_Monitor_Mode.Report,
    },
    {
      label: t('reinforce.bflj'),
      value: E_Monitor_Mode.PartInject,
    },
    {
      label: t('reinforce.qblj'),
      value: E_Monitor_Mode.Inject,
    },
  ],
  monitor_stateOptions: [
    {
      label: t('operation.deteNor'),
      value: E_Monitor_State.Normal,
    },
    {
      label: t('operation.deteErr'),
      value: E_Monitor_State.Error,
    },
    {
      label: t('reinforce.deteStop'),
      value: E_Monitor_State.Stop,
    },
  ],
});
