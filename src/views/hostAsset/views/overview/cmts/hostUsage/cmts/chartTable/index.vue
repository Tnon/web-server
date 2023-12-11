<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-13 11:31:27
 * @LastEditTime: 2023-02-06 10:26:33
-->
<template>
  <div class="container">
    <div class="header">
      {{ t('asset.host') }}{{ t(`asset.${usageType}Usage`) }}{{ t(`asset.distribution`) }}
    </div>
    <div class="content">
      <div class="usageChart">
        <div ref="chartRef" class="chart"></div>
        <chart-legend class="legend" :legendData="chartData" @changeLegend="changeLegend" />
      </div>
      <div class="usageTable">
        <div class="subtitle">{{ t(`asset.${usageType}Usage`) }}TOP5</div>
        <a-table rowKey="id" :columns="columns" :dataSource="dataSource" :pagination="false" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Ref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useECharts } from '@/hooks';
  import chartLegend from '@/views/hostAsset/components/chartLegend';
  import { useColumns, getInitData } from './index';
  import { usageEnum } from '@/enums/assetsType';
  import { getUsagePie } from '@/api/asset/overview';
  import { ChartNode } from '@/views/hostAsset/views/overview/type';

  const props = defineProps({
    usageType: {
      type: String,
      required: true,
    },
    usageColor: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const dataSource = ref([]);
  const chartData = ref<ChartNode[]>([]);
  // chartData.value = getInitData(t, props.usageType);
  // 现在的饼图需求是CPU、内存、磁盘利用率都被分为5段，所以可以统一取值
  // 如后期分段不一致，需根据usageType独立取值和分配颜色
  chartData.value = getInitData(t); // 获取饼图数据配置

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const columns = useColumns(t);
  // 接口取值并绘图
  const drawChart = async () => {
    // 获取数据并处理
    const { items, ...usageCount } = await getUsagePie({ type: usageEnum[props.usageType] });
    dataSource.value = items; // 表格数据
    chartData.value.forEach((item, index) => {
      item.value = usageCount[item.id] || 0; // 赋值
      // 分配颜色
      if (index === 4) {
        item.itemStyle.color = '#F6F6F6';
      } else {
        item.itemStyle.color = `rgba(${props.usageColor}, ${1 - 0.3 * index})`;
      }
    });
    setOptions(
      {
        tooltip: {
          confine: true,
          trigger: 'item',
        },
        // 如果使用legend相关的API，需要将legend显式的设置为false
        legend: {
          show: false,
        },
        series: [
          {
            type: 'pie',
            clockwise: true, // 顺时针排布
            // center: ['20%', '50%'],
            radius: ['40%', '70%'], // 环形
            // avoidLabelOverlap: false,
            label: {
              show: false,
            },
            data: chartData.value,
          },
        ],
      },
      true,
    );
  };
  drawChart();
  // 饼图点击响应
  const changeLegend = (name) => {
    const instance = getInstance();
    instance!.dispatchAction({
      type: 'legendToggleSelect',
      name,
    });
  };
</script>
<style lang="less" scoped>
  .header {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    background: #ffffff;
    // margin: 12px 0 0 16px;
    padding-top: 12px;
    padding-left: 16px;
    border-radius: 8px 8px 0 0;
  }

  .content {
    .usageChart {
      height: 200px;
      display: flex;
      justify-content: center;
      background: #ffffff;
      align-items: flex-start;
      border-radius: 0 0 8px 8px;
      .chart {
        height: 100%;
        flex: 1;
      }
      .legend {
        flex: 1;
      }
    }
    .usageTable {
      background: #ffffff;
      margin-top: 16px;
      border-radius: 0 0 8px 8px;
    }

    .subtitle {
      border-radius: 8px 8px 0 0;
      font-size: @fz14;
      // font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      // margin: 8px 0 8px 16px;
      padding: 8px 0 8px 16px;
    }
  }
</style>
