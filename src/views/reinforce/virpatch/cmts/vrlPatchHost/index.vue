<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-06-02 10:14:43
-->
<template>
  <div class="content">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="title">{{ title }}</div>
      <!-- 批量升级 start -->
      <batch-bar
        v-if="isCheck"
        :selectedType="selectedType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="state"
        :refreshTable="refreshTable"
      />
      <div class="roption">
        <div class="tools">
          <!-- 高级筛选 start -->
          <advanSearch class="filter" @confirm="btnConfirm" />
          <!-- 高级筛选 end -->

          <!-- 分割线 start -->
          <div class="line"></div>
          <!-- 分割线 end -->
          <!-- 批量标记 start-->
          <batch-pop
            :refreshTable="refreshTable"
            v-model:selectedType="selectedType"
            v-model:isCheck="isCheck"
            v-model:disabledKeys="disabledKeys"
            v-model:canSelectApi="canSelectApi"
          />
          <!-- 批量标记 end-->
        </div>
      </div>
    </div>
    <!-- 内容头部  end-->
    <!-- 表格 start -->
    <slots-table
      class="box"
      ref="tableRef"
      :scroll="{ y: '500px' }"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="getPatEditlist"
      :arguments="state"
      :isCheck="isCheck"
      :get-can-select-func="canSelectApi"
      :disabledKeys="disabledKeys"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import advanSearch from './cmts/advanSearch';
  import batchBar from './cmts/batchBar';
  import batchPop from './cmts/batchPop';
  import { useColumns } from '.';
  import { I_Vrl_Patch_Host_Filter } from './type';
  import { getPatEditlist } from '@/api/reinforce';
  import { SlotsTable } from '@/components/slots-table';
  const props = defineProps({
    title: String,
    patch_id: String,
    refreshTable: Function,
  });
  const { t } = useI18n();
  //table 元素父
  const tableRef = ref<any>(null);
  //调用子组件的刷新方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    props.refreshTable!();
  };
  //全选
  const isCheck = ref<boolean>(false);

  //不能选择的
  const disabledKeys = ref<any>([]);
  //全选数量API
  const canSelectApi = ref<Fn>();
  //批量行为
  const selectedType = ref<string>('');
  //列
  const columns = ref<any>([]);
  watchEffect(() => {
    columns.value = useColumns(t, refreshTable, isCheck.value, props.patch_id!);
  });

  //条件的结构体,导出参数
  const state = reactive<I_Vrl_Patch_Host_Filter & { patch_id: string }>({
    //主机组
    host_group: '',
    //主机列表
    ip_list: '',
    patch_id: props.patch_id!,
  });
  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(state, v);
    refreshTable();
  };
</script>
<style lang="less" scoped>
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    flex: 0 0 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 16px;
    }
    .roption {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tools {
        display: flex;
        align-items: center;
        padding-right: 48px;

        .line {
          width: 1px;
          height: 16px;
          background: #eeeeee;
        }
      }
    }
  }
  .filter {
    position: relative;
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: -10px;
      background: #18ba79;
    }
  }
</style>
