<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-04 11:13:51
 * @LastEditTime: 2023-07-04 15:46:25
-->
<template>
  <div class="container">
    <div class="header">{{ t('operation.serverrun') }}</div>
    <slots-table
      class="dataTable"
      :scroll="{ y: 'calc(100vh - 592px)' }"
      row-key="id"
      ref="tableRef"
      :columns="columns"
      :get-list-func="getServerRunList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from './index';
  import { getServerRunList } from '@/api/operation/run';
  import { SlotsTable } from '@/components/slots-table';
  const { t } = useI18n();
  const dataSource = ref<any>([]);
  const columns = useColumns(t);
  const getTableData = async () => {
    dataSource.value = [];
  };
  getTableData();
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: @fz14;
    font-weight: 500;
    color: #000000;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.8);
    margin: 16px 0 8px 0;
  }
</style>
