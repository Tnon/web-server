<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 14:33:43
 * @LastEditTime: 2023-03-24 14:08:15
-->
<template>
  <div>
    <div class="title">{{ title }}： <countTo :endVal="totalNum" /></div>
    <div class="desc">{{ desc }}</div>
    <slots-table
      class="tablecon"
      :scroll="{ y: '400px' }"
      v-model:total-num="totalNum"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="{ session_id, rule_code }"
      :get-list-func="tableApi"
    />
  </div>
</template>

<script setup lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import { ref, PropType } from 'vue';
  defineProps({
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    session_id: {
      type: Number,
      // required: true,
    },
    tableApi: {
      type: Function as PropType<any>,
      required: true,
    },
    rule_code: String,
  });
  const { t } = useI18n();
  const totalNum = ref(0);
  const columns = useColumns(t);
</script>

<style scoped lang="less">
  .title {
    font-size: @fz16;
    margin: 12px 0;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-weight: 600;
    color: #000000;
  }

  .desc {
    margin: 12px 0 16px 0;
    font-size: @fz12;
    color: rgba(0, 0, 0, 0.5);
    padding: 0 16px;
  }
  .tablecon {
    padding: 0 16px;
  }
</style>
