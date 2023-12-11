<template>
  <div class="content" :title="t('arcomn.automoren')">
    <div class="more">.</div>
    <div class="more">.</div>
    <div class="more">.</div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .content {
    cursor: pointer;
    margin: 10px 0;
  }
  .more {
    display: flex;
    align-items: end;
    height: 8px;
    color: #aaa;
  }
</style>
