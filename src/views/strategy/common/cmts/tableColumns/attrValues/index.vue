<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 17:01:26
 * @LastEditTime: 2023-02-06 17:15:05
-->
<template>
  <div class="container">
    <template v-for="item in attrValues" :key="item">
      <div class="node">{{ item.value }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  defineProps({
    attrValues: Array as PropType<any>,
  });
</script>

<style scoped lang="less">
  .container {
    padding-bottom: 16px;
  }
  .node {
    padding: 16px 0;
    border-bottom: 1px solid #eee;
    font-size: @fz14;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    line-height: 24px;
    &:last-child {
      border: none;
    }
  }
</style>
