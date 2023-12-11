<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 09:51:10
 * @LastEditTime: 2023-02-21 21:06:21
-->
<template>
  <div class="assetalarmContent">
    <!-- calc(100vh - 383px) -->
    <data-table-cmp
      :handleType="state.handleType"
      :selectedKeys="state.selectedKeys"
      :search_data="state.search_data"
      :reloadTree="reloadTree"
      :fromAsset="true"
      :host_id="state.host_id"
    >
      <template #handleSwitch>
        <!-- 顶部 start -->
        <pageHeader v-model:handleType="state.handleType" />
        <!-- 顶部 end -->
      </template>
    </data-table-cmp>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import dataTableCmp from '@/components/attack-risk-cmts/dataTable';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import pageHeader from '@/views/attack/cmts/header';
  const props = defineProps({
    ip: String,
    id: String,
  });
  /*
    初始值(包括 处理类型和攻击类型)
    数据入口
    */
  const state = reactive<{
    handleType: HANDLETYPE;
    selectedKeys: MODELTYPE;
    search_data: string;
    host_id: string;
  }>({
    handleType: HANDLETYPE.UNHANDLE,
    selectedKeys: MODELTYPE.ATTACKPATH,
    search_data: props.ip!,
    host_id: props.id!,
  });
  const reloadTree = () => {};
</script>
<style lang="less" scoped>
  .assetalarmContent {
    display: flex;
    flex-direction: column;
    flex: 1;
    :deep(.pageHeader) {
      justify-content: space-between;
      .layout-header {
        flex: auto;
        border: none;
        background-color: unset;
      }
    }
  }
</style>
