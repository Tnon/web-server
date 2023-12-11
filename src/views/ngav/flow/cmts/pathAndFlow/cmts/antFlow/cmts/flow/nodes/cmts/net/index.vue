<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-01 15:34:57
 * @LastEditTime: 2023-03-27 11:07:55
-->
<template>
  <div class="net" @click="viewNodeDetail">
    <nodeIcon
      class="imgc"
      :level="nodeState.level"
      :status="nodeState.status"
      :flag="nodeState.flag"
      :icon="nodeState.icon"
      :size="40"
    />
    <span class="ip" v-if="nodeState.network_info">{{ nodeState.network_info.remote_ip }}</span>
  </div>
</template>

<script setup lang="ts">
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { PropType } from 'vue';
  import nodeIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/nodeIcon';
  import useCreatDraw from '@/hooks/use-click-row';
  import flowNodeDrawer from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/cmts/processDraw';
  const props = defineProps({
    nodeState: {
      type: Object as PropType<Node>,
      required: true,
    },
    detail_id: {
      type: Number,
      required: true,
    },
  });
  //点击节点查看抽屉
  const viewNodeDetail = () => {
    useCreatDraw(
      {
        title: 'viewNodeDetailDrawInstance',
        placement: 'bottom',
        height: 156,
        contentProps: {
          node_id: props.nodeState.id,
          detail_id: props.detail_id,
          node_status: props.nodeState.status,
          drawClass: 'noHeader',
        },
      },
      flowNodeDrawer,
    );
  };
</script>

<style scoped lang="less">
  .net {
    display: inline-block;
    height: 200px;
    width: 152px;
    background-color: #fff;
    border-radius: 8px;
    opacity: 1;
    background: #ffffff;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.2);
    }
    .ip {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin: 4px 0;
    }
  }
</style>
