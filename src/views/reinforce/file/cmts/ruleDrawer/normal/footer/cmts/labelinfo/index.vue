<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 11:41:55
 * @LastEditTime: 2023-01-11 11:04:02
-->
<template>
  <div>
    <template v-for="(item, key) in dataSource" :key="key">
      <div class="formIt">
        <div class="label">{{ t(`arcomn.${key}Draw`) }}</div>
        <div class="value">{{ item }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  defineProps({
    dataSource: Object,
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .formIt {
    margin: 16px 0;
    font-size: @fz12;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
    display: flex;
    align-items: flex-start;

    .label {
      min-width: 138px;
      display: inline-block;
      color: rgb(0 0 0 / 90%);
    }

    .value {
      word-break: break-word;
    }
  }
</style>
