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
      <!-- 批量升级 start -->
      <batch-bar
        v-if="isCheck"
        :selectedType="selectedType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
      />

      <!-- 批量升级 end -->
      <div class="rOption">
        <!-- 批量标记 start-->
        <batch-pop
          :refreshTable="refreshTable"
          v-model:selectedType="selectedType"
          v-model:isCheck="isCheck"
          v-model:disabledKeys="disabledKeys"
          v-model:canSelectApi="canSelectApi"
          :type="agms.type"
        />
        <!-- 批量标记 end-->
        <!-- 筛选 start -->
        <filter-pop :agms="agms" :refreshTable="refreshTable" />
        <!-- 筛选 end -->
      </div>
    </div>
    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      :scroll="{ y: 'calc(100vh - 493px)' }"
      row-key="host_id"
      :arguments="agms"
      :get-list-func="getEngineList"
      class="agentTable"
      :isCheck="isCheck"
      :get-can-select-func="canSelectApi"
      :disabledKeys="disabledKeys"
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { watch, reactive, ref, PropType, watchEffect } from 'vue';
  import { useColumns } from './type';
  import { SlotsTable } from '@/components/slots-table';
  import { getEngineList } from '@/api/operation/upgrade';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import batchPop from './cmts/batchPop';
  import filterPop from './cmts/filterPop';
  import batchBar from './cmts/batchBar';
  import { EngineFilter } from '@/api/operation/model';

  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<EngineFilter>>,
      required: true,
    },
  });
  const emit = defineEmits(['update:filter']);
  const { t } = useI18n();

  //全选
  const isCheck = ref<boolean>(false);
  //表格
  const tableRef: any = ref<HTMLElement>();
  //表格结构体
  const agms = reactive<Partial<EngineFilter>>({
    searchdata: '',
    groups: '',
    online: undefined,
  });
  watchEffect(() => {
    Object.assign(agms, props.filter);
  });
  //刷新表格
  const refreshTable = (keep_page?: boolean) => {
    tableRef.value.refreshTableData(keep_page);
    initRowSelection();
  };
  const columns = ref<any>([]);
  watchEffect(() => {
    columns.value = useColumns(t, refreshTable, props.filter.type);
  });
  // 搜索框变化刷新表格
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
  watch(
    [
      () => agms.groups,
      () => agms.online,
      () => agms.engine_version,
      () => agms.engine_upgrade_status,
      () => agms.type,
    ],
    () => {
      //agent状态和驱动状态要抛出
      emit(
        'update:filter',
        Object.assign(props.filter, {
          engine_version: agms.engine_version,
          engine_upgrade_status: agms.engine_upgrade_status,
        }),
      );
      //刷新表格
      refreshTable();
    },
  );
  //不能选择的
  const disabledKeys = ref<any>([]);
  //全选数量API
  const canSelectApi = ref<Fn>();
  //批量卸载还是升级
  const selectedType = ref<string>('');

  //条件更换 刷新表格
  watch(isCheck, (v) => {
    if (!v) {
      selectedType.value = '';
    }
  });
  //抛出刷新方法
  defineExpose({ refreshTable });
</script>

<style lang="less" scoped>
  .versionM {
    flex: 1;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    .header {
      flex: 0 0 56px;
      padding-left: 16px;
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
        justify-content: flex-end;
        align-items: center;
        margin-right: 16px;
      }
    }
  }
</style>
