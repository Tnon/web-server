<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-13 17:27:23
 * @LastEditTime: 2023-03-13 17:30:07
-->
<template>
  <div>
    <span class="name"> {{ t('reinforce.tgl') }} </span>
    <a-tooltip placement="bottom" theme="light" color="#fff">
      <template #title>
        <span style="color: #000">
          {{ t('reinforce.tgltips') }}
        </span>
      </template>
      <custom-icon class="iconc" type="#ax-tips" />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style scoped>
  .name {
    margin-right: 8px;
  }

  .iconc {
    color: rgba(0, 0, 0, 0.8);
  }
</style>
