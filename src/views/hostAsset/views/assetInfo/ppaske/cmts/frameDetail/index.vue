<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 19:06:51
 * @LastEditTime: 2022-11-30 15:21:37
-->
<template>
  <slots-table
    ref="tableRef"
    :scroll="{ y: '500px' }"
    v-model:columns="columns"
    row-key="host_id"
    :get-list-func="getJarDetail"
    :arguments="agms"
    class="slefTable"
  />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { getJarDetail } from '@/api/asset/hostInfo/host';
  import { SlotsTable } from '@/components/slots-table';
  const { t } = useI18n();
  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const agms = reactive({
    host_id: props.record.host_id,
    name: props.record.app_name,
    web_no: props.record.web_no,
    frame_name: props.record.frame_name,
  });
  const columns = useColumns(t);
</script>

<style scoped lang="less">
  .slefTable {
    padding-bottom: 16px;
  }
</style>
