<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:57:47
 * @LastEditTime: 2023-04-07 17:38:33
-->
<template>
  <slots-table
    class="box"
    ref="tableRef"
    :scroll="{ y: 'calc(100vh - 152px)' }"
    v-model:columns="columns"
    row-key="host_id"
    :isCheck="isCheck"
    :get-list-func="getHostList"
    :arguments="agms"
    :disabledKeys="disabledKeys"
    :get-can-select-func="getoffLineNumber"
  />
</template>

<script lang="ts" setup>
  import { ref, watch, PropType, onUnmounted } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './columns';
  import { getHostList, getoffLineNumber } from '@/api/operation/asset';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import { DisbKeys } from '@/components/slots-table/types';
  import { GroupHost } from '@/api/operation/model';
  const props = defineProps({
    agms: {
      type: Object as PropType<GroupHost & Arguments>,
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
      () => props.agms.online,
      () => props.agms.tags,
      () => props.agms.group_id,
      () => props.agms.os,
      () => props.agms.groups,
    ],
    () => {
      refreshAll();
    },
  );
  onUnmounted(() => {
    initRowSelection();
  });
  defineExpose({ refreshTable, refreshAll, tableRef });
</script>

<style lang="less" scoped>
  .box {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    :deep(.ant-table-thead > tr > th) {
      height: 40px;
    }
  }
</style>
