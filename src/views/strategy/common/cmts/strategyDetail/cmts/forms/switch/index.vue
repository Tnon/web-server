<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:10:23
 * @LastEditTime: 2022-12-29 19:15:06
-->
<template>
  <div class="switch">
    <a-switch
      :disabled="!isEditing"
      :checkedValue="SwitchMode.Open"
      :unCheckedValue="SwitchMode.Close"
      v-model:checked="strategyData[nodeKey][switchInfo.name].value"
    />
    <span
      class="title"
      :class="{
        successNameColor: strategyData[nodeKey][switchInfo.name].value === SwitchMode.Open,
      }"
    >
      <!-- switch名称 start -->
      <span class="label">{{ switchInfo.title }}</span>
      <!-- switch名称 end -->
      <!-- 问号提示 start -->
      <a-tooltip placement="right" color="#fff" destroyTooltipOnHide v-if="switchInfo.tips">
        <template #title>
          <span class="labelmsg_icon" v-html="switchInfo.tips"></span>
        </template>
        <QuestionCircleOutlined />
      </a-tooltip>
      <!-- 问号提示 end -->
    </span>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { SwitchMode } from '@/views/strategy/common/types';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { Ctype, HttpData } from '@/views/strategy/common/cmts/strategyDetail/type';
  defineProps({
    isEditing: {
      type: Boolean,
      required: true,
    },
    strategyData: {
      type: Object as PropType<HttpData>,
      required: true,
    },
    nodeKey: {
      type: String,
      required: true,
    },
    switchInfo: {
      type: Object as PropType<{ title: string; tips: string; name: 'switch'; ctype: Ctype }>,
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
      color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      .label {
        margin-right: 5px;
      }
    }
    .successNameColor {
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .labelmsg_icon {
    color: rgba(0, 0, 0, 0.8);
    padding: 4px;
  }
</style>
