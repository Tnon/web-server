<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 10:20:48
 * @LastEditTime: 2022-08-18 15:00:25
-->
<template>
  <div>
    <div class="btnContainer">
      <export-data
        :showLoading="false"
        api="/api/report/activation/host_uninstalled_agent_list"
        :params="{}"
      >
        <template #default="{ loading }">
          <a-button class="expbtn" :loading="!loading">
            <template #icon>
              <vertical-align-bottom-outlined />
            </template>
            {{ t('operation.exportList') }}
          </a-button>
        </template>
      </export-data>
    </div>
    <slots-table
      :scroll="{ y: '600px' }"
      row-key="host_id"
      :getListFunc="getUninstallList"
      :columns="columns"
    />
  </div>
</template>

<script setup lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { getUninstallList } from '@/api/operation/run';
  import { useI18n } from 'vue-i18n';
  import { useColumns } from '.';
  import { VerticalAlignBottomOutlined } from '@ant-design/icons-vue';
  import exportData from '@/components/exportData';
  const { t } = useI18n();
  //表格列
  const columns = useColumns(t);
</script>

<style lang="less" scoped>
  .btnContainer {
    position: absolute;
    top: 8px;
    right: 44px;
  }
</style>
