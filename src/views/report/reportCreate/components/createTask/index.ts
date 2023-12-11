/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-21 10:17:14
 * @LastEditTime: 2023-01-17 20:10:43
 */
import createTaskForm from './index.vue';

import { REPORTKIND } from '@/enums/reportType';

export const getRadioOptions = (t: any) => ({
  reportTypeOptions: [
    {
      value: REPORTKIND.DAILY,
      label: t('report.daily'), // 日报
    },
    {
      value: REPORTKIND.WEEKLY,
      label: t('report.weekly'), // 周报
    },
    {
      value: REPORTKIND.MONTHLY,
      label: t('report.monthly'), // 月报
    },
    {
      value: REPORTKIND.YEARLY,
      label: t('report.yearly'), // 年报
    },
    {
      value: REPORTKIND.FIXD,
      label: t('report.fixedTime'), // 固定时段
    },
  ],
});

export default createTaskForm;
