<template>
  <div ref="chartRef" class="charts"></div>
</template>
<script lang="ts" setup>
  import { ref, Ref, PropType, watchEffect } from 'vue';
  import { useECharts } from '@/hooks';
  import { getLineData } from '@/api/overview';
  import { useI18n } from 'vue-i18n';
  import { NOTICETYPE, ROUND } from '@/enums/attack_risk';
  const props = defineProps({
    RType: {
      type: Number as PropType<ROUND>,
      default: ROUND.DAY,
    },
    LType: {
      type: Number as PropType<NOTICETYPE>,
      default: NOTICETYPE.ALARM,
    },
    refreshMethods: Object,
  });
  const { t } = useI18n();
  //chart 元素
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

  const getChartsData = async (LType, RType, clear = true) => {
    const { fields, values } = await getLineData({
      interval: RType,
      type: LType as number,
    });
    setOptions(
      {
        tooltip: {
          trigger: 'axis',
          padding: 16,
          formatter: ([params]) => {
            return `<div class='timeLabel'>
                          <span>${t('arcomn.dateRange')}</span>
                          <span>${t('common.unhandled')}</span>
                      </div>
                      <div class='valueLabel'>
                        <span class='label'">${params.name}</span>
                        <span class='value' style='color:${params.color}'>${params.value}</span>
                      </div>
                      `;
          },
        },
        grid: {
          left: '0%',
          right: '1%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            inside: true, // 刻度朝内
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, 0.4)',
          },
          axisLine: {
            lineStyle: {
              color: '#eee',
            },
          },
          data: fields,
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisTick: {
            inside: true, // 刻度朝内,
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        series: [
          {
            name: LType === NOTICETYPE.ALARM ? t('overview.allAlarm') : t('overview.allEvent'), // allEvent,1025版本暂无
            type: 'line',
            itemStyle: {
              color: LType === NOTICETYPE.ALARM ? '#F05064' : '#F8A454',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color:
                      LType === NOTICETYPE.ALARM
                        ? 'rgba(240, 80, 100, 0.1)'
                        : 'rgba(242, 200, 100, 0.1)',
                  },
                  {
                    offset: 1,
                    color:
                      LType === NOTICETYPE.ALARM
                        ? 'rgba(249, 136, 157, 0)'
                        : 'rgba(242, 170, 100, 0) ',
                  },
                ],
                false,
              ),
              shadowColor: 'rgba(240, 80, 100, 0.08)',
              shadowBlur: 200,
            },
            data: values,
            animationDuration: 2000,
          },
        ],
      },
      clear,
    );
  };

  watchEffect(() => {
    getChartsData(props.LType, props.RType);
  });
  props.refreshMethods!.echartsApi = () => {
    getChartsData(props.LType, props.RType, false);
  };
</script>
<style lang="less" scoped>
  .charts {
    height: 450px;
  }
  .aaa {
    width: 200px;
  }
</style>
