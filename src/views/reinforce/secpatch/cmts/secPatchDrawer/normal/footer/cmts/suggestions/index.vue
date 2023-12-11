<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 19:54:21
 * @LastEditTime: 2022-12-20 10:22:11
-->
<template>
  <div class="container">
    <!-- 修复建议 start -->
    <div class="row">
      <div class="label">{{ t('arcomn.repairSuggest') }}</div>
      <div class="val">{{ dataSource.proposal }}</div>
    </div>
    <!-- 修复建议 end-->
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';

  defineProps({
    dataSource: {
      type: Object as PropType<{
        proposal: string;
        repair_cmd: string;
      }>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>
<style lang="less" scoped>
  .row {
    margin: 16px 0;

    .label {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 12px;
      word-break: keep-all;
      margin-bottom: 8px;
    }
    .val {
      font-size: @fz12;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.7);
    }
  }
</style>
