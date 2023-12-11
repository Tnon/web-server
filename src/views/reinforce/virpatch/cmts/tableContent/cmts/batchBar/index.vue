<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-07-27 19:10:30
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{
        agms.handle === HandleType.HANDLED
          ? t('reinforce.btcl', [tableRef!.selectAllNumber])
          : t('reinforce.btwcl', [tableRef!.selectAllNumber])
      }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, unref } from 'vue';
  import { useSelectAll } from '@/store/modules/select-all';
  import { batchBar } from '@/components/batch-bar';
  import { batchHandlePatch } from '@/api/reinforce';
  import { HandleType, I_Vrl_patch_Filter } from '../../type';
  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    selectedType: String,
    tableRef: Object,
    agms: {
      type: Object as PropType<I_Vrl_patch_Filter>,
      required: true,
    },
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

    // const sendObj: AttackHandleRecord = {};
    const sendObj = {
      filter: props.agms,
      isall: unref(isSelectAll),
      riskinfolist: sendKesArr,
      set_handle:
        props.agms.handle === HandleType.HANDLED ? HandleType.UNHANDLE : HandleType.HANDLED, //初始化
    };

    await batchHandlePatch(sendObj);
    props.refreshTable!();
  };
</script>

<style scoped></style>
