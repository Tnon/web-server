<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 19:40:54
 * @LastEditTime: 2023-04-26 18:25:05
-->
<template>
  <atkRskMon :refreshMethods="refreshMethods" class="container" />
</template>
<script lang="ts" setup>
  import atkRskMon from './cmts/atkRskMon';
  defineProps({
    refreshMethods: Object,
  });
</script>
<style lang="less" scoped>
  .container {
    // height: 450px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.02);
    margin: 16px 0;
  }
</style>
