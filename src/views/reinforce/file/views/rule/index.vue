<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:01:52
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 返回 start -->
      <div class="backtext" @click="goBack">
        <LeftOutlined class="back" />
        {{ t('reinforce.monitored_rule') }}：
        <countTo :endVal="totalNum" />
      </div>
      <!-- 返回 end -->
      <!-- 批量条 start -->
      <batch-bar
        v-if="isCheck"
        class="bar"
        :selectedType="boxType"
        v-model:isCheck="isCheck"
        :tableRef="tableRef"
        :agms="agms"
        :refreshTable="refreshTable"
      />
      <!-- 批量条 end -->
      <div class="tools">
        <div
          v-permission="{
            name: 'baseLineAction',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
        >
          <!-- 批量管理 start -->
          <batch-manage
            v-model:boxType="boxType"
            v-model:isCheck="isCheck"
            v-model:canSelectApi="canSelectApi"
            v-model:disabledKeys="disabledKeys"
            @refreshTable="refreshTable"
          >
            {{ t('common.batchOpt') }}
          </batch-manage>
          <!-- 批量管理 end -->
        </div>

        <!-- 高级筛选 start -->
        <div class="filterContainer">
          <!-- 高级筛选 start -->
          <advanSearch class="filters" :params="agms" @confirm="btnConfirm" />
          <!-- 高级筛选 end -->
        </div>

        <!-- 高级筛选 end -->
        <!-- 切换视图 start -->
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon><WalletOutlined /></template>
          {{ t('asset.swtView') }}
        </a-button>
        <!-- 切换视图 end -->
        <!-- 新建规则 start -->
        <a-button
          type="primary"
          class="newAdd"
          v-permission="{
            name: 'baseLineRuleAdd',
            showUsers: [USERTOKEN.admin, USERTOKEN.super],
          }"
          @click="addNewRule"
        >
          <template #icon>
            <plus-outlined />
          </template>
          {{ t('reinforce.newrule') }}
        </a-button>
        <!-- 新建规则 end -->

        <div class="line"></div>
        <!-- 导出 start -->
        <export-data api="/api/report/fmrulelist" :params="agms" class="exportIc" />
        <!-- 导出 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 184px)' }"
      :isCheck="isCheck"
      v-model:total-num="totalNum"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :disabledKeys="disabledKeys"
      :get-list-func="getBlRuleList"
      :get-can-select-func="canSelectApi"
    />
  </div>
</template>

<script lang="ts" setup>
  import { USERTOKEN } from '@/store/modules/user/type';
  import { unref, ref, reactive, watch } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getBlRuleList } from '@/api/reinforce';
  import { useColumns } from './index';
  import batchManage from './cmts/batchManage';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanSearch from './cmts/advanSearch';
  import { LeftOutlined, PlusOutlined, WalletOutlined } from '@ant-design/icons-vue';
  import { E_BatchOption, I_Rule_Filter } from './type';
  import { useRouter, useRoute } from 'vue-router';
  import batchBar from './cmts/batchBar';

  const { t } = useI18n();
  // 跳转携带参数
  const {
    query: { rule_type },
  } = useRoute() as any;
  //全选数量API
  const canSelectApi = ref<Fn>();
  //规则总数
  const totalNum = ref(0);
  const router = useRouter();
  const boxType = ref<E_BatchOption>(E_BatchOption.None);
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //禁选
  const disabledKeys = ref<any>([]);
  //全选
  const isCheck = ref<boolean>(false);
  //搜索数据源
  const agms = reactive<I_Rule_Filter>({
    rule_name: '', // "规则1"
    file_path: '', // "/bin/bash"
    proc_exclude: '', // "bash"
    host_group: '', // "2,3,5,7"
    ip_list: '', // "ip1,ip2,ip3"
    enabled: undefined, // 1: 启用; 2: 禁用
    alarm_level: undefined, // 1: 低危; 2: 中危; 3: 高危
    rule_type: rule_type ? ~~rule_type : undefined, // 1: 预置; 2: 自定义
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    initRowSelection();
  };
  const columns = useColumns(t, refreshTable);

  //筛选条件确定
  const btnConfirm = (v) => {
    Object.assign(agms, v);
    refreshTable();
  };
  //返回
  const goBack = () => {
    router.push({
      name: 'reinforce-layout-file-index',
    });
  };
  //清空选择
  watch(isCheck, (v) => {
    if (!v) {
      boxType.value = E_BatchOption.None;
    }
  });

  //新增规则
  const addNewRule = () => {
    router.push({
      name: 'reinforce-layout-file-form',
    });
  };
  //切换视图
  const switchView = () => {
    router.push({
      name: 'reinforce-layout-file-host',
    });
  };
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: rgba(0, 0, 0, 0.04);

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      .backtext {
        display: flex;
        align-items: center;
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        .back {
          margin-right: 8px;
        }
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
        .newAdd {
          margin-left: 16px;
        }
      }
    }
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
    margin: 0 8px;
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
  .bar {
    margin: 0 16px;
  }
</style>
