<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-09 15:31:03
 * @LastEditTime: 2023-02-14 17:12:51
-->
<template>
  <div class="container">
    <!-- 资产概览 start -->
    <assetStatic />
    <!-- 资产概览 end -->

    <div class="paddcont">
      <!-- 主机统计 start -->
      <hostStatistic />
      <!-- 主机统计 end -->

      <!-- 操作系统分布及离线统计 start -->
      <operatingsys-offline />
      <!-- 操作系统分布及离线统计 end -->

      <!-- CPU、内存、磁盘使用率图、表 start -->
      <host-usage />
      <!-- CPU、内存、磁盘使用率图、表 end -->

      <resource-alarm />
    </div>
  </div>
</template>

<script setup lang="ts">
  import assetStatic from './cmts/assetStatic';
  import hostStatistic from './cmts/hostStatistic';
  import operatingsysOffline from './cmts/operatingsysOffline';
  import hostUsage from './cmts/hostUsage';
  import resourceAlarm from './cmts/resourceAlarm';
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    overflow: auto;
    .paddcont {
      padding: 16px;
    }
  }
</style>
