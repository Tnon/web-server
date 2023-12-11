<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 10:20:48
 * @LastEditTime: 2022-08-18 15:10:02
-->
<template>
  <div>
    <exportList :refreshTable="refreshTable" :state="state" />
    <slots-table
      :scroll="{ y: '600px' }"
      ref="tableRef"
      row-key="host_id"
      :getListFunc="getUnadapList"
      :columns="columns"
      :arguments="state"
    />
  </div>
</template>

<script setup lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { getUnadapList } from '@/api/operation/upgrade';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import exportList from '../exportList';
  import { unref, ref, reactive } from 'vue';
  import { UnadapFilter } from '@/api/operation/model';
  const { t } = useI18n();
  //筛选数据题
  const state = reactive<UnadapFilter>({
    os_info: '',
    host_info: '',
    agent_version: undefined,
    status: undefined,
    groups: '',
  });
  //表格列
  const columns = useColumns(t);
  //表格元素
  const tableRef = ref();
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
</script>

<style lang="less" scoped></style>
