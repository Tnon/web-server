<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-16 18:34:06
 * @LastEditTime: 2023-02-20 14:17:14
-->
<template>
  <div class="container">
    <!-- 规则统计 start -->
    <rule-static />
    <!-- 规则统计 end -->
    <!-- 表格 start -->
    <table-content />
    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import ruleStatic from './cmts/ruleStatic';
  import tableContent from './cmts/tableContent';
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
  }
</style>
