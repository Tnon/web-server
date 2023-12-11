<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 13:24:39
 * @LastEditTime: 2022-09-29 17:21:20
-->
<template>
  <div
    class="outer"
    :style="{
      opacity: statusInfo.outerOpacity,
      width: size + 'px',
      height: size + 'px',
    }"
  >
    <custom-icon
      v-if="statusInfo.showLoading === 'block'"
      :type="statusInfo.loadingType"
      :style="{ color: statusInfo.loadingColor, width: size + 6 + 'px', height: size + 6 + 'px' }"
      class="abIcon"
      :class="{ loadingIcon: statusInfo.loadingType === '#ax-n-nodeloading' }"
    />
    <custom-icon
      :type="statusInfo.backType"
      :style="{ color: statusInfo.backColor }"
      class="backIcon abIcon"
    />
    <custom-icon
      :type="statusInfo.iconType"
      :style="{
        color: statusInfo.iconColor,
        width: size / 2 + 'px',
        height: size / 2 + 'px',
      }"
      class="innericon"
    />
  </div>
</template>

<script setup lang="ts">
  import {
    NodeIcon,
    NodeLevel,
    NodeStatus,
    Node_BehaviorBack,
  } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { commonJudgeProcessIcon } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools';
  import { PropType, reactive, watchEffect } from 'vue';
  const props = defineProps({
    icon: {
      type: Number as PropType<NodeIcon>,
      required: true,
    },
    level: {
      type: Number as PropType<NodeLevel>,
      required: true,
    },
    status: {
      type: Number as PropType<NodeStatus>,
      required: true,
    },
    flag: {
      type: Number as PropType<Node_BehaviorBack>,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  });
  const statusInfo = reactive({
    showLoading: '',
    loadingColor: '',
    loadingType: '',
    backColor: '',
    backType: '',
    iconColor: '',
    iconType: '',
    outerOpacity: 1,
  });
  watchEffect(() => {
    const statusInfoDymic = commonJudgeProcessIcon(
      props.icon,
      props.level,
      props.status,
      props.flag,
    );
    Object.assign(statusInfo, statusInfoDymic);
  });
</script>

<style scoped lang="less">
  .outer {
    position: relative;
    text-align: center;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .abIcon {
      position: absolute;
    }
    .loadingIcon {
      top: -3px;
      left: -3px;
      z-index: 1;
      animation: rotate 2s linear infinite;
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
