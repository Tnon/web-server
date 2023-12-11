<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 09:51:10
 * @LastEditTime: 2023-08-02 17:44:24
-->
<template>
  <div class="alarmContent">
    <!-- 顶部 start -->
    <pageHeader v-model:handleType="state.handleType" />
    <!-- 顶部 end -->
    <a-layout class="layout">
      <!-- 左侧筛选 start -->
      <a-layout-sider class="layout-sider280">
        <tree-slider
          ref="treeSliderRef"
          v-model:handleType="state.handleType"
          v-model:selectedKeys="state.selectedKeys"
        />
      </a-layout-sider>

      <!-- 左侧筛选 end -->

      <!-- 右侧数据 start -->
      <a-layout-content class="layoutcontent">
        <data-table-cmp
          :handleType="state.handleType"
          :selectedKeys="state.selectedKeys"
          :reloadTree="reloadTree"
        />
      </a-layout-content>
      <!-- 右侧数据 end -->
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref } from 'vue';
  import treeSlider from '@/components/attack-risk-cmts/treeSlider';
  import dataTableCmp from '@/components/attack-risk-cmts/dataTable';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import pageHeader from './cmts/header';
  import { useRoute } from 'vue-router';
  // 总览跳转携带参数
  const {
    query: { handleType, path },
  } = useRoute();
  /*
    初始值(包括 处理类型和攻击类型)
    数据入口
    */
  const state = reactive<{
    handleType: HANDLETYPE;
    selectedKeys: MODELTYPE;
  }>({
    handleType: handleType ? Number(handleType) : HANDLETYPE.UNHANDLE,
    selectedKeys: (path as MODELTYPE) ?? (MODELTYPE.ATTACKPATH as string),
  });

  //树ref
  const treeSliderRef = ref<any>(null);
  //刷新树的方法
  const reloadTree = (boolean?) => {
    unref(treeSliderRef).getTreeData(boolean);
  };
</script>
<style lang="less" scoped>
  .alarmContent {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .layout-sider280 {
    width: 280px !important;
    flex: 0 0 280px !important;
    max-width: 280px !important;
    min-width: 280px !important;
    background: #fff;
    ::v-deep(.header) {
      margin: 16px;
    }
  }
  .layoutcontent {
    margin-top: -48px;
  }
</style>
