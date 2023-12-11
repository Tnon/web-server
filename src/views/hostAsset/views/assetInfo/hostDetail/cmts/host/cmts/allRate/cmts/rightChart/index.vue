<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 14:22:01
 * @LastEditTime: 2023-07-04 17:07:22
-->
<template>
  <div ref="chartRef" class="charts"></div>
</template>

<script lang="ts" setup>
  import { ref, Ref, watchEffect } from 'vue';
  import { useECharts } from '@/hooks';
  import { getResourceChart } from '@/api/asset/hostInfo/host';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();

  const props = defineProps({
    argms: {
      type: Object,
      required: true,
    },
  });

  //chart 元素
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const getChartsData = async (argms) => {
    const { fields, utilization, threshold } = await getResourceChart(argms);
    const dataTransform = (dataList: string | any[]) => {
      const pageData: string[] | number[] = [];
      for (let i = 0; i < dataList.length; ++i) {
        if (dataList[i] === -1) {
          pageData[i] = '';
        } else {
          pageData[i] = dataList[i];
        }
      }
      return pageData;
    };

    setOptions({
      tooltip: {
        trigger: 'axis',
        padding: 16,
        formatter: ([series]) => {
          return `
              <div>
                  <span>${series.name}</span>
                  <div class="seriesItem">
                    <span>${series.seriesName}</span>
                    <span style='color:${series.color}'>
                      ${series.value === '' ? '-' : `${series.value}%`}
                    </span>
                  </div>
              </div>
            `;
        },
      },
      grid: {
        left: '1%',
        right: '1%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // X轴线
        axisLine: {
          lineStyle: {
            color: '#cccccc',
          },
        },
        // 轴线刻度
        axisTick: {
          inside: true, // 刻度朝内
          show: false,
        },

        // X轴刻度标签
        axisLabel: {
          fontWeight: 400,
          color: 'rgba(0,0,0,0.7)',
        },

        data: fields,
      },
      yAxis: {
        type: 'value',
        max: 100,
        splitNumber: 2, // 分隔线数目
        axisLabel: {
          formatter: '{value}%',
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.8)',
        },
        // 轴线
        axisLine: {
          show: true,
          lineStyle: {
            color: '#cccccc',
          },
        },
        // Y轴刻度分隔线
        splitLine: {
          show: false, // 刻度线不显示
        },
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
          // 默认选择一天的数据（5分钟上报一次，一天是288个点）
          startValue: fields[fields.length - 288 > 0 ? fields.length - 288 : 0],
          end: 100,
        },
        {
          show: true,
          xAxisIndex: 0,
          type: 'slider',
          moveHandleSize: 16,
          height: 24,
        },
      ],
      // 有threshold则展示visualMap
      visualMap: threshold
        ? {
            top: 50,
            right: 10,
            show: false,
            pieces: [
              {
                gte: 0,
                lt: threshold,
                // lt: 60,
                color: '#18BA79',
              },
              {
                gte: threshold,
                // gte: 60,
                lte: 100,
                color: '#F75555',
              },
            ],
            outOfRange: {
              color: '#999',
            },
          }
        : undefined,
      series: [
        // 上行流量
        {
          name: t('asset.usage'),
          type: 'line',
          itemStyle: {
            color: '#18BA79',
          },

          data: dataTransform(utilization),
          animationDuration: 2000,
          // 有threshold则展示阈值线
          markLine: threshold
            ? {
                // yAxis: threshold
                data: [{ xAxis: '20%', yAxis: threshold, name: t('asset.yz') }],
                lineStyle: {
                  color: '#F75555',
                },
                label: {
                  position: 'start',
                  formatter: `${t('asset.threshold')}: ${threshold}%`,
                  // formatter: `预警: ${60}%`,
                  color: '#FFFFFF',
                  backgroundColor: '#888888',
                  padding: [4, 4, 4, 4],
                  distance: -88,
                },
                symbol: ['none', 'none'],
              }
            : undefined,
        },
      ],
    });
  };
  watchEffect(() => {
    getChartsData(props.argms);
  });
</script>

<style lang="less" scoped>
  .charts {
    height: 300px;
  }
</style>
