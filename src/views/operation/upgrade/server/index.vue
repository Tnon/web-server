<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-02 16:13:45
 * @LastEditTime: 2023-07-31 18:13:24
-->
<template>
  <div class="tableCon">
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="getServerTableList"
      class="agentTable"
      :scroll="{ y: 'calc(100vh - 184px)' }"
    />
  </div>
</template>

<script setup lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { getServerTableList } from '@/api/operation/upgrade';
  import { ref } from 'vue';

  const { t } = useI18n();
  //刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
  };
  //表格
  const tableRef: any = ref<HTMLElement>();
  const columns = useColumns(t, refreshTable);

  //升级完后 刷新数据
  const refreshData = (boolean) => {
    refreshTable(boolean);
  };
  defineExpose({ refreshData });
</script>

<style scoped lang="less">
  .tableCon {
    height: calc(100vh - 66px);
    display: flex;
    flex-direction: column;
  }
</style>
