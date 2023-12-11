<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:01:25
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- 返回 start -->
      <div class="backtext" @click="goBack">
        <LeftOutlined class="back" />
        {{ t('reinforce.jkzj') }}：
        <countTo :endVal="totalNum" />
      </div>
      <!-- 返回 end -->
      <div class="tools">
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
        <div class="line"></div>
        <!-- 导出 start -->
        <export-data api="/api/report/dfrulehostlist" :params="agms" class="exportIc" />
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
      :get-list-func="getBlRuleHostListDf"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getBlRuleHostListDf } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanSearch from './cmts/advanSearch';
  import { LeftOutlined, WalletOutlined } from '@ant-design/icons-vue';
  import { I_Host_Filter } from './type';
  import { useRouter } from 'vue-router';

  const { t } = useI18n();
  const totalNum = ref(0);
  const router = useRouter();
  //table dom
  const tableRef: any = ref<HTMLElement>();
  //禁选
  const disabledKeys = ref<any>([]);
  //全选
  const isCheck = ref<boolean>(false);
  //搜索数据源
  const agms = reactive<I_Host_Filter>({
    host_group: '', // "2,3,5,7"
    ip_list: '', // "ip1,ip2,ip3"
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
  //返回
  const goBack = () => {
    router.push({
      name: 'reinforce-layout-bait-index',
    });
  };

  const switchView = () => {
    router.push({
      name: 'reinforce-layout-bait-rule',
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
  .swt_view {
    margin-left: 8px;
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
