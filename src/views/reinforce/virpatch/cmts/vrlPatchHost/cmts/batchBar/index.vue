<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-06-05 09:46:39
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('operation.batOpt', [tableRef!.selectAllNumber]) }}
      {{
        selectedType === 'stop'
          ? t('reinforce.tzjc')
          : selectedType === 'start'
          ? t('reinforce.jcsb')
          : t('reinforce.ljfh')
      }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, unref } from 'vue';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { useSelectAll } from '@/store/modules/select-all';
  import { batchBar } from '@/components/batch-bar';
  import { switchFileMdode } from '@/api/reinforce';
  import { E_Mode_Action } from '../fileActionMode/type';
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
  //批量处理确定
  const batchHandle = async () => {
    //批量处理程序
    const sendKesArr = unref(isSelectAll)
      ? unref(excludeRowKeys)
      : unref(props.tableRef!).rowSelection.selectedRowKeys;

    const { code } = await switchFileMdode({
      is_all: unref(isSelectAll),
      hostidlist: sendKesArr,
      filter: props.agms,
      set_status:
        props.selectedType === 'stop'
          ? E_Mode_Action.StopMonitor
          : props.selectedType === 'start'
          ? E_Mode_Action.Monitor
          : E_Mode_Action.Inject,
    });
    initRowSelection();
    !code && props.refreshTable!();
  };
</script>

<style scoped></style>
