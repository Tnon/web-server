<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2023-10-16 10:36:21
-->
<template>
  <div class="container">
    <a-table
      :pagination="false"
      :columns="columns"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 238px)' }"
      :dataSource="dataSource"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useColumns } from './index';
  import { useRoute } from 'vue-router';
  import { getHostPolicy } from '@/api/asset/hostInfo/host';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const columns = useColumns(t);
  const currentRoute = useRoute();
  const dataSource = ref<any>([]);
  const getTableData = async () => {
    dataSource.value = await getHostPolicy({
      host_id: currentRoute.query.id as string,
    });
  };
  getTableData();
</script>

<style lang="less" scoped>
  .container {
    margin: 16px 0px;
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;
  }
  .search {
    width: 220px;
    margin-left: 16px;
  }
  .selectEff {
    width: 128px;
    margin: 0 8px;
  }
</style>
