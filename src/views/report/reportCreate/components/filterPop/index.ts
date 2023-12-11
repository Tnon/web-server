/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-19 14:32:38
 * @LastEditTime: 2022-10-21 23:08:45
 */
import filterPop from './index.vue';
import { REPORTKIND, TaskStatus } from '@/enums/reportType';
export const useSelectOptions = (t: any) => ({
  typeOptions: [
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
  // 执行状态
  statusOptions: [
    {
      value: TaskStatus.executing,
      label: t('report.executing'), // 执行中
    },
    {
      value: TaskStatus.notStart,
      label: t('report.notStart'), // 未开始
    },
    {
      value: TaskStatus.generating,
      label: t('report.generating'), // 生成中
    },
    {
      value: TaskStatus.suspending,
      label: t('report.suspending'), // 暂停中
    },
    {
      value: TaskStatus.finished,
      label: t('report.finished'), // 已完成
    },
  ],
});
export default filterPop;
