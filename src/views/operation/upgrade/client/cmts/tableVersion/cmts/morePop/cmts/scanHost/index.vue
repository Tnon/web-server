<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-18 15:26:42
 * @LastEditTime: 2023-08-16 17:18:22
-->
<template>
  <div class="container">
    <div class="header">
      <!-- 头部标题 start -->
      <div class="left">
        <div class="title">{{ t('operation.zjfx') }}</div>
        <div class="subtitle">{{ t('operation.zjfxsub') }}</div>
      </div>
      <!-- 头部标题 end -->
      <div class="right">
        <a-input-search
          v-model:value.trim="agms.found_ip"
          :placeholder="t('operation.attPlace')"
          class="searchIn"
          @search="onSearch"
          @change="onSearch"
        />
        <!-- 下载 start -->
        <export-data api="/api/report/host_found/list" :params="agms">
          <a-button type="text">
            <template #icon>
              <custom-icon type="#ax-Download" />
            </template>
            <span>{{ t('common.download') }}</span>
          </a-button>
        </export-data>
        <!-- 下载 start -->

        <!-- 扫描 start -->
        <a-button
          type="text"
          @click="openScanDraw"
          :loading="scanStatus === E_ScanStatus.Prepare || scanStatus === E_ScanStatus.Scaning"
        >
          <template #icon>
            <security-scan-outlined />
          </template>
          <span>{{
            scanStatus === E_ScanStatus.Prepare || scanStatus === E_ScanStatus.Scaning
              ? t('operation.scaning')
              : scanStatus === E_ScanStatus.Error
              ? t('operation.rescan')
              : t('operation.scan')
          }}</span>
        </a-button>
        <!-- 扫描 start -->
      </div>
    </div>
    <div
      class="tips"
      :class="{ suc: scanStatus === E_ScanStatus.Success, err: scanStatus === E_ScanStatus.Error }"
      v-if="scanStatus === E_ScanStatus.Error || scanStatus === E_ScanStatus.Success"
    >
      <template v-if="scanStatus === E_ScanStatus.Error">
        <CloseCircleFilled />
        <span>{{ t('operation.smsb') }}</span>
      </template>
      <template v-else>
        <CheckCircleFilled />
        <span>{{ t('operation.smwc', [scanCount]) }}</span>
      </template>
    </div>
    <slots-table
      :scroll="{ y: '600px' }"
      ref="tableRef"
      @click="visiable = false"
      :columns="columns"
      row-key="mac"
      :arguments="agms"
      :get-list-func="getFindHostList"
    />

    <!-- 配置详情 start -->
    <scan-config
      :class="{ show: visiable }"
      v-model:visiable="visiable"
      @refreshStatus="refreshStatus"
    />
    <!-- 配置详情 end -->
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import {
    SecurityScanOutlined,
    CloseCircleFilled,
    CheckCircleFilled,
  } from '@ant-design/icons-vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getFindHostList } from '@/api/operation/upgrade';
  import { useColumns } from './index';
  import scanConfig from '../scanConfig';
  import { onMounted, onUnmounted, reactive, ref, unref } from 'vue';
  import { E_ScanStatus } from './type';
  import { getScanStatusApi } from '@/api/operation/notice';
  const { t } = useI18n();
  const columns = useColumns(t);
  const agms = reactive({
    found_ip: '',
  });
  const visiable = ref(false);
  const openScanDraw = () => {
    visiable.value = !visiable.value;
  };
  const tableRef = ref();
  const refreshTableData = () => {
    unref(tableRef).refreshTableData();
  };
  let timer: any = 0;
  //扫描状态
  const scanStatus = ref<E_ScanStatus>();
  //扫描数量
  const scanCount = ref(0);

  const getScanStatus = async () => {
    const { scan_status, scan_result_count, code } = await getScanStatusApi();
    if (code) {
      clearInterval(timer);
    } else {
      scanStatus.value = scan_status;
      scanCount.value = scan_result_count;
      if (
        scan_status === E_ScanStatus.Error ||
        scan_status === E_ScanStatus.Success ||
        scan_status === E_ScanStatus.Init
      ) {
        clearInterval(timer);
        refreshTableData();
      }
    }
  };
  getScanStatus();

  //轮训
  const getScanStatusInternal = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      getScanStatus();
    }, 4000);
  };
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTableData();
    }
    if (!value && !e) {
      refreshTableData();
    }
  };

  const refreshStatus = () => {
    getScanStatus();
    getScanStatusInternal();
  };
  onMounted(() => {
    getScanStatusInternal();
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style scoped lang="less">
  .container {
    position: relative;
    overflow: hidden;
    height: 800px;
    display: flex;
    flex-direction: column;
    .header {
      padding: 8px 56px 8px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      .left,
      .right {
        display: flex;
        align-items: center;
      }
      .searchIn {
        width: 220px;
      }
      .title {
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-right: 16px;
      }
      .subtitle {
        font-size: @fz12;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .tips {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: @fz13;
    }
    .suc {
      background: rgba(24, 186, 121, 0.1);
      color: @primary-color;
    }
    .err {
      background: rgba(247, 85, 85, 0.1);
      color: @danger-color;
    }
  }
</style>
