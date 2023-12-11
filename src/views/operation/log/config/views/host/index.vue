<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-09-21 14:40:40
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 标题 start -->
      <span class="title">{{ t('operation.clsk') }}</span>
      <!-- 标题 end -->
      <div class="tools">
        <!-- 搜索 start -->
        <a-input-search
          class="search"
          v-model:value.trim="agms.host"
          :placeholder="t('common.pIptHostIp')"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 搜索 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: noConfig ? 'calc(100vh - 344px)' : 'calc(100vh - 284px)' }"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getSysHostlist"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getSysHostlist } from '@/api/operation/syslog';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  defineProps<{
    noConfig: boolean;
  }>();
  const { t } = useI18n();

  //table dom
  const tableRef = ref<any>();

  //搜索数据源
  const agms = reactive({
    host: '',
  });

  //
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  //表格列
  const columns = useColumns(t);

  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
    }
    if (!value && !e) {
      refreshTable();
    }
  };
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      flex: 0 0 48px;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 700;
        font-size: @fz14;
      }
      .search {
        width: 220px;
        margin-right: 16px;
      }

      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
