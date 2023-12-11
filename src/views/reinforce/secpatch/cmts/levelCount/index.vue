<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-28 10:31:37
 * @LastEditTime: 2023-04-28 10:41:50
-->
<template>
  <div>
    <template v-for="{ level, count } in vulCounts" :key="level">
      <span
        class="node"
        :class="{
          danger: level === E_Risk_Level.Danger || E_Risk_Level.High,
          mid: level === E_Risk_Level.Mid,
          low: level === E_Risk_Level.Low,
        }"
      >
        {{ t('asset.' + vulRiskLevel[~~level].split(',')[0]) }}
        {{ `（${count}）` }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { E_Risk_Level } from '../../type';
  import { vulRiskLevel } from '@/enums/assetsType';

  defineProps<{
    vulCounts: {
      level: E_Risk_Level;
      count: number;
    }[];
  }>();
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .node {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: @fz12;
    font-weight: normal;
    line-height: 16px;
    margin: 0 8px 8px 0;
  }
  .danger {
    color: @danger-color;
    background: rgba(247, 85, 85, 0.1);
  }
  .mid {
    color: @warn-color;
    background: rgba(248, 165, 86, 0.1);
  }
  .low {
    color: #f6c84d;
    background: rgba(246, 200, 77, 0.1);
  }
</style>
