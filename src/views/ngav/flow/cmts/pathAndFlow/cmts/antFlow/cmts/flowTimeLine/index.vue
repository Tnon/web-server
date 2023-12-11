<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 16:01:35
 * @LastEditTime: 2023-03-01 18:31:32
-->
<template>
  <div class="container">
    <!-- 主机和网路 start -->
    <div class="ipNet">
      <template v-for="item in TimeLineData.host_nodes" :key="item.id">
        <div class="ipNetNode" @click="viewNodeDetail(item)">
          <div class="left">
            <nodeIcon
              class="imgc"
              :level="item.level"
              :status="item.status"
              :flag="item.flag"
              :icon="item.icon"
              :size="32"
            />
            <span class="ip" v-if="item.host_info">{{ item.host_info.ip }}</span>
          </div>
          <div class="right">
            <host-online :online="(item.status as number)" />
          </div>
        </div>
      </template>
      <template v-for="item in TimeLineData.ip_nodes" :key="item.id">
        <div class="ipNetNode" @click="viewNodeDetail(item)">
          <div class="left">
            <nodeIcon
              class="imgc"
              :level="item.level"
              :status="item.status"
              :flag="item.flag"
              :icon="item.icon"
              :size="32"
            />
            <span class="ip" v-if="item.network_info">{{ item.network_info.remote_ip }}</span>
          </div>
          <div class="right">
            <run-status :status="item.status" />
          </div>
        </div>
      </template>
    </div>
    <!-- 主机和网路 end -->
    <!-- 进程时间轴 start -->
    <a-timeline class="customTimeLine">
      <template v-for="item in TimeLineData.nodes" :key="item.id">
        <a-timeline-item class="timelineItem">
          <template #dot>
            <div class="dotted"></div>
          </template>
          <process-node :nodeInfo="item" @click="viewNodeDetail(item)" />
        </a-timeline-item>
      </template>
    </a-timeline>

    <!-- 进程时间轴 end -->
  </div>
</template>

<script setup lang="ts">
  import hostOnline from '@/components/host-online';
  import processNode from '../processNode';
  import { PropType, reactive, watchEffect } from 'vue';
  import nodeIcon from '@/views/ngav/flow/cmts/pathAndFlow/cmts/nodeIcon';
  import { getNgavTimelineData, getNgavGraghTimelineDataStatus } from '@/api/ngav';
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { NgavType, PathCi } from '@/views/ngav/flow/type';
  import useCreatDraw from '@/hooks/use-click-row';
  import flowNodeDrawer from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/cmts/processDraw';
  import runStatus from '@/views/ngav/flow/cmts/pathAndFlow/cmts/runStatus';
  const props = defineProps({
    selectedCiInfo: {
      type: Object as PropType<
        {
          seletedCiText: string;
        } & PathCi
      >,
      required: true,
    },
  });
  const TimeLineData = reactive<{ host_nodes: Node[]; ip_nodes?: Node[]; nodes: Node[] }>({
    host_nodes: [],
    ip_nodes: [],
    nodes: [],
  });
  //获取主机/ip/节点
  const getTimeLineData = async (detail_id) => {
    const res = await getNgavTimelineData({ detail_id });
    Object.assign(TimeLineData, res);
    //将ip和进程节点状态loading
    if (TimeLineData.ip_nodes) {
      TimeLineData.ip_nodes.forEach((ele) => {
        ele.status = 0;
      });
    }
    TimeLineData.nodes.forEach((ele) => {
      ele.status = 0;
    });
    //请求状态的接口
    const { status_type } = await getNgavGraghTimelineDataStatus({
      detail_id,
      flag: NgavType.TimeLine,
    });
    if (status_type && status_type.length) {
      //更新网络状态
      if (TimeLineData.ip_nodes) {
        TimeLineData.ip_nodes.forEach((ele, index) => {
          ele.status = status_type[index];
        });
      }

      //更新节点状态
      TimeLineData.nodes.forEach((ele, index) => {
        ele.status =
          status_type[index + (TimeLineData.ip_nodes ? TimeLineData.ip_nodes.length : 0)];
      });
    }
  };
  //点击节点查看抽屉
  const viewNodeDetail = (nodeInfo) => {
    useCreatDraw(
      {
        title: 'viewNodeDetailDrawInstance',
        contentProps: {
          node_id: nodeInfo.id,
          detail_id: props.selectedCiInfo.detail_id,
          node_status: nodeInfo.status,
          drawClass: 'noHeader',
        },
      },
      flowNodeDrawer,
    );
  };
  watchEffect(() => {
    props.selectedCiInfo.detail_id !== -1 && getTimeLineData(props.selectedCiInfo.detail_id);
  });
</script>

<style scoped lang="less">
  .container {
    padding: 0 24px;
    width: 100%;
    height: calc(100vh - 190px);
    margin-top: 16px;
    .ipNet {
      display: flex;
      margin-bottom: 16px;
      padding-left: 8px;
      .ipNetNode {
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        min-width: 500px;
        height: 48px;
        border: 1px solid #eee;
        border-radius: 8px;
        .left {
          display: flex;
          align-items: center;
          .imgc {
            margin-right: 8px;
          }
          .ip {
            font-size: @fz14;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    .customTimeLine {
      .timelineItem {
        padding: 0;
        &:last-child {
          :deep(.ant-timeline-item-tail) {
            border: none;
          }
        }
      }
      :deep(.ant-timeline-item-tail) {
        border-left: 1px dashed #f75555;
      }
      .dotted {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        background-color: #f75555;
      }
    }
  }
</style>
