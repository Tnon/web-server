<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 14:24:20
 * @LastEditTime: 2023-07-04 17:13:02
-->
<template>
  <div class="leftTable">
    <!-- 基础信息 start -->
    <div class="basicInfo">
      <div class="node">
        <p>{{ recourceInfo.rate }}</p>
        <h3>{{ rates[recourceInfo.ratePercent] }}</h3>
      </div>
      <div class="node">
        <p>{{ recourceInfo.size }}</p>
        <h3>{{ rates[recourceInfo.num] }}</h3>
      </div>
    </div>
    <!-- 基础信息 end -->
    <!-- 表格 start -->
    <div class="tableBox">
      <div class="tableTitle">{{ t(`asset.${recourceType}`) + t('asset.highUsageAlarm') }}</div>
      <!-- 表格内容 start -->
      <!-- :scroll="{ y: 'calc(100vh - 223px)' }" -->
      <slots-table
        ref="tableRef"
        row-key="id"
        :columns="useColumns(t, recourceType)"
        :page-option="{ simple: true }"
        :arguments="argms"
        :get-list-func="getResourceAlarm"
        :scroll="{ y: '200px' }"
      />
      <!-- 表格内容 end -->
    </div>
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { option } from '../../type';
  import { useColumns } from './index';
  import { getResourceAlarm } from '@/api/asset/hostInfo/host';

  const props = defineProps({
    rates: {
      type: Object,
      required: true,
    },
    recourceInfo: {
      type: Object as PropType<option>,
      required: true,
    },
    recourceType: {
      type: String,
      required: true,
    },
    argms: {
      type: Object,
      required: true,
    },
  });

  const { t } = useI18n();
  // // 表头配置项
  // const columns = useColumns(t);
  //获取元素
  const tableRef = ref<any>(null);
  //抛出一个刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    tableRef.value.refreshTableData(keepPage);
  };
  //监听所有的条件 刷新表格
  watch(
    props.argms,
    () => {
      refreshTable();
    },
    {
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .leftTable {
    display: flex;
    flex-direction: column;
  }
  .basicInfo {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .node {
      flex: 1;
      p {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 5px;
      }
      h3 {
        font-size: @fz18;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  .tableBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    .tableTitle {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 12px;
    }
  }
</style>
