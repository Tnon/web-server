<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-01 15:34:57
 * @LastEditTime: 2023-07-12 21:39:04
-->
<template>
  <div class="host" @click="viewNodeDetail">
    <nodeIcon
      class="imgc"
      :level="nodeState.level"
      :status="nodeState.status"
      :flag="nodeState.flag"
      :icon="nodeState.icon"
      :size="40"
    />
    <span class="ip" v-if="nodeState.host_info">{{ nodeState.host_info.ip }}</span>
    <span class="hostname" v-if="nodeState.host_info">{{ nodeState.host_info.hostname }}</span>
    <div
      class="group"
      v-if="
        nodeState.host_info &&
        nodeState.host_info.path_kv_list &&
        nodeState.host_info.path_kv_list.length
      "
    >
      <custom-icon type="#ax-wh-grouping" class="gicon" />
      <span>{{ nodeState.host_info.path_kv_list[0].name }}</span>
    </div>
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
        height: 156,
        placement: 'bottom',
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
  .host {
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
    .hostname {
      font-size: @fz12;
      /* 文字/黑0.7 */
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 8px;
    }
    .group {
      display: flex;
      align-items: center;
      padding: 4px 12px;
      background: #f6f6f6;
      border-radius: 8px;
      font-size: @fz12;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.8);
      .gicon {
        margin-right: 8px;
        font-size: @fz14!important;
      }
    }
  }
</style>
