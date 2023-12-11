<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-27 16:05:02
 * @LastEditTime: 2023-04-27 16:43:58
-->
<template>
  <div class="secContainer">
    <!-- 头部 start -->
    <secpatch-head :agms="agms" :patchCount="patchCount" :refreshTable="refreshTable" />
    <!-- 头部 end -->
    <!-- 表格 start -->
    <slots-table
      :scroll="{ y: 'calc(100vh - 167px)' }"
      ref="tableRef"
      v-model:totalNum="patchCount"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getSecpatchOverview"
    />

    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { I_Sec_Filter } from './type';
  import secpatchHead from './cmts/secPatchHead';
  import { getSecpatchOverview } from '@/api/reinforce';
  import { useColumns } from '.';
  import { SlotsTable } from '@/components/slots-table';

  const { t } = useI18n();
  //table dom
  const tableRef: any = ref<HTMLElement>();
  // 表格结构体
  const agms = reactive<I_Sec_Filter>({
    searchdata: '',
    vul_level: '',
    vul_type_code: '',
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };

  //补丁数量
  const patchCount = ref(0);

  //表格列
  const columns = useColumns(t);
</script>

<style scoped lang="less">
  .secContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
