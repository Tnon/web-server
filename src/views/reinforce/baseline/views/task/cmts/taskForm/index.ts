/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-24 14:05:12
 * @LastEditTime: 2023-03-17 17:34:56
 */
import { bytesLength } from '@/utils/tools';
import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
import taskForm from './index.vue';
import { E_Round_Type, E_Task_Type } from './type';

export const useStaticOptions = (t) => {
  return {
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

    task_typeOptions: [
      {
        //立即执行
        label: t('reinforce.ljzx'),
        value: E_Task_Type.Now,
      },
      {
        //定时任务
        label: t('reinforce.dsrw'),
        value: E_Task_Type.Regular,
      },
    ],
    round_typeOptions: [
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
      {
        //每月
        label: t('setting.monthly'),
        value: E_Round_Type.Month,
      },
    ],
    week: [
      {
        label: t('setting.Sunday'),
        value: 0,
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
    month: [
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: '5',
        value: 5,
      },
      {
        label: '6',
        value: 6,
      },
      {
        label: '7',
        value: 7,
      },
      {
        label: '8',
        value: 8,
      },
      {
        label: '9',
        value: 9,
      },
      {
        label: '10',
        value: 10,
      },
      {
        label: '11',
        value: 11,
      },
      {
        label: '12',
        value: 12,
      },
      {
        label: '13',
        value: 13,
      },
      {
        label: '14',
        value: 14,
      },
      {
        label: '15',
        value: 15,
      },
      {
        label: '16',
        value: 16,
      },
      {
        label: '17',
        value: 17,
      },
      {
        label: '18',
        value: 18,
      },
      {
        label: '19',
        value: 19,
      },
      {
        label: '20',
        value: 20,
      },
      {
        label: '21',
        value: 21,
      },
      {
        label: '22',
        value: 22,
      },
      {
        label: '23',
        value: 23,
      },
      {
        label: '24',
        value: 24,
      },
      {
        label: '25',
        value: 25,
      },
      {
        label: '26',
        value: 26,
      },
      {
        label: '27',
        value: 27,
      },
      {
        label: '28',
        value: 28,
      },
      {
        label: '29',
        value: 29,
      },
      {
        label: '30',
        value: 30,
      },
      {
        label: '31',
        value: 31,
      },
    ],
    overtimeOptions: [
      {
        label: t('strategy.min', [30]),
        value: 30 * 60,
      },
      {
        label: t('strategy.min', [45]),
        value: 45 * 60,
      },
      {
        label: t('strategy.hour', [1]),
        value: 60 * 60,
      },
      {
        label: t('strategy.hour', [2]),
        value: 120 * 60,
      },
      {
        label: t('strategy.hour', [3]),
        value: 180 * 60,
      },
    ],
  };
};
//文件防篡改规则名20个汉字40个字符
export const ValidateRuleName = (_, value) => {
  if (bytesLength(value) > 40 || !value) {
    return Promise.reject();
  }
  return Promise.resolve();
};
export default taskForm;
