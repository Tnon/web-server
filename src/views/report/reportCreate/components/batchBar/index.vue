<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 16:47:03
 * @LastEditTime: 2023-07-27 19:10:33
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('report.batchSelected', [tableRef!.selectAllNumber]) }}
      {{ t(`report.${selectedType}`) }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, unref } from 'vue';
  import { useSelectAll } from '@/store/modules/select-all';
  import { batchBar } from '@/components/batch-bar';
  import { batchDeleteReportTask, batchChangeTaskStatus } from '@/api/report';
  import { TaskStatus } from '@/enums/reportType';

  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    selectedType: String,
    tableRef: Object,
    agms: Object,
    refreshTable: Function,
  });
  const emit = defineEmits(['update:isCheck']);
  //ischeck中间态
  const isCheckCmp = computed({
    get: () => props.isCheck,
    set: (v) => emit('update:isCheck', v),
  });
  const selectAllStore = useSelectAll();
  //获取全局是否全选
  const isSelectAll = computed(() => selectAllStore.isSelectAll);

  //获取取消选择的ids
  const excludeRowKeys: any = computed(() => selectAllStore.exclude);

  // 批量处理确定
  const batchHandle = async () => {
    //批量处理程序
    const sendKesArr = unref(isSelectAll)
      ? unref(excludeRowKeys)
      : unref(props.tableRef!).rowSelection.selectedRowKeys;
    const sendObj: any = {};
    // 构造接口参数
    if (unref(isSelectAll)) {
      sendObj.filter = props.agms;
      sendObj.exclude_list = sendKesArr.join(',');
      sendObj.include_list = '';
      sendObj.is_all = true;
    } else {
      sendObj.filter = {};
      sendObj.exclude_list = '';
      sendObj.include_list = sendKesArr.join(',');
      sendObj.is_all = false;
    }
    // 根据不同的批量操作，调不同的接口
    if (props.selectedType === 'delete') {
      const { code } = await batchDeleteReportTask(sendObj);
      !code && props.refreshTable!();
    } else if (props.selectedType === 'execute') {
      const { code } = await batchChangeTaskStatus({
        ...sendObj,
        status: TaskStatus.executing,
      });
      !code && props.refreshTable!();
    } else {
      const { code } = await batchChangeTaskStatus({
        ...sendObj,
        status: TaskStatus.suspending,
      });
      !code && props.refreshTable!();
    }
  };
</script>

<style scoped></style>
