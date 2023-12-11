<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-15 12:45:39
 * @LastEditTime: 2023-04-27 14:00:47
-->
<template>
  <div>
    <div class="warn">{{ t('reinforce.scanS') }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style scoped lang="less">
  .warn {
    font-size: @fz14;
    font-weight: normal;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
