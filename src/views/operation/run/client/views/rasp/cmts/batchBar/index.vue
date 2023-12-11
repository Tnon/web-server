<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-07-27 19:09:47
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :danger="selectedType !== 'restart'"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('operation.batOpt', [tableRef!.selectAllNumber]) }}
      {{ selectedType === 'restart' ? t('operation.batReStart') : t('operation.batUnstall') }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, unref } from 'vue';
  import { batchReInjectRasp, batchReUninstallRasp } from '@/api/operation/run';
  import { useSelectAll } from '@/store/modules/select-all';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useModal, useValidatePwd } from '@/hooks';
  import { batchBar } from '@/components/batch-bar';
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
    const sendObj: any = {};

    if (unref(isSelectAll)) {
      sendObj.filter = props.agms;
      sendObj.exclude = sendKesArr.join(',');
      sendObj.include = '';
    } else {
      sendObj.filter = {};
      sendObj.exclude = '';
      sendObj.include = sendKesArr.join(',');
    }
    //批量升级
    useModal(
      {
        title: props.selectedType === 'restart' ? t('operation.reinjtit') : t('operation.runnjtit'),
        contentProps: {
          labelText: t('operation.reinjtitnum', [unref(props.tableRef!).selectAllNumber]),
        },
        width: 600,
        handleOk: async (conRef) => {
          await conRef.validate();

          return useValidatePwd(
            props.selectedType === 'restart' ? batchReInjectRasp : batchReUninstallRasp,
            sendObj,
            conRef,
            props.refreshTable,
            true,
          );
        },
      },
      pwdConfirm,
    );
  };
</script>

<style scoped></style>
