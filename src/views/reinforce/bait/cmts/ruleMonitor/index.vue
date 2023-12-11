<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-08-07 10:19:15
-->
<template>
  <div class="content">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="roption">
        <div class="tools">
          <!-- 高级筛选 start -->
          <advanSearch class="filter" @confirm="btnConfirm" />
          <!-- 高级筛选 end -->

          <!-- 分割线 start -->
          <div class="line"></div>
          <!-- 分割线 end -->
          <!-- 导出 start -->
          <export-data api="/api/report/dfrulestatuslist" :params="state" />
          <!-- 导出 end -->
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
      :get-list-func="getRuleHostDetailDf"
      :arguments="state"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanSearch from './cmts/advanSearch';
  import { useColumns } from '.';
  import { I_Rule_Monitor_Filter } from './type';
  import { getRuleHostDetailDf } from '@/api/reinforce';
  import { SlotsTable } from '@/components/slots-table';
  const props = defineProps({
    title: String,
    rule_id: Number,
  });
  const { t } = useI18n();
  //table 元素父
  const tableRef = ref<any>(null);

  //列
  const columns = useColumns(t);

  //调用子组件的刷新方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };

  //条件的结构体,导出参数
  const state = reactive<I_Rule_Monitor_Filter & { rule_id: number }>({
    //文件路径
    file_path: '',
    //主机组
    host_group: '',
    //主机列表
    ip_list: '',
    // 监控状态
    monitor_state: undefined,
    rule_id: props.rule_id!,
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
          margin: 0 16px 0 8px;
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
