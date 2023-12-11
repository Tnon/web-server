<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 18:24:34
 * @LastEditTime: 2023-07-04 17:12:04
-->
<template>
  <div class="tableView">
    <!-- 表格内容 start -->
    <!-- :scroll="{ y: 'calc(100vh - 223px)' }" -->
    <slots-table
      ref="tableRef"
      class="table"
      row-key="id"
      :columns="useColumns(t, recourceType)"
      :arguments="argms"
      :get-list-func="getResourceTable"
      :scroll="{ y: '200px' }"
      :page-option="{ simple: true }"
    />
    <!-- 表格内容 end -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './index';
  import { getResourceTable } from '@/api/asset/hostInfo/host';

  const props = defineProps({
    recourceType: {
      type: String,
      required: true,
    },
    argms: {
      type: Object,
      required: true,
    },
  });

  const { t } = useI18n();
  // 表头配置项
  // const columns = useColumns(t);
  // 获取dom元素
  const tableRef = ref<any>(null);
  //抛出一个刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    tableRef.value.refreshTableData(keepPage);
  };
  //监听所有的条件 刷新表格
  watch(
    props.argms,
    () => {
      refreshTable();
    },
    {
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .tableView {
    margin-top: 16px;
    flex: 1;
    .table {
      height: 100%;
    }
  }
</style>
