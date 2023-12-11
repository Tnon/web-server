<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-03-13 17:29:24
-->
<template>
  <div class="userContainer">
    <div class="header">
      <span class="title">{{ t('reinforce.result_count') }}</span>
      <!-- 高级筛选 start -->
      <advanSearch class="filters" :params="agms" @confirm="btnConfirm" />
      <!-- 高级筛选 end -->
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 314px)' }"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getBaselineOverview"
    >
      <template #headerCellcustom="{ column }">
        <template v-if="column.dataIndex === 'pass_percent'">
          <passPercentTips />
        </template>
      </template>
    </slots-table>
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getBaselineOverview } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import advanSearch from './cmts/advanSearch';
  import { I_BaseLine_Filter } from './type';
  import passPercentTips from '../passPercentTips';
  const { t } = useI18n();
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //搜索数据源
  const agms = reactive<I_BaseLine_Filter>({
    //任务名称
    task_name: '',
    //任务创建人
    create_user: undefined,
    //时间范围
    date_range: '',
    //基线规则
    baseline_rule: '',
    //检查范围(主机组)
    host_group: '',
    //检查范围（主机）
    host_list: [],
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  const columns = useColumns(t);

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      .title {
        font-size: @fz14;
        font-weight: 600;
        color: #000000;
      }
      .filters {
        position: relative;
        .flag {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          right: -10px;
          background: #18ba79;
        }
      }
    }
  }
</style>
