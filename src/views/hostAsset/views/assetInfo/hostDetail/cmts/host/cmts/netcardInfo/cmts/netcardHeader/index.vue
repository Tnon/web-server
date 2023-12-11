<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-27 10:50:06
 * @LastEditTime: 2023-10-12 10:32:28
-->
<template>
  <div class="cardHeader">
    <h3 class="cardTitle">{{ isShowCard ? t('asset.netCardInfo') : t('asset.noneNetCard') }}</h3>
    <div class="filterBox" v-if="isShowCard">
      <!-- 时间选择 start -->
      <a-range-picker
        show-time
        v-model:value="timeRange"
        :presets="ranges"
        :format="dateFormat"
        :allowClear="false"
        @change="timeChange"
      />
      <!-- 时间选择 end -->
      <!-- 上报频率选择 start -->
      <div class="selectCombin">
        <span>{{ t('asset.evry') }}</span>
        <a-select
          class="select"
          v-model:value="intervalLocal"
          style="width: 100px"
          :options="intervalOptions"
          @change="intervalChange"
        />
        <span>{{ t('asset.updateNetcardFlow') }}</span>
      </div>
      <!-- 上报频率选择 end -->
      <!-- 单位选择 start -->
      <a-select
        class="selectUnit"
        v-model:value="unitLocal"
        :options="unitOptions"
        @change="unitChange"
      />
      <!-- 单位选择 end -->
      <!-- chart-legend start -->
      <div
        v-for="(legend, index) in flowLegend"
        :key="legend.name"
        class="legendItem"
        :class="{ grayItem: !legend.isShow }"
        @click="changeLegend(legend.name, index)"
      >
        <div class="legend" :style="{ background: legend.isShow ? legend.color : '#c3c3c3' }"></div>
        <div class="legendLabel">{{ legend.name }}</div>
      </div>
      <!-- chart-legend start -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { optionData } from './index';
  import dayjs, { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];

  const props = defineProps({
    // 上报频率
    interval: {
      type: Number,
      required: true,
    },
    // 选择时间段
    timeFormatted: {
      type: String,
      required: true,
    },
    // 单位
    unit: {
      type: Number,
      required: true,
    },
    // 是否有网卡
    isShowCard: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits([
    'update:timeFormatted',
    'update:interval',
    'update:unit',
    'update:legendSelected',
    'changeLegend',
  ]);
  const { t } = useI18n();
  const { unitOptions, intervalOptions, flowLegend } = optionData(t);

  // 时间间隔绑定值
  const intervalLocal = ref(props.interval);
  // 单位绑定值
  const unitLocal = ref(props.unit);
  // 时间组件绑定值
  const timeRange = ref<RangeValue>();
  // 时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  // 固定时间范围
  const ranges = ref([
    {
      label: t('report.latestDay'),
      value: [dayjs().subtract(1, 'day'), dayjs()],
    },
    {
      label: t('report.latestWeek'),
      value: [dayjs().subtract(7, 'day'), dayjs()],
    },
    {
      label: t('report.latestMonth'),
      value: [dayjs().subtract(1, 'month'), dayjs()],
    },
  ]);
  const initLegend = () => {
    for (let k in flowLegend) {
      flowLegend[k].isShow = true;
    }
  };
  // 时间选择变化，将时间数据转换为后端可接受的数据
  const timeChange = (v) => {
    // console.log('time', v);
    if (v && v.length) {
      const [start, end] = v;
      const timeFormatted = start.format(dateFormat) + ',' + end.format(dateFormat);
      emit('update:timeFormatted', timeFormatted);
      // console.log('rangeTime2', timeFormatted);
      initLegend();
    }
  };
  // 时间间隔改变
  const intervalChange = (value) => {
    emit('update:interval', value);
    initLegend();
  };
  // 单位切换
  const unitChange = (value) => {
    emit('update:unit', value);
    initLegend();
  };
  const changeLegend = (name, index) => {
    flowLegend[index].isShow = !flowLegend[index].isShow;
    emit('changeLegend', name);
  };
</script>

<style lang="less" scoped>
  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      padding: 0;
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 24px;
    }
    .filterBox {
      display: flex;
      // justify-content: center;
      align-items: center;

      .selectCombin {
        margin: 0 24px;
        .select {
          margin: 0 8px;
        }
      }

      .selectUnit {
        margin-right: 16px;
      }
      .legendItem {
        margin-right: 16px;
        color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .legend {
          width: 12px;
          height: 4px;
          margin-right: 8px;
        }
        .legendLabel {
          font-size: 13px;
          font-weight: 400;
        }
      }
      .grayItem {
        color: #c3c3c3;
      }
    }
  }
</style>
