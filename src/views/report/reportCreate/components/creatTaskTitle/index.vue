<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-24 14:20:20
 * @LastEditTime: 2023-08-24 18:19:08
-->

<template>
  <a-popover placement="right" destroyTooltipOnHide>
    <template #content>
      <div class="toolContent">
        <div class="title">
          {{ t('report.taskTitletil') }}
        </div>
        <div class="text">{{ t('report.taskSubtips1') }}</div>
        <div class="text">{{ t('report.taskSubtips2') }}</div>
      </div>
    </template>
    <div class="moTitle">
      <span class="titl">{{ t('report.createTask') }}</span>
      <question-circle-outlined />
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';

  const { t } = useI18n();
</script>

<style scoped lang="less">
  .toolContent {
    display: inline-block;
    width: 400px;
    overflow: auto;

    .title {
      color: @primary-color;
      font-size: @fz12;
      font-weight: 600;
    }

    .text {
      color: rgba(0, 0, 0, 0.8);
      font-size: @fz12;
    }
  }

  .moTitle {
    display: inline-flex;
    align-items: center;
    font-size: @fz16;
    color: rgba(0, 0, 0, 0.8);

    .titl {
      margin-right: 8px;
    }
  }
</style>
