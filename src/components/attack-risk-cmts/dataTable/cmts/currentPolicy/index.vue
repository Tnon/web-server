<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-07 16:10:32
 * @LastEditTime: 2023-03-02 15:14:51
-->
<template>
  <div>
    <div v-if="hasHeader" class="header">{{ hasHeader }}</div>
    <template v-if="polices && polices.length">
      <template v-for="item in polices" :key="item">
        <span class="node">{{ item }}</span>
      </template>
    </template>
    <template v-else> - </template>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    polices: {
      type: Array,
    },
    hasHeader: String,
  });
</script>

<style scoped lang="less">
  .header {
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    line-height: 16px;
    margin-bottom: 8px;
  }
  .node {
    display: inline-block;
    margin: 0 4px 4px 0;
    padding: 2px 6px;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 2px;
    font-size: 12px;
    color: #18ba79;
  }
</style>
