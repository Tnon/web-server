<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-16 18:34:35
 * @LastEditTime: 2023-02-23 11:34:24
-->
<template>
  <div class="container">
    <!-- 头部标题和统计 start -->
    <head-static />
    <!-- 头部标题和统计 end -->

    <!-- 表格 start -->
    <table-content />
    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import headStatic from './cmts/headStatic';
  import tableContent from './cmts/tableContent';
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
  }
</style>
