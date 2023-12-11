<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-04 19:06:51
 * @LastEditTime: 2023-09-14 17:38:14
-->
<template>
  <slots-table
    ref="tableRef"
    :scroll="{ y: '500px' }"
    v-model:columns="columns"
    row-key="host_id"
    :get-list-func="getMDlist"
    :arguments="{ host_id }"
    class="slefTable"
  />
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { getMDlist } from '@/api/operation/syslog';
  import { SlotsTable } from '@/components/slots-table';
  const { t } = useI18n();
  defineProps({
    host_id: {
      type: String,
      required: true,
    },
  });
  const columns = useColumns(t);
</script>

<style scoped lang="less">
  .slefTable {
    padding-bottom: 16px;
  }
</style>
