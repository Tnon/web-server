<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-30 11:56:25
 * @LastEditTime: 2022-10-28 17:00:32
-->
<template>
  <div class="container">
    <!-- 日志存储期限 start -->
    <logStorage />
    <!-- 日志存储期限 end -->

    <!-- 数据备份 start -->
    <dataBackup />
    <!-- 数据备份 end -->
  </div>
</template>

<script setup lang="ts">
  import logStorage from './cmts/log-storage';
  import dataBackup from './cmts/data-backup';
</script>

<style scoped lang="less">
  .container {
    padding: 0 16px;
    height: calc(100vh);
  }
</style>
