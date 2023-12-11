<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:06:40
 * @LastEditTime: 2023-08-16 16:12:57
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <div class="header">
      <!-- 屏蔽windows -->
      <!-- <switch-nodes v-model:actived="filter.osver" :types="FTypes" /> -->
      <!-- 操作 start -->
      <toolBar />
      <!-- 操作 end -->
    </div>
    <!-- 头部 end -->
    <!-- Agent和安全驱动 start -->
    <agent-driver ref="agentDriverRef" v-model:filter="filter" />
    <!-- Agent和安全驱动 end -->
    <!-- 版本管理 start -->
    <table-version
      ref="agentDriverTableRef"
      :refreshVersion="refreshVersion"
      v-model:filter="filter"
    />
    <!-- 版本管理 end -->
  </div>
</template>

<script setup lang="ts">
  // 屏蔽windows
  // import switchNodes from '@/components/switchNodes';
  import { ref, unref, reactive } from 'vue';
  import { ClientFilter } from '@/api/operation/model';
  import { OSTYPE } from '@/enums/assetsType';
  // 屏蔽windows
  // import { FTypes } from '.';
  import toolBar from './cmts/toolsBar';
  import agentDriver from './cmts/agentDriver';
  import tableVersion from './cmts/tableVersion';
  //agent和驱动元素
  const agentDriverRef = ref<any>(null);
  //agent和驱动表格元素
  const agentDriverTableRef = ref<any>(null);
  //升级完后 刷新数据
  const refreshData = (boolean) => {
    unref(agentDriverRef).getVersions();
    unref(agentDriverTableRef).refreshTable(boolean);
  };
  //单独
  const refreshVersion = () => {
    unref(agentDriverRef).getVersions();
  };
  //agent和驱动筛选
  const filter = reactive<Partial<ClientFilter>>({
    osver: OSTYPE.LINUX,
    agent_upgraded_status: undefined,
    driver_upgraded_status: undefined,
    agent_version: undefined,
    driver_version: undefined,
  });
  //将刷新的方法传出去
  defineExpose({ refreshData });
</script>

<style scoped lang="less">
  // .container {
  //   overflow: auto;
  //   height: calc(100vh - 342px);
  // }
  .container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 65px);
  }
  .header {
    display: flex;
    padding: 16px 0;
    align-items: center;
    justify-content: space-between;
    :deep(.box) {
      border: none;
      .defaultS {
        padding: 4px 10px;
        margin: 0;
        line-height: 16px;
      }
    }
  }
</style>
