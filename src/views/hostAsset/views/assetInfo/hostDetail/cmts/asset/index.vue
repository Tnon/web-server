<template>
  <div class="contentp">
    <!-- 卡片筛选 start -->
    <detailAssetsFilter v-model:actived="othSta.actived" :id="id" />
    <!-- 卡片筛选 end -->
    <div class="tableTitle">
      <a-input-search
        :title="othSta.placeHodler"
        :placeholder="othSta.placeHodler"
        class="search"
        @search="onSearch"
        @change="onSearch"
        v-model:value.trim="state.name"
      />
    </div>
    <!-- 表格 start-->
    <div class="box">
      <slots-table
        :scroll="{ y: 'calc(100vh - 479px)' }"
        ref="tableRef"
        v-model:columns="othSta.columns"
        row-key="id"
        :get-list-func="othSta.api"
        class="hostDetailTable"
        :arguments="state"
      />
    </div>
    <!-- 表格 end-->
  </div>
</template>

<script lang="ts" setup>
  import { reactive, watch, ref } from 'vue';
  import detailAssetsFilter from './cmts/detailAssetsFilter';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumnsData } from './columns';
  import { Agus, Ftypes } from './type';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    id: String,
  });
  const { t } = useI18n();
  const columnsData = useColumnsData(t);
  const tableRef = ref<any>();
  const state = reactive<Agus>({
    host_id: props.id!,
    name: '',
  });
  const othSta = reactive<any>({
    actived: 'process',
    columns: columnsData['process'].columns,
    placeHodler: columnsData['process'].place,
    api: columnsData['process'].api,
  });
  //切换表头
  watch(
    () => othSta.actived,
    (v: Ftypes) => {
      othSta.columns = columnsData[v].columns;
      othSta.api = columnsData[v].api;
      state.name = '';
      othSta.placeHodler = columnsData[v].place;
    },
  );
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      tableRef.value.refreshTableData();
    }
    if (!value && !e) {
      tableRef.value.refreshTableData();
    }
  };
</script>

<style lang="less" scoped>
  .contentp {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .box {
    flex: 1;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  .search {
    width: 220px;
    margin-right: 16px;
  }

  .tableTitle {
    padding: 8px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
</style>
