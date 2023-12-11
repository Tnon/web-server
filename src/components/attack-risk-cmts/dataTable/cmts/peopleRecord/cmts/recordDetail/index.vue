<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-26 20:44:50
 * @LastEditTime: 2023-10-16 10:36:15
-->
<template>
  <div class="content">
    <!-- 内容头部  start-->
    <div class="header">
      <div class="title">
        {{ search_data ? search_data + '-' + t('arcomn.perrecod') : t('arcomn.perrecod') }}
      </div>
      <div class="roption">
        <a-input-search
          v-if="!fromAsset"
          v-model:value.trim="agms.search_data"
          :placeholder="t('arcomn.hadnrooc')"
          class="searchIn"
          @search="onSearch"
          @change="onSearch"
        />
        <div class="tools">
          <!-- 高级筛选 start -->
          <advanSearch :params="agms" @confirm="confirmBtn" />
          <!-- 高级筛选 end -->
        </div>
      </div>
    </div>
    <!-- 内容头部  end-->

    <!-- 表格 start -->
    <slots-table
      class="box"
      ref="tableRef"
      :scroll="{ y: '500px' }"
      v-model:columns="columns"
      row-key="id"
      :get-list-func="getPeopleHandleList"
      :arguments="agms"
    />
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, unref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getPeopleHandleList } from '@/api/attack_risk';
  import { useColumns } from '.';
  import advanSearch from '../advanSearch';
  import { SlotsTable } from '@/components/slots-table';
  import { IPeopleRecordState } from './type';
  const props = defineProps({
    source: {
      type: Number,
      required: true,
    },
    fromAsset: {
      type: Boolean,
    },
    search_data: {
      type: String,
    },
  });
  const { t } = useI18n();
  const tableRef = ref();
  const columns = useColumns(t);
  //筛选确定时间
  const confirmBtn = () => {
    refreshTable();
  };
  //刷新表格
  const refreshTable = () => {
    unref(tableRef).refreshTableData();
  };
  //条件的结构体,导出参数
  const agms = reactive<IPeopleRecordState>({
    //告警还是事件
    source: props.source,
    //分组
    group: undefined,
    //搜索
    search_data: props.search_data ?? '',
    //处置方式
    dispose_kind: undefined,
    //处置结果
    dispose_res: undefined,
    //处置人
    dispose_user: undefined,
    //威胁类型
    risk_type_list: [],
  });
  // 搜索框变化刷新表格
  const onSearch = (v, e?) => {
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
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    flex: 0 0 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 16px;
    }
    .roption {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .searchIn {
        width: 220px;
      }
      .tools {
        display: flex;
        align-items: center;
        padding-right: 24px;
      }
    }
  }
  .box {
    padding: 0 16px;
  }
</style>
