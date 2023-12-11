<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-07-27 19:10:14
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :danger="selectedType === E_BatchOption.Parse"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('reinforce.batOptTadjk', [tableRef!.selectAllNumber]) }}
      {{ selectedType === E_BatchOption.Parse ? t('reinforce.ztrw') : t('reinforce.zx') }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, unref } from 'vue';
  import { useSelectAll } from '@/store/modules/select-all';
  import { batchBar } from '@/components/batch-bar';
  import { E_BatchOption, E_Task_State, I_Task_Filter } from '../../type';
  import { batchDeleteTask, batchHandleTask } from '@/api/reinforce';
  import { useModal, useValidatePwd } from '@/hooks';
  import { pwdConfirm } from '@/components/pwdConfirm';
  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    selectedType: Number as PropType<E_BatchOption>,
    tableRef: Object,
    agms: {
      type: Object as PropType<I_Task_Filter>,
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

    if (props.selectedType === E_BatchOption.Delete) {
      useModal(
        {
          title: t('reinforce.delrww'),
          contentProps: {
            labelText: t('reinforce.delrwwsub'),
          },
          handleOk: async (conRef) => {
            await conRef.validate();
            return useValidatePwd(
              batchDeleteTask,
              {
                is_all: false,
                filter: props.agms,
                task_id_list: sendKesArr,
              },
              conRef,
              props.refreshTable,
            );
          },
        },
        pwdConfirm,
      );
    } else {
      const sendObj = {
        filter: props.agms,
        is_all: unref(isSelectAll),
        task_id_list: sendKesArr,
        status: 0,
      };
      //批量api
      switch (props.selectedType) {
        case E_BatchOption.Parse:
          sendObj.status = E_Task_State.Parse;
          break;
        case E_BatchOption.Run:
          sendObj.status = E_Task_State.Runing;
          break;
      }
      await batchHandleTask(sendObj);
      props.refreshTable!();
    }
  };
</script>

<style scoped></style>
