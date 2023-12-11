<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-10-21 16:49:37
 * @LastEditTime: 2023-08-01 15:05:00
-->
<template>
  <a-popover
    v-if="crashStatus && crashStatus.type !== E_CrashType.Normal"
    trigger="hover"
    placement="right"
    destroyTooltipOnHide
    :overlayClassName="crashStatus.stoptime ? 'showContent' : 'hideContent'"
  >
    <template #content>
      {{ crashStatus.stoptime }}
    </template>
    <template v-if="crashStatus.type === E_CrashType.AbnRestart">
      {{ t('operation.abRest') }}
    </template>
    <template v-else>
      <span class="text" :title="t('operation.cpumsnfr')">{{ t('operation.cpumsnfr') }}</span>
    </template>
  </a-popover>
  <span v-else>-</span>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { I_CrashState, E_CrashType } from './type';
  defineProps({
    crashStatus: Object as PropType<I_CrashState>,
  });
  const { t } = useI18n();
</script>
<style lang="less" scoped>
  .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
  }
</style>
