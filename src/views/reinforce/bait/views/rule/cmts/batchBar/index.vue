<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-07-27 19:10:04
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :danger="selectedType === E_BatchOption.Delete"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('reinforce.batOpt', [tableRef!.selectAllNumber]) }}
      {{ t('reinforce.action' + selectedType) }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, unref } from 'vue';
  import { useSelectAll } from '@/store/modules/select-all';
  import { batchBar } from '@/components/batch-bar';
  import { E_BatchOption, E_Enabled, I_Rule_Filter } from '../../type';
  import { delBlRuleDf, switchRuleDf } from '@/api/reinforce';
  import { useModal, useValidatePwd } from '@/hooks';
  import { pwdConfirm } from '@/components/pwdConfirm';
  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    selectedType: String as PropType<E_BatchOption>,
    tableRef: Object,
    agms: {
      type: Object as PropType<I_Rule_Filter>,
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

    //批量api
    if (props.selectedType === E_BatchOption.Delete) {
      useModal(
        {
          title: t('reinforce.actiondelete'),
          contentProps: {
            labelText: t('reinforce.delrwwsuba'),
          },
          handleOk: async (conRef) => {
            await conRef.validate();
            return useValidatePwd(
              delBlRuleDf,
              {
                is_all: unref(isSelectAll),
                filter: props.agms,
                id_list: sendKesArr,
              },
              conRef,
              props.refreshTable,
            );
          },
        },
        pwdConfirm,
      );
    } else {
      const { code } = await switchRuleDf({
        filter: props.agms,
        is_all: unref(isSelectAll),
        id_list: sendKesArr,
        switch: props.selectedType === E_BatchOption.Close ? E_Enabled.Close : E_Enabled.Open,
      });
      if (!code) {
        props.refreshTable!();
      }
    }
  };
</script>

<style scoped></style>
