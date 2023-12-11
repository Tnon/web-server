<template>
  <div class="maincontent">
    <div class="header">
      <span class="title">{{ t('operation.userLog') }}</span>
      <!-- 导出 start -->
      <export-data api="/api/report/oplog" :params="agms" class="exportIc" />
      <!-- 导出 end -->
    </div>
    <div class="container">
      <!-- 左侧筛选 start -->
      <Filter v-model:daterange="state.date_range">
        <template #search>
          <div class="filter">
            <span class="title">{{ t('log.account') }}</span>
            <a-input-search
              :placeholder="t('log.pIptAcnt')"
              @search="onSearch"
              @change="onSearch"
              v-model:value.trim="state.search_value"
            />
          </div>
        </template>

        <template #othFilter>
          <div class="filter">
            <span class="title">{{ t('log.event') }}</span>
            <a-cascader
              style="display: block; width: 100%"
              :placeholder="t('log.pIptEvent')"
              v-model:value="state.mod"
              :options="optionState.options"
            />
          </div>
        </template>
      </Filter>
      <!-- 左侧筛选 end -->
      <!-- 右侧表格 start -->
      <slots-table
        class="behTable"
        ref="tableRef"
        :columns="columns"
        row-key="name"
        :arguments="state"
        :scroll="{ y: 'calc(100vh - 175px)' }"
        :get-list-func="getMemLogList"
      />
      <!-- 右侧表格 ebd -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import Filter from '@/views/operation/components/log-filter';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns, Option } from './index';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import { getMemOptions, getMemLogList } from '@/api/operation/user';
  const { t } = useI18n();
  const columns = useColumns(t);
  const tableRef: any = ref<HTMLElement>();
  // 导出的传参
  const agms = reactive<Arguments>({});
  //级联选择
  const optionState = reactive<{
    options: Option[];
  }>({
    options: [],
  });
  const refreshTableAndMerge = () => {
    tableRef.value.refreshTableData();
    mergeAgus();
  };
  //表格数据体
  const state = reactive<{
    date_range: string;
    search_value: string;
    mod: string[] | undefined;
  }>({
    date_range: '',
    mod: undefined,
    search_value: '',
  });
  //条件更换 刷新表格
  watch(
    () => [state.date_range, state.mod],
    () => {
      refreshTableAndMerge();
    },
  );
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTableAndMerge();
    }
    if (!value && !e) {
      refreshTableAndMerge();
    }
  };
  //获取所有事件
  const getOptions = async () => {
    const res = await getMemOptions();
    if (!res.code) {
      optionState.options = res;
    }
  };
  getOptions();
  const mergeAgus = () => {
    Object.assign(agms, state, {
      mod: state.mod && state.mod.length ? state.mod[state.mod.length - 1] : undefined,
    });
  };
</script>

<style lang="less" scoped>
  .maincontent {
    padding: 16px;
    .header {
      padding: 0 0 16px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  .container {
    width: 100%;
    display: flex;
    height: calc(100vh - 64px);
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;

    .behTable {
      flex: 1;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .filter {
      margin: 16px 0;
      .title {
        display: inline-block;
        margin-bottom: 8px;
      }
      .selecTree {
        width: 100%;
        border-radius: 8px;
      }
    }
  }
</style>
