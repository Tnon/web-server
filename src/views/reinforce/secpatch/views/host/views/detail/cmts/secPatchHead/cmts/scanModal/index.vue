<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-15 12:45:39
 * @LastEditTime: 2023-04-15 12:55:19
-->
<template>
  <div>
    <div class="warn">{{ t('reinforce.scanW') }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style scoped lang="less">
  .warn {
    font-size: @fz14;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
  }
</style>
