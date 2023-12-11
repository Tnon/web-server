<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-21 13:57:50
 * @LastEditTime: 2023-07-06 11:36:30
-->
<template>
  <div>
    <span v-if="risk_total_count" class="acdr value">
      {{ t('asset.rskUnit') }}
    </span>
    <span v-if="vul_count" class="acdr value">
      {{ t('asset.vulnerability') }}
    </span>
    <span v-if="!risk_total_count && !vul_count" class="safeTag value">
      {{ t('common.healthy') }}
    </span>
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  defineProps({
    risk_total_count: Number,
    vul_count: Number,
  });
  const { t } = useI18n();
</script>
<style lang="less" scoped>
  .safeTag {
    background: rgb(24 186 121 / 15%);
    color: #18ba79;
  }
  .acdr {
    color: @warn-color;
    background-color: rgba(248, 164, 84, 0.15);
  }
  .value {
    padding: 2px 6px;
    margin: 4px 4px 4px 0;
  }
</style>
