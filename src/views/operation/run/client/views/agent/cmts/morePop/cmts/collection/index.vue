<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 10:20:48
 * @LastEditTime: 2023-07-13 20:21:46
-->
<template>
  <div class="container">
    <div class="head">
      <div class="title">{{ t('operation.cjdsz') }}</div>
      <div class="roption">
        <a-input-search
          v-model:value.trim="agms.search_data"
          :placeholder="t('common.hostNameIp')"
          class="searchIn"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 高级筛选 start -->
        <advanSearch @confirm="confirmBtn" />
        <!-- 高级筛选 end -->
      </div>
    </div>
    <!-- 统计采集点数量 start -->

    <collection-count
      :refreshTable="refreshTable"
      :params="agms"
      :staticCount="staticCount"
      :totalNum="canSelectTotalNum"
      :collectionSelection="collectionSelection"
    />
    <!-- 统计采集点数量 end -->
    <slots-table
      ref="tableRef"
      :scroll="{ y: '600px' }"
      row-key="host_id"
      :getListFunc="getCollectionList"
      :columns="columns"
      :showColumsSet="true"
      v-model:total-num="totalNum"
      :arguments="agms"
      :auto-get-data="false"
    >
      <template #headerCellcustom="{ column, title }">
        <template
          v-if="
            column.dataIndex === 'process' ||
            column.dataIndex === 'file' ||
            column.dataIndex === 'network' ||
            column.dataIndex === 'memory' ||
            column.dataIndex === 'other'
          "
        >
          <a-checkbox
            :disabled="!canSelectTotalNum"
            :checked="collectionSelection[column.dataIndex].mode === E_Select_Mode.All"
            @change="changeCheckbox($event, column.dataIndex)"
            :indeterminate="
              collectionSelection[column.dataIndex].mode === E_Select_Mode.All
                ? collectionSelection[column.dataIndex].exclude.length &&
                  collectionSelection[column.dataIndex].exclude.length < canSelectTotalNum
                  ? true
                  : false
                : collectionSelection[column.dataIndex].mode === E_Select_Mode.None
                ? collectionSelection[column.dataIndex].include.length &&
                  collectionSelection[column.dataIndex].include.length < canSelectTotalNum
                  ? true
                  : false
                : collectionSelection[column.dataIndex].indeterminate
            "
          >
            {{ title }}
            <!-- 
            " -->
          </a-checkbox>
        </template>
      </template>
    </slots-table>
  </div>
</template>

<script setup lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { getCanCheckCollCount, getCollectionCount, getCollectionList } from '@/api/operation/run';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { onMounted, reactive, ref, unref } from 'vue';
  import advanSearch from '../advanSearch';
  import { I_Check_State, T_Collection, E_Select_Mode } from './type';
  import collectionCount from '../collectionCount';
  const { t } = useI18n();
  //条件的结构体,导出参数
  const agms = reactive({
    search_data: '',
    //分组
    groups: '',
    //agent版本
    agent_version: undefined,
  });
  //已经生效的数量
  const staticCount = reactive({
    process: {
      count: 0,
      online_count: 0,
    },
    memory: {
      count: 0,
      online_count: 0,
    },
    file: {
      count: 0,
      online_count: 0,
    },
    network: {
      count: 0,
      online_count: 0,
    },
    other: {
      count: 0,
      online_count: 0,
    },
  });
  //获取静态统计数量
  const getStaticCount = async () => {
    const { code, ...items } = await getCollectionCount(agms);
    if (!code) {
      Object.assign(staticCount, items);
    }
  };
  //表格总数
  const totalNum = ref(0);
  //可选表格总数
  const canSelectTotalNum = ref(0);
  //获取可选数量
  const canCheckCount = async () => {
    const { code, count } = await getCanCheckCollCount(agms);
    if (!code) {
      canSelectTotalNum.value = count;
    }
  };
  //列选择的状态和id
  const collectionSelection = reactive<Record<T_Collection, I_Check_State>>({
    process: {
      mode: E_Select_Mode.Init,
      include: [],
      exclude: [],
      indeterminate: false,
    },
    file: {
      mode: E_Select_Mode.Init,
      include: [],
      exclude: [],
      indeterminate: false,
    },
    network: {
      mode: E_Select_Mode.Init,
      include: [],
      exclude: [],
      indeterminate: false,
    },
    memory: {
      mode: E_Select_Mode.Init,
      include: [],
      exclude: [],
      indeterminate: false,
    },
    other: {
      mode: E_Select_Mode.Init,
      include: [],
      exclude: [],
      indeterminate: false,
    },
  });
  //全选和取消全选
  const changeCheckbox = (e, dataIndex) => {
    collectionSelection[dataIndex].include = [];
    collectionSelection[dataIndex].exclude = [];
    collectionSelection[dataIndex].mode = e.target.checked ? E_Select_Mode.All : E_Select_Mode.None;
    collectionSelection[dataIndex].indeterminate = false;
  };
  //初始化表头选择状态
  const initCheck = () => {
    for (let k in collectionSelection) {
      collectionSelection[k].include = [];
      collectionSelection[k].exclude = [];
      if (staticCount[k].online_count === 0) {
        collectionSelection[k].mode = E_Select_Mode.None;
      } else if (
        staticCount[k] &&
        staticCount[k].online_count &&
        staticCount[k].online_count === canSelectTotalNum.value
      ) {
        collectionSelection[k].mode = E_Select_Mode.All;
      } else {
        collectionSelection[k].mode = E_Select_Mode.Init;
        collectionSelection[k].indeterminate = true;
      }
    }
  };

  //表格列
  const columns = useColumns(t, collectionSelection);
  //表格
  const tableRef = ref();
  //筛选确定
  const confirmBtn = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };
  //刷新表格
  const refreshTable = async (boolean?) => {
    await getStaticCount();
    await canCheckCount();
    await unref(tableRef).refreshTableData(boolean);
    initCheck();
  };

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
  onMounted(() => {
    //主动请求表格
    refreshTable();
  });
</script>
<style scoped lang="less">
  .container {
    .head {
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      justify-content: space-between;
      .title {
        font-size: @fz16;
        font-weight: 600;
        color: #000000;
      }
      .roption {
        display: flex;
        align-items: center;
        margin-right: 24px;
        .searchIn {
          width: 220px;
        }
      }
    }
  }
</style>
