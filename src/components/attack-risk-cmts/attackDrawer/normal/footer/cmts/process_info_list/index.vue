<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-13 16:56:15
 * @LastEditTime: 2023-07-26 16:25:49
-->
<template>
  <a-timeline class="timeline">
    <template v-for="item in dataSource" :key="item.id">
      <a-timeline-item>
        <template #dot>
          <div class="dot"></div>
        </template>
        <div class="content">
          <div class="head">{{ t('arcomn.srcnameDraw') }} : {{ item.process_name }}</div>
          <template v-for="(value, key) in item" :key="key">
            <template v-if="key !== 'process_name'">
              <div class="labelinfo">
                <div class="label">{{ t(`arcomn.${key}Draw`) }}</div>
                <div class="value">{{ value }}</div>
              </div>
            </template>
          </template>
        </div>
      </a-timeline-item>
    </template>
  </a-timeline>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  defineProps({
    dataSource: Array as PropType<
      {
        command_line: string;
        pid: number;
        process_name: string;
        process_path: string;
        user_name: string;
      }[]
    >,
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .timeline {
    margin-top: 16px;
    .dot {
      width: 8px;
      height: 8px;
      background-color: @primary-color;
      border-radius: 50%;
    }
    .head {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 12px;
    }
    .content {
      .labelinfo {
        margin-bottom: 8px;
        font-size: @fz12;
        color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        .label {
          width: 128px;
        }
      }
    }
  }
</style>
