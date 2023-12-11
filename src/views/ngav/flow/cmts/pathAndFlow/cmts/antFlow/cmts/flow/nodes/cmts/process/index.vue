<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-01 15:34:57
 * @LastEditTime: 2023-07-12 21:46:29
-->
<template>
  <div class="process" @click="viewNodeDetail">
    <div class="header">
      <div class="left">
        <nodeIcon
          :level="nodeState.level"
          :status="nodeState.status"
          :flag="nodeState.flag"
          :icon="nodeState.icon"
          :size="40"
        />
        <span class="label" :title="nodeState.label">{{ nodeState.label }}</span>
      </div>
      <handleTBW
        @click.stop=""
        class="more"
        :refreshTable="getRecord"
        :record="record"
        :model-type="MODELTYPE.NGAV"
      />
    </div>
    <div class="content">
      <div class="behavior">
        <template v-for="item in nodeState.children" :key="item">
          <behaviorBar :level="item.level" :icon="item.icon" :status="nodeState.status" :size="32">
            <div class="bhtitle">{{ item.action }}</div>
          </behaviorBar>
          <div class="bhContent">
            <template v-if="item.action_detail && item.action_detail.length">
              <div class="node" v-for="labels in item.action_detail" :key="labels">
                {{ labels }}
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="cmd" v-if="nodeState.pid_detail_info">
        <div class="title">{{ t('ngav.prccmd') }}</div>
        <div class="value">{{ nodeState.pid_detail_info.cmd_line }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { PropType } from 'vue';
  import nodeIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/nodeIcon';
  import handleTBW from '@/components/attack-risk-cmts/dataTable/cmts/handleTBW';
  import { MODELTYPE } from '@/enums/attack_risk';
  import behaviorBar from '@/views/ngav/flow/cmts/pathAndFlow/cmts/behaviorBar';
  import { useI18n } from 'vue-i18n';
  import useCreatDraw from '@/hooks/use-click-row';
  import flowNodeDrawer from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/cmts/processDraw';
  const props = defineProps({
    GraphNode: Object,
    nodeState: {
      type: Object as PropType<Node>,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
    getRecord: {
      type: Function,
      required: true,
    },
    detail_id: {
      type: Number,
      required: true,
    },
  });
  props.GraphNode?.on('change:data', ({ current }) => {
    props.nodeState.status = current.status;
  });
  const { t } = useI18n();
  //点击节点查看抽屉
  const viewNodeDetail = () => {
    useCreatDraw(
      {
        title: 'viewNodeDetailDrawInstance',
        contentProps: {
          node_id: props.nodeState.id,
          detail_id: props.detail_id,
          node_status: props.nodeState.status,
          drawClass: 'noHeader',
          placement: 'bottom',
        },
      },
      flowNodeDrawer,
    );
  };
</script>

<style scoped lang="less">
  .process {
    display: inline-block;
    cursor: pointer;
    min-height: 200px;
    width: 272px;
    background-color: #fff;
    border-radius: 8px;
    opacity: 1;
    background: #ffffff;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.04);
    padding: 16px;
    transition: all 0.3s;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      .left {
        display: flex;
        align-items: center;
        .label {
          margin-left: 8px;
          font-size: @fz13;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          max-width: 150px;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: keep-all;
        }
      }
    }
    .behavior {
      .bhtitle {
        font-size: @fz12;
        font-weight: 600;
        /* 文字/白1 */
        color: #ffffff;
        margin-left: 4px;
      }
      .bhContent {
        margin: 12px 0;
        .node {
          font-size: @fz12;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
          word-break: break-word;
          margin: 8px 0;
        }
      }
    }
    .cmd {
      .title {
        font-size: @fz12;
        font-weight: 600;
        /* 文字/黑0.85 */
        color: rgba(0, 0, 0, 0.8);
      }
      .value {
        font-size: @fz12;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.6);
        word-break: break-word;
      }
    }
    &:hover {
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.2);
    }
    .content {
      max-height: 180px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #ddd;
      }
    }
  }
</style>
