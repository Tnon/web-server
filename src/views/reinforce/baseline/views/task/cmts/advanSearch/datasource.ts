/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-07 09:50:54
 * @LastEditTime: 2023-03-06 10:05:21
 */
import { E_Task_State } from '../../type';

export const useStaticOptions = (t) => {
  return {
    task_stateOptions: [
      {
        label: t('reinforce.yzt'),
        value: E_Task_State.Parse,
      },
      {
        label: t('reinforce.zxz'),
        value: E_Task_State.Runing,
      },
      {
        label: t('reinforce.ywc'),
        value: E_Task_State.Complete,
      },
    ],
  };
};
