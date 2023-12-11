<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2022-12-23 20:27:07
-->
<template>
  <div class="content">
    <!-- header content start -->
    <draw-header
      :tags="reState.tags"
      :overview="reState.overview"
      :suggestion="reState.suggestion"
      :record="record"
      :refreshTable="refreshTable"
      :closeDraw="closeDraw"
    />
    <!-- header content end -->

    <!-- footer start -->
    <draw-footer
      :initTab="initTab"
      :dtype="record.dtype"
      :id="record.id"
      :handle="record.handle"
      :dataSource="reState.dataSource"
    />
    <!-- footer end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, toRefs, ref } from 'vue';
  import drawHeader from './header';
  import drawFooter from './footer';
  import { getDrawDetailMsg } from '@/api/attack_risk';
  import { MsgTimeLine } from '@/api/attack_risk/model';
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    refreshTable: {
      type: Function,
    },
    closeDraw: {
      type: Function,
    },
  });
  //record是死区
  const { id, handle } = toRefs(props.record);
  //条件结构体
  const state = reactive<MsgTimeLine>({
    filter: {
      id,
      handle,
    },
  });
  //是否要初始化tab选中
  const initTab = ref<boolean>(false);
  //返回值结构体
  const reState = reactive({
    //辅助分析
    comment: '',
    // 风险概述
    overview: '',
    //修复建议
    suggestion: '',
    //风险/攻击 全路径
    tags: [],
    //agentversion
    agent_version: '',
    //其他
    dataSource: {},
  });
  // 获取详情信息
  const getDetaiMsg = async (bool: boolean) => {
    initTab.value = bool;
    const { comment, path, overview, suggestion, agent_version, ...dataSource } =
      await getDrawDetailMsg(state);
    //常规信息
    reState.overview = overview;
    reState.suggestion = suggestion;
    reState.tags = path.split('|');
    //tabs信息
    //辅助分析和agentversion 自定义包装 自定义字段auxiliary
    dataSource.auxiliary = { agent_version, comment };
    //处置记录占位
    dataSource.handlerecord = { handlerecord: true };
    //攻击记录占位
    dataSource.timeline = { timeline: true };
    reState.dataSource = dataSource;
  };
  getDetaiMsg(true);
</script>
<style lang="less" scoped>
  .content {
    padding: 0 24px;
  }
</style>
