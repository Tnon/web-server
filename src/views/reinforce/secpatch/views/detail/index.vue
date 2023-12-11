<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-15 12:56:36
 * @LastEditTime: 2023-04-27 18:07:07
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
      :get-list-func="getPatchDetial"
    />

    <!-- 表格 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import secpatchHead from './cmts/secPatchHead';
  import { getPatchDetial } from '@/api/reinforce';
  import { useColumns } from '.';
  import { SlotsTable } from '@/components/slots-table';
  import { useRoute } from 'vue-router';

  const { t } = useI18n();
  // 跳转携带参数
  const {
    query: { patch_id },
  } = useRoute() as any;
  //table dom
  const tableRef: any = ref<HTMLElement>();
  // 表格结构体
  const agms = reactive({
    searchdata: '',
    patch_id: ~~patch_id,
  });
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
  };

  //主机数量
  const patchCount = ref(0);

  //表格列
  const columns = useColumns(t, ~~patch_id);
</script>

<style scoped lang="less">
  .secContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
