/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-12-27 10:50:13
 * @LastEditTime: 2022-12-29 18:45:53
 */
import netcardHeader from './index.vue';
import { FlowUnit, flowUnitMap, ReportFrequency } from '@/enums/assetsType';
import { reactive } from 'vue';
export const optionData = (t: any) => {
  // 单位选项
  const unitOptions = [
    {
      label: flowUnitMap[FlowUnit.GB],
      value: FlowUnit.GB,
    },
    {
      label: flowUnitMap[FlowUnit.MB],
      value: FlowUnit.MB,
    },
  ];
  // 上报时间间隔选项
  const intervalOptions = [
    {
      label: t('asset.thirtyMinute'),
      value: ReportFrequency.ThirtyMinute,
    },
    {
      label: t('asset.oneHour'),
      value: ReportFrequency.OneHour,
    },
    {
      label: t('asset.twoHour'),
      value: ReportFrequency.TwoHour,
    },
    {
      label: t('asset.twelveHour'),
      value: ReportFrequency.TwelveHour,
    },
    {
      label: t('asset.twentyFourHour'),
      value: ReportFrequency.TwentyFourHour,
    },
  ];
  const flowLegend = reactive([
    {
      name: t('asset.upFlow'),
      color: '#0091FF',
      isShow: true,
    },
    {
      name: t('asset.downFlow'),
      color: '#F7B500',
      isShow: true,
    },
    {
      name: t('asset.totaFlow'),
      color: '#6236ff33',
      isShow: true,
    },
  ]);
  return { unitOptions, intervalOptions, flowLegend };
};

export default netcardHeader;
