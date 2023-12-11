<template>
  <div class="info" :title="kernel_version ? os + '/' + kernel_version : os">
    {{ kernel_version ? os + '/' + kernel_version : os }}
  </div>
</template>

<script setup lang="ts">
  defineProps({
    kernel_version: String,
    os: String,
  });
</script>

<style scoped lnag="less">
  .info {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
</style>
