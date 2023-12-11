<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 19:06:51
 * @LastEditTime: 2023-04-27 14:03:39
-->
<template>
  <slots-table
    ref="tableRef"
    :scroll="{ y: '500px' }"
    v-model:columns="columns"
    row-key="host_id"
    :get-list-func="type === 'app' ? getAppDetail : getDatabaseDetail"
    :arguments="agms"
    class="slefTable"
  />
</template>

<script setup lang="ts">
  import { PropType, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { getAppDetail, getDatabaseDetail } from '@/api/asset/hostInfo/host';
  import { SlotsTable } from '@/components/slots-table';
  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
    type: {
      type: String as PropType<'database' | 'app'>,
      required: true,
    },
  });
  const agms = reactive({
    host_id: props.record.host_id,
    name: props.record.app_name || props.record.database_name,
    [props.type === 'app' ? 'app_no' : 'database_no']:
      props.record.app_no || props.record.database_no,
  });
  const columns = useColumns(t);
</script>

<style scoped lang="less">
  .slefTable {
    padding-bottom: 16px;
  }
</style>
