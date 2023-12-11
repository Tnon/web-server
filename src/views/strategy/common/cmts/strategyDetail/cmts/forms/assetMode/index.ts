/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:11
 * @LastEditTime: 2023-11-02 11:43:53
 */
import { E_Round_Type } from '@/views/reinforce/baseline/views/task/cmts/taskForm/type';
import assetMode from './index.vue';
export const getPeriod = (t: any) => {
  return {
    period: [
      {
        //每日
        label: t('setting.eveDay'),
        value: E_Round_Type.Day,
      },
      {
        //每周
        label: t('setting.weekly'),
        value: E_Round_Type.Week,
      },
    ],
    day: [
      {
        label: t('setting.Sunday'),
        value: 7,
      },
      {
        label: t('setting.Monday'),
        value: 1,
      },
      {
        label: t('setting.Tuesday'),
        value: 2,
      },
      {
        label: t('setting.Wednesday'),
        value: 3,
      },
      {
        label: t('setting.Thursday'),
        value: 4,
      },
      {
        label: t('setting.Friday'),
        value: 5,
      },
      {
        label: t('setting.Saturday'),
        value: 6,
      },
    ],
  };
};
export default assetMode;
