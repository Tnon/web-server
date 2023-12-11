<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 13:24:39
 * @LastEditTime: 2023-03-02 15:06:23
-->
<template>
  <div
    class="outer"
    :style="{
      opacity: behaviorInfo.outerOpacity,
      background: behaviorInfo.behaviorBackColor,
    }"
  >
    <custom-icon
      :type="behaviorInfo.behaviorIconType"
      :style="{
        color: behaviorInfo.behaviorIconColor,
        width: size / 2 + 'px',
        height: size / 2 + 'px',
      }"
      class="innericon"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import {
    BehaviorIcon,
    NodeStatus,
    Node_BehaviorBack,
  } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { commonJudgeBehaviorIcon } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools';
  import { PropType, reactive, watchEffect } from 'vue';
  const props = defineProps({
    icon: {
      type: Number as PropType<BehaviorIcon>,
      required: true,
    },
    level: {
      type: Number as PropType<Node_BehaviorBack>,
      required: true,
    },
    status: {
      type: Number as PropType<NodeStatus>,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  });
  const behaviorInfo = reactive({
    behaviorBackType: '',
    behaviorBackColor: '',
    behaviorIconColor: '',
    behaviorIconType: '',
    outerOpacity: 1,
  });
  watchEffect(() => {
    const behaviorInfoDymic = commonJudgeBehaviorIcon(props.icon, props.level, props.status);
    Object.assign(behaviorInfo, behaviorInfoDymic);
  });
</script>

<style scoped lang="less">
  .outer {
    position: relative;
    // text-align: center;
    // border-radius: 50%;
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 12px;

    .innericon {
      position: relative;
      z-index: 3;
    }
  }
</style>
