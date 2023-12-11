<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-01 15:27:14
 * @LastEditTime: 2023-03-02 10:05:12
-->
<template>
  <component
    :is="
      nodeState.icon === NodeIcon.Host
        ? hostNode
        : nodeState.icon === NodeIcon.Ip
        ? netNode
        : processNode
    "
    :GraphNode="GraphNode"
    :nodeState="nodeState"
    :record="nodeState.record"
    :getRecord="nodeState.getRecord"
    :detail_id="nodeState.detail_id"
  />
</template>
<script setup lang="ts">
  import hostNode from './cmts/host';
  import netNode from './cmts/net';
  import processNode from './cmts/process';
  import { Node, NodeIcon } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { inject, reactive } from 'vue';
  const getNode: any = inject('getNode');
  const GraphNode = getNode();
  const nodeState = reactive<Node & { record: Object; getRecord: Fn; detail_id: number }>(
    GraphNode.data,
  );
</script>

<style scoped lang="less">
  .node {
    display: inline-block;
    height: 200px;
    background-color: #fff;
    border-radius: 8px;
    opacity: 1;
    background: #ffffff;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.04);
  }
</style>
