<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-12 15:44:37
 * @LastEditTime: 2023-04-27 18:22:40
-->
<template>
  <span class="circle" :style="{ background: color }">
    {{ t(`asset.${text}`) }}
  </span>
</template>
<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { vulRiskLevel } from '@/enums/assetsType';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    level: [String, Number],
  });
  const { t } = useI18n();
  const text = ref<string>(''),
    color = ref<string>('');
  watchEffect(() => {
    [text.value, color.value] = vulRiskLevel[~~props.level!].split(',');
  });
</script>
<style lang="less" scoped>
  .circle {
    height: 56px;
    width: 56px;
    text-align: center;
    line-height: 56px;
    font-size: @fz14;
    font-weight: 600;
    color: #ffffff;
    display: inline-block;
    border-radius: 50%;
    margin-right: 24px;
  }
</style>
