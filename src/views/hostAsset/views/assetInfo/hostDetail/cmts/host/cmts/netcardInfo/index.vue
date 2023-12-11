<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-17 21:03:31
 * @LastEditTime: 2023-10-12 10:25:03
-->
<template>
  <div class="cardContainer">
    <!-- 网卡信息头部标题及筛选 start -->
    <netcard-header
      v-model:interval="cardAgums.interval"
      v-model:timeFormatted="cardAgums.timeFormatted"
      v-model:unit="cardAgums.unit"
      :isShowCard="!!netcardList?.length"
      @changeLegend="changeLegend"
    />
    <!-- 网卡信息头部标题及筛选 end -->

    <div class="cardContent" v-if="netcardList && netcardList.length">
      <!-- 网卡列表 start -->
      <left-card :netcardList="netcardList" v-model:selectedCardMac="cardAgums.selectedCardMac" />
      <!-- 网卡列表 end -->
      <!-- 右侧折线图 start -->
      <line-charts :cardAgums="cardAgums" ref="lineChartRef" />
      <!-- 右侧折线图 end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, reactive, ref, watchEffect } from 'vue';
  import netcardHeader from './cmts/netcardHeader';
  import leftCard from './cmts/leftCard';
  import lineCharts from './cmts/lineCharts';
  import { FlowUnit, ReportFrequency } from '@/enums/assetsType';
  import dayjs from 'dayjs';
  const props = defineProps({
    netcardList: {
      type: Array as PropType<{ [k: string]: string | string[] }[]>,
      rquired: true,
    },
  });
  // 时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  // 参数
  const cardAgums = reactive({
    selectedCardMac: '', // 网卡mac
    interval: ReportFrequency.OneHour, // 上报频率,默认一小时
    timeFormatted:
      dayjs().subtract(6, 'month').format(dateFormat) + ',' + dayjs().format(dateFormat), // 选择时间段，默认当前时间到六个月前
    unit: FlowUnit.GB, // 单位
  });
  // 图表dom
  const lineChartRef = ref<any>(null);

  const changeLegend = (name) => {
    lineChartRef.value.changeLegend(name);
  };
  watchEffect(() => {
    if (props.netcardList && props.netcardList.length) {
      // 默认展示第一个
      cardAgums.selectedCardMac = props.netcardList[0].eth_mac as string;
    }
  });
</script>
<style lang="less" scoped>
  .cardContainer {
    // height: 560px;
    padding: 24px;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 16px;

    .cardContent {
      display: flex;
    }
  }
</style>
