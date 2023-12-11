<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-24 17:38:19
 * @LastEditTime: 2022-10-18 18:09:11
-->
<template>
  <a-menu-item :key="menuInfo.name">
    <span>{{ t(menuInfo.meta.title) }}</span>
  </a-menu-item>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  defineProps({
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
</script>

<style lang="less" scoped>
  .titleIcon {
    margin-right: 4px;
  }
</style>
