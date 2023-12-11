<!--
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-04-14 18:03:26
-->
<template>
  <div class="userContainer">
    <div class="header">
      <span class="title">{{ t('reinforce.zjs') }}： <countTo :endVal="totalNum" /></span>
      <div class="rightOp">
        <!-- 高级筛选 start -->
        <advanSearch class="filters" :params="agms" @confirm="btnConfirm" />
        <!-- 高级筛选 end -->
        <slot name="switch"></slot>
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 231px)' }"
      v-model:total-num="totalNum"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getCheckIpview"
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
  import { getCheckIpview } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import advanSearch from './advanSearch';
  import { I_Ip_Filter } from './type';
  import passPercentTips from '@/views/reinforce/baseline/cmts/passPercentTips';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    session_id: {
      type: Number,
      required: true,
    },
    rule_code: {
      type: String,
      required: true,
    },
    rule_name: {
      type: String,
      required: true,
    },
  });
  // 总览跳转携带参数
  const {
    query: { ip, group },
  } = useRoute() as any;
  const { t } = useI18n();
  const totalNum = ref(0);
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //搜索数据源
  const agms = reactive<I_Ip_Filter>({
    session_id: props.session_id,
    host_group: group ?? '',
    ip: ip ?? '',
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  const columns = useColumns(t, props.session_id, props.rule_code, props.rule_name);

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
      .rightOp {
        display: flex;
        align-items: center;
        :deep(.filters) {
          position: relative;
          margin-right: 16px;
        }
      }
    }
  }
</style>
