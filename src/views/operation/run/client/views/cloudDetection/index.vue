<template>
  <div class="versionM">
    <div class="header">
      <!-- 搜索 start -->
      <a-input-search
        v-model:value.trim="agms.searchdata"
        :placeholder="t('common.hostNameIp')"
        class="search"
        @search="searchData"
        @change="searchData"
      />
      <!-- 搜索 end -->

      <!-- 批量升级 end -->
      <div class="rOption">
        <!-- 筛选 start -->
        <filter-pop :agms="agms" :refreshTable="refreshTable" />
        <!-- 筛选 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      :isCheck="isCheck"
      :scroll="{ y: 'calc(100vh - 355px)' }"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="getCloudDetectionApi"
      :arguments="agms"
      bordered
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { watch, reactive, ref } from 'vue';
  import { useColumns } from './type';
  import { SlotsTable } from '@/components/slots-table';
  import { getCloudDetectionApi } from '@/api/operation/run';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import filterPop from './cmts/filterPop';
  import { CloudDetectionFilter } from '@/api/operation/model';
  import { OSTYPE } from '@/enums/assetsType';
  const { t } = useI18n();

  //全选
  const isCheck = ref<boolean>(false);
  //表格
  const tableRef: any = ref<HTMLElement>();
  //表格结构体
  const agms = reactive<CloudDetectionFilter>({
    searchdata: '',
    online: undefined,
    groups: '',
    tags: '',
    osver: OSTYPE.LINUX,
  });
  //刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
    initRowSelection();
  };
  //表格列
  // refreshTable
  const columns = useColumns(t);

  const searchData = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
    }
    if (!value && !e) {
      refreshTable();
    }
  };
  // 监听变化刷新表格
  watch([() => agms.groups, () => agms.online, () => agms.tags], () => {
    //刷新表格
    refreshTable();
  });
</script>

<style lang="less" scoped>
  .versionM {
    flex: 1;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 165px);
    .header {
      flex: 0 0 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .search {
        width: 220px;
        margin-right: 16px;
      }

      .rOption {
        display: flex;
        align-items: center;
        .exportbtn {
          margin: 0 16px;
        }
      }
    }
  }
</style>
