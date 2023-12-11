<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:57:47
 * @LastEditTime: 2022-11-25 13:04:14
-->
<template>
  <div class="box">
    <slots-table
      ref="tableRef"
      :scroll="{ y: 'calc(100vh - 256px)' }"
      v-model:columns="columns"
      row-key="host_id"
      :isCheck="isCheck"
      :get-list-func="getHostList"
      :arguments="agms"
      :disabledKeys="disabledKeys"
      :get-can-select-func="getoffLineNumber"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, PropType } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './columns';
  import { getHostList, getoffLineNumber } from '@/api/asset/hostInfo/host';
  import { SelfAgus } from './type';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import { DisbKeys } from '@/components/slots-table/types';
  const props = defineProps({
    agms: {
      type: Object as PropType<SelfAgus & Arguments>,
      required: true,
    },
    boxType: String,
    isCheck: Boolean,
    disabledKeys: {
      type: Array as PropType<DisbKeys[]>,
    },
  });
  const { t } = useI18n();
  //获取元素
  const tableRef = ref<any>(null);
  //刷新表格/树/卡片/初始化全选
  const refreshAll = () => {
    //初始化仓库 选择
    initRowSelection();
    //重绘
    refreshTable();
  };
  //抛出一个刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    tableRef.value.refreshTableData(keepPage);
  };
  //列
  const columns = useColumns(t, refreshTable);
  //监听所有的条件 刷新表格
  watch(
    [
      () => props.agms.secure_status,
      () => props.agms.asset_status,
      () => props.agms.online,
      () => props.agms.osver,
      () => props.agms.groups,
      () => props.agms.tags,
      () => props.agms.update_time,
      () => props.agms.group_id,
      () => props.agms.os,
    ],
    () => {
      refreshAll();
    },
  );

  defineExpose({ refreshTable, refreshAll, tableRef });
</script>

<style lang="less" scoped>
  .box {
    margin: 0px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .lastFiled {
    position: relative;
    .ticon {
      position: absolute;
      right: 0px;
      cursor: pointer;
      font-size: @fz14;
    }
  }
  .btnBorder {
    border: 1px solid #eee;
    margin-right: 15px;
  }
  .actived {
    background: #18ba79;
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }
</style>
