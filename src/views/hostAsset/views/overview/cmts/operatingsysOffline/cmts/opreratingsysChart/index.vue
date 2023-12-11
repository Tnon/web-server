<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-09 13:49:57
 * @LastEditTime: 2023-02-15 13:44:59
-->
<template>
  <div class="OSchart">
    <!-- 操作系统分布 start -->
    <div class="header">{{ t('asset.osDistribution') }} </div>
    <!-- 操作系统分布 end -->
    <div class="chartContent">
      <div ref="chartRef" class="charts"></div>
      <!-- legend start -->
      <chart-legend
        class="legend"
        :legendData="filter(echartsData, (ele) => ele.value || ele.id === 'Others')"
        @changeLegend="changeLegend"
      />
      <!-- legend end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Ref, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useECharts } from '@/hooks';
  import chartLegend from '@/views/hostAsset/components/chartLegend';
  import { getOperSysPie } from '@/api/asset/overview';
  import { chartInitData } from '.';
  import { ChartNode } from '@/views/hostAsset/views/overview/type';
  import { filter } from '@/utils/tools';
  const props = defineProps({
    refreshMethods: {
      type: Object,
      required: false,
    },
  });
  const { t } = useI18n();
  //饼图容器
  const chartRef = ref<HTMLDivElement | null>(null);
  //饼图方法
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  //echarts数据
  const echartsData = ref<ChartNode[]>(chartInitData(t));
  // 右侧选中状态变化
  const changeLegend = (name) => {
    const instance = getInstance();
    instance!.dispatchAction({
      type: 'legendToggleSelect',
      name,
    });
  };
  // 获取接口数据、绘图
  const darwChart = async (clear = true) => {
    const res = await getOperSysPie();
    unref(echartsData).forEach((item) => {
      //初始化数据
      item.value = 0;
      item.value = res[item.id];
    });
    setOptions(
      {
        tooltip: {
          confine: true, // 控制toolTip内容不超过父元素
          trigger: 'item',
        },
        // 如果使用legend相关的API，需要将legend显式的设置为false
        legend: {
          show: false,
        },
        series: [
          {
            type: 'pie',
            clockwise: true,
            radius: ['40%', '70%'],
            label: {
              show: false,
            },
            data: echartsData.value,
          },
        ],
      },
      clear,
    );
  };
  darwChart();
  if (props.refreshMethods) {
    props.refreshMethods!.osDistriChartApi = () => {
      darwChart(false);
    };
  }
</script>
<style lang="less" scoped>
  .header {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin: 12px 0 0 16px;
  }
  .chartContent {
    // 22字体高度； 12上边距
    height: calc(100% - 22px - 12px);
    display: flex;
    justify-content: center;
    align-items: center;
    .charts {
      height: 100%;
      flex: 1;
    }
    .legend {
      flex: 1;
    }
  }
</style>
