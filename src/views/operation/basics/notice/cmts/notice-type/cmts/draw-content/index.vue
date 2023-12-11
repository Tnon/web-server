<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 21:52:32
 * @LastEditTime: 2023-07-18 14:45:19
-->
<template>
  <div class="drawCon">
    <div class="header">
      <div class="text">{{ t('operation.jsrsz') }}</div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 48px)' }"
      ref="tableRef"
      :page-option="{ size: 'small', showSizeChanger: false }"
      :columns="columns"
      row-key="id"
      :arguments="{}"
      :get-list-func="getAcceptList"
    />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from '.';
  import { ref } from 'vue';
  import { getAcceptList } from '@/api/operation/notice';
  import { E_NoticeType } from '../../type';
  const props = defineProps<{ noticeType: E_NoticeType; getSmsEmailCfg: Fn }>();
  const { t } = useI18n();
  //table
  const tableRef: any = ref<HTMLElement>();
  const columns = useColumns(t, props.noticeType, props.getSmsEmailCfg);
</script>

<style scoped lang="less">
  .drawCon {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      .text {
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
</style>
