<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:28:36
 * @LastEditTime: 2022-12-29 19:12:03
-->
<template>
  <div class="switch">
    <span class="title">
      <!-- switch名称 start -->
      <span class="label">{{ switchTextInfo.title }}</span>
      <!-- switch名称 end -->
      <!-- 问号提示 start -->
      <a-tooltip placement="right" color="#fff" destroyTooltipOnHide v-if="switchTextInfo.tips">
        <template #title>
          <span class="labelmsg_icon" v-html="switchTextInfo.tips"></span>
        </template>
        <QuestionCircleOutlined />
      </a-tooltip>
      <!-- 问号提示 end -->
    </span>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  defineProps({
    switchTextInfo: {
      type: Object as PropType<{ title: string; tips: string }>,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .switch {
    display: flex;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      margin-left: 16px;
      font-size: @fz12;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      .label {
        margin-right: 5px;
      }
    }
  }
  .labelmsg_icon {
    color: rgba(0, 0, 0, 0.8);
    padding: 4px;
  }
</style>
