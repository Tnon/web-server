<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 22:43:49
 * @LastEditTime: 2023-07-31 20:30:06
-->
<template>
  <div class="reportContainer">
    <!-- 头部 start -->
    <div class="header">
      <span class="info">
        <QuestionCircleOutlined class="icon" />
        {{ t('report.reportInfo') }}
      </span>
    </div>
    <!-- 头部 end -->

    <!-- 表格内容 start -->
    <slots-table
      :columns="columns"
      :scroll="{ y: 'calc(100vh - 223px)' }"
      row-key="id"
      :get-list-func="getReportDataListApi"
      ref="tableRef"
    />
    <!-- 表格内容 end -->
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './index';
  import { getReportDataListApi } from '@/api/report';

  const { t } = useI18n();
  const tableRef = ref();
  // 表头配置项
  const columns = useColumns(t);
  //刷新表格的方法
  const refreshTable = (keepPage, silice) => {
    unref(tableRef).refreshTableData(keepPage, silice);
  };
  //轮训刷新表格
  let timer: any;
  timer = setInterval(() => {
    refreshTable(true, true);
  }, 5000);
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style lang="less" scoped>
  .reportContainer {
    height: calc(100vh - 48px);
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      align-items: center;
      // justify-content: flex-end;
      flex: 0 0 48px;
      padding: 0 16px;
      .title {
        font-weight: 700;
        font-size: @fz14;
      }
      .info {
        font-size: @fz12;
        color: rgb(255, 187, 0);
        .icon {
          padding-right: 5px;
          font-size: @fz18;
        }
      }
    }
  }
</style>
