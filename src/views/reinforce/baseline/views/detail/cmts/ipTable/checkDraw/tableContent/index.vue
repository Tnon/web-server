<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-03-14 18:57:26
-->
<template>
  <div class="userContainer">
    <div class="header">
      <span class="title">{{ t('reinforce.jcx') }}： <countTo :endVal="totalNum" /></span>

      <div class="rightOp">
        <!-- 高级筛选 start -->
        <advanSearch class="filters" :params="agms" @confirm="btnConfirm" :rule_code="rule_code" />
        <!-- 高级筛选 end -->
        <slot name="switch"></slot>
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 377px)' }"
      v-model:total-num="totalNum"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getRuipList"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getRuipList } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import advanSearch from './advanSearch';
  import { I_Check_Filter } from './type';
  const props = defineProps({
    session_id: {
      type: Number,
      required: true,
    },
    mac: {
      type: String,
      required: true,
    },
    rule_code: {
      type: String,
      required: true,
    },
  });
  const totalNum = ref(0);
  const { t } = useI18n();
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //搜索数据源
  const agms = reactive<I_Check_Filter & { session_id: number; mac: string }>({
    check_name: '',
    //检查项类别
    check_type: undefined,
    //检查结果
    check_result: undefined,
    session_id: props.session_id,
    mac: props.mac,
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };
  const columns = useColumns(t, props.session_id, props.mac);

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
