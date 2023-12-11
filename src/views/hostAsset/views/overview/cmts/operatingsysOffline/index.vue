<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-09 11:34:12
 * @LastEditTime: 2023-04-27 14:13:00
-->
<template>
  <a-row :gutter="16">
    <a-col span="8">
      <operatingsys-chart class="container" :refreshMethods="refreshMethods" />
    </a-col>
    <a-col span="8">
      <operatingsys-table class="container" :refreshMethods="refreshMethods" />
    </a-col>
    <a-col span="8">
      <offline-table class="container" :refreshMethods="refreshMethods" />
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import operatingsysChart from './cmts/opreratingsysChart';
  import operatingsysTable from './cmts/operatingsysTable';
  import offlineTable from './cmts/offlineTable';
  defineProps({
    refreshMethods: {
      type: Object,
      required: false, // 总览模块需要；资产-总览页不需要
    },
  });
</script>
<style lang="less" scoped>
  .container {
    height: 420px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.02);
  }
</style>
