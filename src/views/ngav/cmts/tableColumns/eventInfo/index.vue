<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 15:01:37
 * @LastEditTime: 2023-04-06 17:37:30
-->
<template>
  <div class="infoMsg">
    <div class="type">
      <div class="title" :class="[className]">{{ rule_name }}</div>
      <score-tips :level="level!" :score="score!">
        <div class="number" :class="[className]">{{ score }}</div>
      </score-tips>
    </div>
    <div class="system">{{ root_name }}</div>
    <div class="time">{{ event_at }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import scoreTips from '@/components/scoreTips';
  import { getClassName } from '../attackPath';
  const props = defineProps({
    score: Number,
    root_name: String,
    rule_name: String,
    event_at: String,
    level: String,
  });
  //颜色的类名
  const className = ref('');
  watchEffect(() => {
    className.value = getClassName(props.level!);
  });
</script>

<style scoped lang="less">
  .infoMsg {
    .type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: @fz16;
        font-weight: 600;
        line-height: 24px;
        background: none !important;
      }
      .number {
        font-size: @fz14;
        font-weight: 600;
        color: #ffffff !important;
        line-height: 24px;
        padding: 0 8px;
        border-radius: 8px;
      }
    }
    .system {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 8px;
    }
    .time {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      line-height: 16px;
    }
  }
  .danger {
    color: #f75555;
    background: #f75555;
  }
  .warning {
    color: #ecd834;
    background: #ecd834;
  }
  .mid {
    color: #f8a556;
    background: #f8a556;
  }
</style>
