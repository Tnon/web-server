<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-02 16:50:00
 * @LastEditTime: 2023-07-04 15:45:18
-->
<template>
  <div class="cnt">
    <!-- 服务器资源占用 start -->
    <server-monitor />
    <!-- 服务器资源占用 end -->
    <!-- webshell检测及杀毒 start -->
    <server-webshell />
    <!-- webshell检测及杀毒 end -->
    <div class="foo">
      <!-- 服务运行情况 start -->
      <server-run class="run" />
      <!-- 服务运行情况 end -->
      <!-- 服务运行异常告警 start -->
      <server-error class="err" />
      <!-- 服务运行异常告警 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import serverMonitor from './cmts/serverMonitor';
  import serverWebshell from './cmts/serverWebshell';
  import serverRun from './cmts/serverRun';
  import serverError from './cmts/serverError';
</script>

<style scoped lang="less">
  .cnt {
    height: calc(100vh - 82px);
    display: flex;
    flex-direction: column;
    .foo {
      flex: 1;
      display: flex;
      .run {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 427px);
        overflow: hidden;
        margin-right: 16px;
      }
      .err {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 427px);
        overflow: hidden;
      }
    }
  }
</style>
