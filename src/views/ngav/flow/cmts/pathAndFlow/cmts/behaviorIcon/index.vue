<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 13:24:39
 * @LastEditTime: 2022-09-27 17:29:31
-->
<template>
  <div
    class="outer"
    :style="{
      opacity: behaviorInfo.outerOpacity,
      width: size + 'px',
      height: size + 'px',
      'line-height': size + 'px',
    }"
  >
    <custom-icon
      :type="behaviorInfo.behaviorBackType"
      :style="{ color: behaviorInfo.behaviorBackColor }"
      class="backIcon abIcon"
    />
    <custom-icon
      :type="behaviorInfo.behaviorIconType"
      :style="{
        color: behaviorInfo.behaviorIconColor,
        width: size / 2 + 'px',
        height: size / 2 + 'px',
      }"
      class="innericon"
    />
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
    text-align: center;
    border-radius: 50%;
    .abIcon {
      position: absolute;
    }
    .backIcon {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .innericon {
      position: relative;
      z-index: 3;
    }
  }
</style>
