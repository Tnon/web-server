<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-07 18:01:54
 * @LastEditTime: 2022-09-15 17:45:49
-->
<template>
  <div class="dataItem" v-for="(value, key) in dataSource" :key="key">
    <span class="label">{{ t(`asset.drawer${key}`) }}：</span>
    <slot :name="key" :text="value" v-if="$slots[key]"></slot>
    <span class="value" v-else>{{ value ?? '--' }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
  });
</script>
<style lang="less" scoped>
  .dataItem {
    margin: 16px 0;
    font-size: @fz12;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);

    display: flex;
    align-items: flex-start;
    .label {
      // flex: 0 0 138px;
      min-width: 138px;
      display: inline-block;
      color: rgb(0 0 0 / 90%);
    }
    .value {
      word-break: break-word;
    }
  }
</style>
