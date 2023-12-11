<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-09 11:21:50
 * @LastEditTime: 2023-01-09 11:28:07
-->
<template>
  <div class="container">
    <template v-for="item in groups" :key="item.name">
      <div class="node"> {{ item.name }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  defineProps({
    groups: {
      type: Array as PropType<{ name: string }[]>,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .container {
    height: 300px;
    overflow: auto;
  }
  .node {
    display: inline-block;
    padding: 2px 6px;
    margin: 0 16px 10px 0;
    background-color: #eee;
    border-radius: 8px;
  }
</style>
