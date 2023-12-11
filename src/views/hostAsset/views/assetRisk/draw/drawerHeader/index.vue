<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-06 16:15:54
 * @LastEditTime: 2023-11-01 10:32:18
-->
<template>
  <div class="header-container">
    <div class="account-title">{{ account }}</div>
    <div class="tag" :style="{ background: vulRiskLevel[level].split(',')[1] }">
      {{ vul_category }}
    </div>
    <div class="tag" :style="{ background: color }">
      {{ t(`asset.${text}`) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { vulRiskLevel } from '@/enums/assetsType';
  import { ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    account: {
      type: String,
      required: true,
    },
    vul_category: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const text = ref<string>('');
  const color = ref<string>('');

  watchEffect(() => {
    [text.value, color.value] = vulRiskLevel[props.level].split(',');
  });
</script>
<style lang="less" scoped>
  .header-container {
    border-bottom: 1px solid #eee;
    .account-title {
      font-weight: 600;
      margin-bottom: 16px;
    }
    .tag {
      display: inline-block;
      font-size: @fz12;
      margin-bottom: 20px;
      padding: 0px 10px;
      border-radius: 4px;
      color: #ffffff;
      margin-right: 16px;
    }
  }
</style>
