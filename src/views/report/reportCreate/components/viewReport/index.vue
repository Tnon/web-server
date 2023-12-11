<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-14 14:27:57
 * @LastEditTime: 2023-08-24 16:50:16
-->
<template>
  <div>
    <div class="header">
      <div class="title">{{ t('report.reportList') }}</div>
      <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
        <template #content>
          <div class="filterContent">
            <!-- 生成时间 start -->
            <div class="formitems">
              <span class="filterLabel">{{ t('report.generateTime') }}</span>
              <a-range-picker
                class="select"
                show-time
                v-model:value="generateTime"
                :presets="ranges"
                :format="dateFormat"
                @change="timeChange"
              />
            </div>
            <!-- 生成时间 end -->

            <!-- 生成状态 start -->
            <div class="formitems">
              <span class="filterLabel">{{ t('report.taskStatus') }}</span>
              <a-select
                class="select"
                allowClear
                v-model:value="agums.status"
                :placeholder="t('report.defaultAll')"
                @change="refreshTable"
              >
                <template v-for="item in generateStatus" :key="item.value">
                  <a-select-option>{{ item.label }}</a-select-option>
                </template>
              </a-select>
            </div>
            <!-- 生成状态 end -->
          </div>
        </template>
        <!-- 筛选按钮 start -->
        <a-button type="text" class="filterBtn">
          <template #icon>
            <customIcon type="#ax-Filters" class="btnIcon" />
          </template>
          {{ t('common.filter') }}
          <span class="flag" v-if="StateEffect"></span>
        </a-button>
        <!-- 筛选按钮 end -->
      </a-popover>
    </div>
    <!-- 表格 start -->
    <div class="tableBox">
      <slots-table
        ref="tableRef"
        row-key="id"
        :scroll="{ y: '500px' }"
        :columns="columns"
        :arguments="agums"
        :get-list-func="getWordReportList"
      />
    </div>
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { getWordReportList } from '@/api/report';
  import { TaskReportFilter } from '@/api/report/model';
  import { useSelectOptions, useColumns } from './index';
  import dayjs, { Dayjs } from 'dayjs';

  const props = defineProps({
    taskId: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  // 表格dom
  const tableRef: any = ref<HTMLElement>();
  const { generateStatus } = useSelectOptions(t);
  const agums = reactive<TaskReportFilter>({
    task_id: props.taskId,
    start_time: undefined, // 秒级时间戳
    end_time: undefined, // 秒级时间戳
    // 1 已生成 2 生成中 3 生成失败
    status: undefined,
  });
  // 刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
  };
  // 列
  const columns = useColumns(t, props.category);
  // 时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  // 时间组件绑定值
  const generateTime = ref<Dayjs[]>([]);
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
    if (v && v.length) {
      const [start, end] = v;
      agums.start_time = start.unix();
      agums.end_time = end.unix();
      refreshTable();
    } else {
      agums.start_time = undefined;
      agums.end_time = undefined;
      refreshTable();
    }
  };

  // 选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in agums) {
      if (k !== 'task_id') {
        const kvalue = agums[k] === undefined ? '' : agums[k];
        flag += kvalue;
      }
    }
    return flag;
  });
</script>
<style lang="less" scoped>
  .header {
    // flex: 0 0 48px;
    height: 48px;
    line-height: 48px;
    padding: 0 48px 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 16px;
    }
  }
  .filterContent {
    width: 480px;
    padding: 16px 15px;
    .formitems {
      display: flex;
      align-items: center;
      padding: 4px 0;
      .filterLabel {
        flex: 80px 0 0;
      }
      .select {
        flex: 1;
      }
    }
  }

  .filterBtn {
    position: relative;
    .btnIcon {
      margin-right: 8px;
    }
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 0px;
      top: 1px;
      background: #18ba79;
    }
  }
</style>
