<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-03-14 18:54:21
-->
<template>
  <div class="userContainer">
    <div class="header">
      <span class="title">{{ t('reinforce.zjs') }}： <countTo :endVal="totalNum" /></span>
      <div class="rightOp">
        <!-- 高级筛选 start -->
        <advanSearch
          class="filters"
          :params="agms"
          :check_code="check_code"
          :session_id="session_id"
          @confirm="btnConfirm"
        />
        <!-- 高级筛选 end -->
        <slot name="switch"></slot>
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 446px)' }"
      ref="tableRef"
      v-model:total-num="totalNum"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getRucheckList"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getRucheckList } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import advanSearch from './advanSearch';
  import { I_Ip_Filter } from './type';
  const props = defineProps({
    check_code: {
      type: String,
      required: true,
    },
    session_id: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const totalNum = ref(0);
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //搜索数据源
  const agms = reactive<I_Ip_Filter & { check_code: string; session_id: number }>({
    host_group: '',
    ip: '',
    check_result: undefined,
    check_code: props.check_code,
    session_id: props.session_id,
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  const columns = useColumns(t, props.session_id, props.check_code);

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };
</script>
<style lang="less" scoped>
  .userContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
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
  }
</style>
