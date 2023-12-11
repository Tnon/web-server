<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-21 17:52:26
 * @LastEditTime: 2023-10-12 10:32:19
-->
<template>
  <div ref="chartRef" class="charts"></div>
</template>
<script lang="ts" setup>
  import { ref, Ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { useECharts } from '@/hooks';
  import { flowUnitMap } from '@/enums/assetsType';
  import { getNetcardFlow } from '@/api/asset/hostInfo/host';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps({
    cardAgums: {
      type: Object,
      required: true,
    },
  });
  const currentRoute = useRoute();
  const { id } = currentRoute.query;
  //chart 元素
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);

  // 右侧选中状态变化
  const changeLegend = (name) => {
    const instance = getInstance();
    instance!.dispatchAction({
      type: 'legendToggleSelect',
      name,
    });
  };
  const getChartsData = async (cardAgums) => {
    const { fields, up_flow, down_flow, total_flow } = await getNetcardFlow({
      time_range: cardAgums.timeFormatted,
      interval: cardAgums.interval,
      measure: cardAgums.unit,
      eth_mac: cardAgums.selectedCardMac,
      host_id: id,
    });
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
        // formatter: ([series1, series2, series3]) => {
        //   return `
        //     <div>
        //         <span>${series1.name}</span>
        //         <div class="seriesItem">
        //           <span>${series1.seriesName}</span>
        //           <span style='color:${series1.color}'>
        //             ${
        //               series1.value === ''
        //                 ? '-'
        //                 : series1.value + flowUnitMap[props.cardAgums.unit]
        //             }
        //           </span>
        //         </div>
        //         <div class="seriesItem">
        //           <span>${series2.seriesName}</span>
        //           <span style='color:${series2.color}'>
        //             ${
        //               series2.value === ''
        //                 ? '-'
        //                 : series2.value + flowUnitMap[props.cardAgums.unit]
        //             }
        //           </span>
        //         </div>
        //         <div class="seriesItem">
        //           <span>${series3.seriesName}</span>
        //           <span style='color:${series3.color}'>
        //             ${
        //               series3.value === ''
        //                 ? '-'
        //                 : series3.value + flowUnitMap[props.cardAgums.unit]
        //             }
        //           </span>
        //         </div>
        //     </div>
        //   `;
        // },
      },
      grid: {
        // height: 480,
        // top: 60,
        left: '10%',
        right: '5%',
        // bottom: '20%',
        // bottom: 60,
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
          // rotate: 50,
          width: 120,
          // overflow: 'break',
        },
        axisLine: {
          lineStyle: {
            color: '#eee',
          },
          // onZero: false,
        },
        data: fields,
        min: 'dataMin',
        max: 'dataMax',
      },
      yAxis: {
        // name: 'Flow(m³/s)',
        type: 'value',
        // minInterval: 1,
        // axisTick: {
        //   inside: true, // 刻度朝内,
        //   show: false,
        // },
        splitLine: {
          show: false, // 刻度线不显示
          // lineStyle: {
          //   type: 'dashed',
          // },
        },
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1, 2],
          startValue: fields[fields.length - 24 > 0 ? fields.length - 24 : 0],
          // start: 10,
          // end: 100,
        },
        {
          show: true,
          xAxisIndex: [0, 1, 2],
          type: 'slider',
          moveHandleSize: 16,
          height: 24,
          showDetail: false,
          // bottom: 10,
          // start: 10,
          // end: 100,
        },
      ],

      legend: {
        show: false,
      },
      series: [
        // 上行流量
        {
          name: t('asset.upFlow'),
          type: 'line',
          itemStyle: {
            color: '#0091FF',
          },
          data: dataTransform(up_flow),
          animationDuration: 2000,
          markLine: {
            data: [
              [
                {
                  symbol: 'none',
                  x: '10%',
                  yAxis: 'min',
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: `{c}${flowUnitMap[props.cardAgums.unit]}`,
                  },
                  type: 'min',
                  name: '最低点',
                },
              ],
              [
                {
                  symbol: 'none',
                  x: '10%',
                  yAxis: 'max',
                  label: {
                    position: 'start',
                    formatter: `{c}${flowUnitMap[props.cardAgums.unit]}`,
                  },
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max',
                  },
                  type: 'max',
                  name: '最高点',
                },
              ],
            ],
          },
        },
        // 下行流量
        {
          name: t('asset.downFlow'),
          type: 'line',
          itemStyle: {
            color: '#F7B500',
          },
          data: dataTransform(down_flow),
          animationDuration: 2000,
          markLine: {
            data: [
              [
                {
                  symbol: 'none',
                  x: '10%',
                  yAxis: 'min',
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: `{c}${flowUnitMap[props.cardAgums.unit]}`,
                  },
                  type: 'min',
                  name: '最低点',
                },
              ],
              [
                {
                  symbol: 'none',
                  x: '10%',
                  yAxis: 'max',
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: `{c}${flowUnitMap[props.cardAgums.unit]}`,
                  },
                  type: 'max',
                  name: '最高点',
                },
              ],
            ],
          },
        },
        // 总流量
        {
          name: t('asset.totaFlow'),
          type: 'line',
          itemStyle: {
            color: '#6236ff33',
          },
          data: dataTransform(total_flow),
          animationDuration: 2000,
          markLine: {
            // lineStyle: {
            //   color: 'rgba(234, 53, 53, 1)',
            // },
            data: [
              // { type: 'average', name: 'Avg' },
              [
                {
                  symbol: 'none',
                  x: '10%',
                  yAxis: 'min',
                  // label: {
                  //   position: 'start',
                  //   // formatter: 'Min',
                  //   formatter: `{value}${props.cardAgums.measure}`,
                  // },
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: `{c}${flowUnitMap[props.cardAgums.unit]}`,
                  },
                  type: 'min',
                  name: '最低点',
                },
              ],
              [
                {
                  symbol: 'none',
                  x: '10%',
                  yAxis: 'max',
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: `{c}${flowUnitMap[props.cardAgums.unit]}`,
                  },
                  type: 'max',
                  name: '最高点',
                },
              ],
            ],
          },
        },
      ],
    });
  };

  watchEffect(async () => {
    if (props.cardAgums.selectedCardMac) {
      await getChartsData(props.cardAgums);
    }
  });
  defineExpose({ changeLegend });
</script>
<style lang="less" scoped>
  .charts {
    // 560px - 48px -48px = 464px
    height: 552px;
    flex: 1;
  }
</style>
