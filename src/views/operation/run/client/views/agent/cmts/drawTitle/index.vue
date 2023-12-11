<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-28 18:37:59
 * @LastEditTime: 2023-08-28 18:49:53
-->
<template>
  <div class="title">
    <span class="text">{{ t('operation.zjklfs') }}</span>
    <a-popover placement="bottomRight" destroyTooltipOnHide>
      <template #content>
        <ipShow />
      </template>
      <QuestionCircleOutlined />
    </a-popover>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import ipShow from './cmts/ipShow';
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .title {
    display: flex;
    align-items: center;
    .text {
      margin-right: 8px;
      font-size: @fz15;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
