<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:01:59
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- title start -->
      <switch-nodes
        class="swthead"
        v-if="!isCheck"
        v-model:actived="agms.handle"
        size="small"
        :types="FTypes"
      />
      <!-- title end -->
      <!-- 批量条 start -->
      <batch-bar
        class="batbar"
        v-if="isCheck"
        :selectedType="boxType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
      />
      <!-- 批量条 end -->
      <!-- 批量删除 end -->
      <div class="tools">
        <!-- 批量管理 start -->
        <batch-manage
          v-model:boxType="boxType"
          v-model:isCheck="isCheck"
          @refreshTable="refreshTable"
          :title="agms.handle === HandleType.HANDLED ? t('reinforce.handrw') : t('reinforce.handr')"
        >
          {{ t('common.batchOpt') }}
        </batch-manage>
        <!-- 批量管理 end -->

        <!-- 高级筛选 start -->
        <div class="filterContainer">
          <!-- 高级筛选 start -->
          <advanSearch class="filters" :params="agms" @confirm="btnConfirm" />
          <!-- 高级筛选 end -->
        </div>

        <!-- 高级筛选 end -->

        <div class="line"></div>
        <!-- 导出 start -->
        <export-data api="/api/report/virpatchinfo" :params="agms" class="exportIc" />
        <!-- 导出 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 307px)' }"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getVirPatchList"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive, watch } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getVirPatchList } from '@/api/reinforce';
  import { useColumns, FTypes } from './index';
  import batchManage from './cmts/batchManage';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import batchBar from './cmts/batchBar';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanSearch from './cmts/advanSearch';
  import switchNodes from '@/components/switchNodes';
  import { HandleType, I_Vrl_patch_Filter } from './type';

  const { t } = useI18n();
  const boxType = ref('');
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //全选
  const isCheck = ref<boolean>(false);
  //搜索数据源
  const agms = reactive<I_Vrl_patch_Filter>({
    //处理类型
    handle: HandleType.UNHANDLE,
    //防护状态
    handled: undefined,
    //虚拟补丁
    vrl_patch_code: '',
    //利用漏洞
    vrl_code: '',
    // 影响主机
    ip_list: '',
    //主机分组
    group_list: '',
    //攻击源
    risk_src_list: '',
    //时间范围
    date_range: '',
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    initRowSelection();
  };
  let columns = ref(useColumns(t, refreshTable, agms.handle));
  watch(
    () => agms.handle,
    () => {
      refreshTable();
      boxType.value = '';
      columns.value = useColumns(t, refreshTable, agms.handle) as any;
    },
  );

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };
  //清空选择
  watch(isCheck, (v) => {
    if (!v) {
      boxType.value = '';
    }
  });
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
      padding: 0 16px 13px 16px;
      .swthead {
        :deep(.smallS) {
          padding: 2px 12px;
        }
        :deep(.actived) {
          background-color: #fff;
        }
        background: rgba(0, 0, 0, 0.08);
      }
      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mark {
          margin: 0 16px;
        }
        .search {
          width: 220px;
          margin-right: 16px;
        }
      }
    }
  }
  .batbar {
    flex: 1;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 16px;
    margin-right: 16px;
  }
  .exportIc {
    cursor: pointer;
  }
  .line {
    width: 1px;
    height: 16px;
    background: #e1e1e1;
    margin-right: 16px;
  }
  .filterContainer {
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
</style>
