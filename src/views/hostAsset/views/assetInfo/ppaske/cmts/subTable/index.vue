<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-14 20:03:51
 * @LastEditTime: 2023-04-06 16:56:00
-->
<template>
  <slots-table
    class="subTable"
    v-model:columns="newColumns"
    :getListFunc="api"
    :arguments="arguments"
    :pageOption="{ size: 'small' }"
    rowKey="host_id"
  >
    <!-- 主键暂时用host_id  -->
    <!-- 占位用  -->
    <template #expandedRowRender> </template>
  </slots-table>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { cloneDeep } from 'lodash';
  import { TableColumn } from '@/types/tableColumn';

  const props = defineProps({
    columns: {
      // 表头信息
      type: Array as PropType<TableColumn[]>,
      default: () => [],
    },
    api: {
      // 获取列表数据函数API
      type: Function as PropType<<T>(prams: T) => any>,
      required: true,
    },
    arguments: {
      type: Object,
    },
  });
  const newColumns = cloneDeep(props.columns);
  newColumns.map((item, index) => {
    // 值类型不会改变原数组，引用类型会改变原数组
    if (index < 1) {
      item.dataIndex = '';
      item.customRender = undefined;
    }
  });
</script>
<style lang="less" scoped>
  .subTable {
    :deep(.ant-table-thead) {
      display: none;
    }
    :deep(.ant-table-row-expand-icon) {
      display: none;
    }
  }
</style>
