<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 15:29:44
 * @LastEditTime: 2023-02-24 19:24:50
-->
<template>
  <template v-if="showMenuItem">
    <a-menu-item :key="keyName">
      <template #icon v-if="icon">
        <custom-icon :type="icon" size="18" />
      </template>
      <span :title="t( title as string)">
        {{t( title as string)}}
      </span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
  import { hasPerimission } from '@/utils/permission';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    keyName: {
      type: String,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
  });
  const { t } = useI18n();
  //计算属性避免重复计算
  const showMenuItem = computed(() => hasPerimission(props.keyName));
</script>

<style scoped></style>
