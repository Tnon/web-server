<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-11-21 11:48:29
-->
<template>
  <a-menu-item :key="menuInfo.name" v-if="showMenuItem">
    <template #icon v-if="menuInfo.meta!.icon">
      <custom-icon :type="menuInfo.meta!.icon" class="menuIcons" />
    </template>
    <span>{{ t(menuInfo.meta.title) }}</span>
  </a-menu-item>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { hasPerimission } from '@/utils/permission';
  import { computed } from 'vue';

  const props = defineProps({
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
  //计算属性避免重复计算
  const showMenuItem = computed(() => hasPerimission(props.menuInfo.name));
</script>

<style scoped lang="less">
  .menuIcons {
    font-size: @fz24 !important;
  }
</style>
