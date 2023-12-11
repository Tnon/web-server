<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-28 19:53:14
 * @LastEditTime: 2023-02-06 10:29:07
-->
<template>
  <a-row :gutter="16" class="alarmRow">
    <a-col :span="24 / typeList.length" v-for="item in typeList" :key="item">
      <!-- <chart-table :usageType="item" :usageColor="colorList[index]" /> -->
      <div class="alarmItem">
        <!-- 头部标题 start -->
        <div class="alarmTitle">{{ t(`asset.${item}`) + t('asset.highUsageAlarm') }}</div>
        <!-- 头部标题 end -->

        <!-- 表格内容 start -->
        <!-- :scroll="{ y: 'calc(100vh - 223px)' }" -->
        <slots-table
          ref="tableRef"
          row-key="id"
          :columns="useColumns(t, item)"
          :arguments="{ type: usageEnum[item] }"
          :get-list-func="getResourceAlarmOverview"
          :scroll="{ y: '480px' }"
          :page-option="{ size: 'small' }"
        />
        <!-- 表格内容 end -->
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { usageTypeColor } from '@/enums/assetsType';
  import { usageEnum } from '@/enums/assetsType';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './index';
  import { getResourceAlarmOverview } from '@/api/asset/overview';

  const { t } = useI18n();
  // const columns = useColumns(t);
  // const usageType = ['CPU', 'memory', 'disk'];
  const typeList = ref<string[]>([]);

  // 得到使用率类型列表及对应的颜色列表
  usageTypeColor.forEach((item) => {
    const tempList = item.split('|');
    typeList.value.push(tempList[0]);
  });
</script>
<style lang="less" scoped>
  .alarmRow {
    margin-top: 16px;
  }
  .alarmItem {
    height: 650px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    .alarmTitle {
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin: 12px 0 20px 16px;
    }
  }
</style>
