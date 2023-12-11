<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-20 11:42:52
 * @LastEditTime: 2022-11-02 16:46:58
-->
<template>
  <slots-table
    :columns="tableConfig.columns"
    :getListFunc="tableConfig.api"
    :scroll="{ y: '500px' }"
    rowKey="updated_at"
  />
</template>
<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';

  import { useTableConfig } from './index';
  import { useI18n } from 'vue-i18n';
  import { onUnmounted, reactive, watchEffect } from 'vue';
  import { TableColumn } from '@/types/tableColumn';
  const props = defineProps({
    state: Object,
  });
  const { t } = useI18n();
  const tableConfig = reactive<{
    columns: TableColumn[];
    api(...rest): Promise<any>;
  }>({
    columns: [],
    api: () => ({} as Promise<any>),
  }) as any;
  watchEffect(() => {
    useTableConfig(props.state!.selectedType, t, tableConfig);
  });
  onUnmounted(() => {
    props.state!.selectedType = 'client';
  });
</script>
