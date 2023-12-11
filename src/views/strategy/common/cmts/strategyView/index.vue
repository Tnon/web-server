<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-20 11:42:52
 * @LastEditTime: 2022-09-26 11:18:03
-->
<template>
  <slots-table
    :columns="tableConfig.columns"
    :getListFunc="getSercuityListWithGroup"
    :arguments="{ policy_type: strategyType }"
    :scroll="{ y: '500px' }"
    ref="tableRef"
    rowKey="id"
  />
</template>
<script lang="ts" setup>
  import { getSercuityListWithGroup } from '@/api/strategy/safe';
  import { SlotsTable } from '@/components/slots-table';
  import { useTableConfig } from './index';
  import { useI18n } from 'vue-i18n';
  import { PropType, reactive, ref, unref, watchEffect } from 'vue';
  import { TableColumn } from '@/types/tableColumn';
  import { StrategyType } from '@/views/strategy/common/types';
  const props = defineProps({
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    refreshStrategyList: {
      type: Function,
      required: true,
    },
    selectStrategy: {
      type: Function,
      required: true,
    },
    globalID: {
      type: Number,
      required: true,
    },
    closeModal: Function,
    pageOption: Object,
  });
  const tableRef = ref<any>();
  const { t } = useI18n();
  const tableConfig = reactive<{
    columns: TableColumn[];
    api(...rest): Promise<any>;
  }>({
    columns: [],
    api: () => ({} as Promise<any>),
  }) as any;
  const refreshTableAndStrategy = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    props.refreshStrategyList(keepPage);
  };
  watchEffect(() => {
    useTableConfig(
      props.strategyType,
      t,
      tableConfig,
      refreshTableAndStrategy,
      props.selectStrategy,
      props.closeModal,
      props.pageOption,
      props.refreshStrategyList,
      props.globalID,
    );
  });
</script>
