<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-25 10:12:08
 * @LastEditTime: 2022-11-02 12:04:04
-->
<template>
  <div class="container">
    <localConfig />
    <storeConfig />
  </div>
</template>

<script setup lang="ts">
  import localConfig from './views/localConfig';
  import storeConfig from './views/storeConfig';
</script>

<style scoped lang="less">
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: space-around;
  }
</style>
