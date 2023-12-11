<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-13 11:22:13
 * @LastEditTime: 2022-09-28 14:31:54
-->
<template>
  <a-row :gutter="16" class="usageRow">
    <a-col :span="24 / typeList.length" v-for="(item, index) in typeList" :key="item">
      <chart-table :usageType="item" :usageColor="colorList[index]" />
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import chartTable from './cmts/chartTable';
  import { usageTypeColor } from '@/enums/assetsType';
  // const usageType = ['CPU', 'memory', 'disk'];
  const typeList = ref<string[]>([]);
  const colorList = ref<string[]>([]);

  // 得到使用率类型列表及对应的颜色列表
  usageTypeColor.forEach((item) => {
    const tempList = item.split('|');
    typeList.value.push(tempList[0]);
    colorList.value.push(tempList[1]);
  });
</script>
<style lang="less" scoped>
  .usageRow {
    margin-top: 16px;
  }
</style>
