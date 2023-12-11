<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:57:47
 * @LastEditTime: 2023-01-13 11:15:51
-->
<template>
  <slots-table
    class="box"
    ref="tableRef"
    :scroll="{ y: '500px' }"
    v-model:columns="columns"
    row-key="id"
    :get-list-func="getGroupHostList"
    :arguments="{ id, status, policy_type }"
  />
</template>

<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from '.';
  import { getGroupHostList } from '@/api/strategy/asset';
  import { useI18n } from 'vue-i18n';
  import { PropType } from 'vue';
  import { PLIAPPSTATUS } from '@/enums/pstatus';
  import { StrategyType } from '@/views/strategy/common/types';
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    showDraw: Function,
    status: Number as PropType<PLIAPPSTATUS>,
    policy_type: Number as PropType<StrategyType>,
  });
  const { t } = useI18n();

  //列
  const columns = useColumns(t, props.showDraw!);
</script>

<style lang="less" scoped>
  .box {
    display: flex;
    flex-direction: column;
    :deep(.ant-table-thead > tr > th) {
      height: 40px;
    }
  }
</style>
