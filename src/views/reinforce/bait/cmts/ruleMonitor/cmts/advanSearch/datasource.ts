/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-07 09:50:54
 * @LastEditTime: 2023-07-14 10:25:44
 */

import { E_Monitor_State } from '../../../fileMonitor/type';

export interface DataItem {
  value: E_Monitor_State;
  label: string;
}
type OptionResult = Record<'monitor_stateOptions', DataItem[]>;
export const getStatusData = (t): OptionResult => ({
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
