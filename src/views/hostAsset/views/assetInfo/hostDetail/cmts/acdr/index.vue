<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-12 14:29:16
 * @LastEditTime: 2023-01-12 18:39:20
-->
<template>
  <div class="assetNgavContainer">
    <ngavPage :fromAsset="true" :search_data="ip" :host_id="id" />
  </div>
</template>

<script setup lang="ts">
  import ngavPage from '@/views/ngav/views/ngavPage';
  defineProps({
    ip: String,
    id: String,
  });
</script>

<style scoped lang="less">
  .assetNgavContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    :deep(.container) {
      padding: 0;
    }
    :deep(.dataTable) {
      padding: 0;
    }
  }
</style>
