<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-13 19:59:30
 * @LastEditTime: 2022-10-14 09:49:00
-->
<template>
  <a-menu-item :key="menuInfo.name">{{ t(menuInfo.meta.title) }}</a-menu-item>
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
