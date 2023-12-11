<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 13:46:50
 * @LastEditTime: 2023-10-12 11:56:21
-->
<template>
  <div class="detailModal">
    <div class="modalHeader">
      <div class="cardTitle">{{ recourceInfo.modalTitle }}</div>
      <div class="operate">
        <!-- 时间选择 start -->
        <!-- v-model:value="timeRange" -->
        <a-range-picker
          class="timeSelect"
          show-time
          :value="hackValue || timeRange"
          :presets="ranges"
          :format="dateFormat"
          :allowClear="false"
          :disabled-date="disabledDate"
          @change="timeChange"
          @openChange="onOpenChange"
          @calendarChange="onCalendarChange"
        />
        <!-- 时间选择 end -->
        <!-- 切换视图 start -->
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon><WalletOutlined /></template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->
      </div>
    </div>
    <div class="modalContent">
      <leftTable
        :rates="rates"
        :recourceInfo="recourceInfo"
        :recourceType="recourceType"
        :argms="state"
      />
      <rightChart :argms="state" v-if="showChart" />
      <tableView :recourceType="recourceType" :argms="state" v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { WalletOutlined } from '@ant-design/icons-vue';
  import { option } from '../../type';
  import leftTable from '../leftTable';
  import rightChart from '../rightChart';
  import tableView from '../tableView';
  import { usageEnum } from '@/enums/assetsType';

  import dayjs, { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];

  const props = defineProps({
    // 使用率
    rates: {
      type: Object,
      required: true,
    },
    // 相关配置数据
    recourceInfo: {
      type: Object as PropType<option>,
      required: true,
    },
    // 资源类型
    recourceType: {
      type: String,
      required: true,
    },
  });

  const { t } = useI18n();
  const currentRoute = useRoute();
  const { id } = currentRoute.query;
  const showChart = ref(true);
  // 时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  // 接口参数
  const state = reactive({
    time_range: dayjs().subtract(1, 'month').format(dateFormat) + ',' + dayjs().format(dateFormat), // 选择时间段，默认一个月,
    host_id: id,
    type: usageEnum[props.recourceType],
  });

  // 时间组件绑定值
  const timeRange = ref<RangeValue>();
  const dates = ref<RangeValue>();
  const hackValue = ref<RangeValue>();

  const disabledDate = (current: Dayjs) => {
    if (!dates.value || (dates.value as any).length === 0) {
      return false;
    }
    const tooLate =
      dates.value[0] &&
      current.diff(dates.value[0], 'days') >
        dates.value[0].add(6, 'month').diff(dates.value[0], 'days') - 1;
    const tooEarly =
      dates.value[1] &&
      dates.value[1].diff(current, 'days') >
        dates.value[1].diff(dates.value[1].subtract(6, 'month'), 'days') - 1;
    return tooEarly || tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      dates.value = [] as any;
      hackValue.value = [] as any;
    } else {
      hackValue.value = undefined;
    }
  };
  const onCalendarChange = (val: RangeValue) => {
    dates.value = val;
  };
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

  // 时间选择变化，将时间数据转换为后端可接受的数据
  const timeChange = (v) => {
    // console.log('time', v);
    timeRange.value = v;
    if (v && v.length) {
      const [start, end] = v;
      // console.log('v', v);
      // console.log('rangeTime1', timeRange.value);
      const timeFormatted = start.format(dateFormat) + ',' + end.format(dateFormat);
      // console.log('rangeTime2', timeFormatted);
      state.time_range = timeFormatted;
      // emit('update:timeFormatted', timeFormatted);
    }
  };

  // 切换视图
  const switchView = () => {
    showChart.value = !showChart.value;
  };
</script>
<style lang="less" scoped>
  .detailModal {
    padding: 10px 24px 24px;
  }
  .modalHeader {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cardTitle {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }
    // .timeSelect {
    //   margin-right: 24px;
    // }
    .operate {
      display: flex;
      align-items: center;
      .swt_view {
        margin: 0 24px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
</style>
