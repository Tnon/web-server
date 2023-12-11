<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-08 12:18:00
 * @LastEditTime: 2022-10-08 16:40:39
-->
<template>
  <slots-table
    class="recordsTable"
    rowKey="id"
    :columns="columns"
    :arguments="agms"
    :scroll="{ y: '500px' }"
    :get-list-func="getUserLoginHistory"
  />
</template>
<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from './index';
  import { getUserLoginHistory } from '@/api/asset/accountRisk/weakpwd';
  import { reactive, toRefs } from 'vue';

  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });

  const { t } = useI18n();
  const { username, host_id } = toRefs(props.record);
  // 表头配置项
  const columns = useColumns(t);
  const agms = reactive({
    username,
    host_id,
  });
</script>
<style lang="less" scoped>
  .recordsTable {
    height: 100%;
    padding-bottom: 16px;
  }
</style>
