<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-06 14:53:58
 * @LastEditTime: 2023-10-26 14:50:52
-->
<template>
  <div class="layout-header">
    <switch-nodes class="header" v-model:actived="handleTypeCmp" size="small" :types="types" />
  </div>
</template>

<script setup lang="ts">
  import switchNodes from '@/components/switchNodes';
  import { HANDLETYPE } from '@/enums/attack_risk';
  import { computed, PropType } from 'vue';
  import { getHandleTabs } from '.';
  //属性
  const props = defineProps({
    handleType: Number as PropType<HANDLETYPE>,
  });
  const emit = defineEmits(['update:handleType']);
  const types = getHandleTabs();
  const handleTypeCmp = computed({
    get: (): HANDLETYPE => props.handleType!,
    set: (val: HANDLETYPE): void => emit('update:handleType', val),
  });
</script>

<style lang="less" scoped>
  .layout-header {
    // flex: 48px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 8px;
    border-bottom: 1px solid #f0f0f0;
    height: 48px;
    .header {
      position: relative;
      z-index: 10;
      :deep(.smallS) {
        padding: 2px 12px;
      }
      :deep(.actived) {
        background-color: #fff;
      }
      background: rgba(0, 0, 0, 0.08);
    }
  }
</style>
