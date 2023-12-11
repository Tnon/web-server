<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-25 17:14:45
 * @LastEditTime: 2022-09-27 10:29:29
-->
<template>
  <div class="process">
    <behaviorIcon
      :level="behaviorNode.level"
      :icon="behaviorNode.icon"
      :status="nodeInfo.status"
      :size="32"
    />
    <div class="name">{{ behaviorNode.action }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Behavior, Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { PropType } from 'vue';
  import behaviorIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/behaviorIcon';
  defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
    behaviorNode: {
      type: Object as PropType<Behavior>,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .process {
    display: flex;
    padding: 16px;
    line-height: normal;
    align-items: center;
    .name {
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-left: 16px;
    }
  }
</style>
