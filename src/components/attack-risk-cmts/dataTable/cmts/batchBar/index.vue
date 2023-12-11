<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-07-27 19:08:45
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('arcomn.'+(source === MODELTYPE.ATTACK ? 'batAttack' : 'batNgav'), [tableRef!.selectAllNumber]) }}
      {{ t('arcomn.' + selectedType) }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, unref } from 'vue';
  import { useSelectAll } from '@/store/modules/select-all';
  import { batchBar } from '@/components/batch-bar';
  import { BatchOption } from '../../type';
  import { batchHandleApi } from '@/api/attack_risk';
  import { useBatchMark, useModal } from '@/hooks';
  import batchMarks from '@/components/attack-risk-cmts/batchMarks';
  import { AttackHandleRecord, AttackTableparams } from '@/api/attack_risk/model';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    selectedType: String as PropType<BatchOption>,
    tableRef: Object,
    agms: {
      type: Object as PropType<AttackTableparams>,
      required: true,
    },
    refreshTable: Function,
    source: {
      type: Number as PropType<MODELTYPE>,
      required: true,
    },
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
    const sendObj: AttackHandleRecord = {
      filter: props.agms,
      isall: unref(isSelectAll),
      riskinfolist: sendKesArr,
      set_handle: HANDLETYPE.INIT, //初始化
      set_note: '',
    };
    //批量api
    // if (props.selectedType === BatchOption.Ignore) {
    // }else if()
    switch (props.selectedType) {
      case BatchOption.Ignore:
        sendObj.set_handle = HANDLETYPE.IGNORE;
        break;
      case BatchOption.Confirm:
        sendObj.set_handle = HANDLETYPE.CONFIRM;
        break;
      case BatchOption.Handling:
        sendObj.set_handle = HANDLETYPE.HANDLING;
        break;
      case BatchOption.Reopen:
        sendObj.set_handle = HANDLETYPE.UNHANDLE;
        break;
    }
    //填写批注
    useModal(
      {
        title: t('arcomn.title' + props.selectedType),
        handleOk: async (conRef) => {
          await conRef.validate();
          return useBatchMark(batchHandleApi, sendObj, conRef, props.refreshTable);
        },
      },
      batchMarks,
    );
  };
</script>

<style scoped></style>
