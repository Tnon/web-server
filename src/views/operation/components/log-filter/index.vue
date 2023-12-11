<template>
  <!-- 左侧筛选 start -->
  <div :class="collapsed ? 'filterFold' : 'filterL'" class="comFilter">
    <div class="header">
      <span class="title">{{ t('common.filter') }}</span>
      <div class="expand" @click="collapsed = !collapsed">
        <MenuUnfoldOutlined class="colIcon" v-show="collapsed" />
        <MenuFoldOutlined class="colIcon" v-show="!collapsed" />
      </div>
    </div>
    <div v-show="!collapsed">
      <div class="line"></div>
      <slot name="search"></slot>
      <!-- 日期 start -->
      <div class="filter">
        <span class="title">{{ t('log.date') }}</span>
        <a-range-picker
          class="dateRange"
          style="flex: 1"
          v-model:value="dateRangeCmp"
          show-time
          :format="dateFormat"
        />
      </div>
      <!-- 日期 end -->
      <slot name="othFilter"></slot>
    </div>
  </div>
  <!-- 左侧筛选end -->
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import dayjs, { Dayjs } from 'dayjs';

  const props = defineProps({
    daterange: {
      type: String,
    },
  });
  const emit = defineEmits(['update:daterange']);
  const { t } = useI18n();
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const collapsed = ref<Boolean>(false);
  const dateRangeCmp = computed({
    get: () => {
      if (props.daterange) {
        const [start, end] = props.daterange!.split(',');
        return [dayjs(start, dateFormat), dayjs(end, dateFormat)];
      }
      return [];
    },
    set: (val: Dayjs[]) => {
      let daterange = '';
      if (val && val.length) {
        const [start, end] = val;
        daterange = start.format(dateFormat) + ',' + end.format(dateFormat);
      } else {
        daterange = '';
      }
      emit('update:daterange', daterange);
    },
  });
</script>

<style lang="less" scoped>
  .comFilter {
    transition: all 0.3s;
    padding: 16px;
    border: 1px solid #eee;
    .header {
      display: flex;
      justify-content: space-between;
      .expand {
        cursor: pointer;
        width: 24px;
        height: 24px;
        text-align: center;
      }
      .colIcon {
        font-size: @fz12;
        color: #666;
      }
      .title {
        font-weight: 600;
        font-size: @fz14;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #eee;
      margin: 16px 0;
    }
    .filter {
      .title {
        display: inline-block;
        margin-bottom: 8px;
      }
      .dateRange {
        width: 100% !important;
      }
    }
  }
  .filterL {
    flex: 0 0 320px;
  }
  .filterFold {
    flex: 0 0 72px;
    .title,
    .filter {
      display: none;
    }
    display: flex;
    justify-content: center;
  }
</style>
