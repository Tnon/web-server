<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-06-29 14:33:54
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('operation.batOpt', [tableRef!.selectAllNumber]) }}
      {{ selectedType === 'agent' ? t('operation.batUpagt') : t('operation.batDriver') }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, ref, unref } from 'vue';
  import { batchUpgradeAgent, batchAdapDriver } from '@/api/operation/upgrade';
  import { useSelectAll } from '@/store/modules/select-all';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useModal } from '@/hooks';
  import { batchBar } from '@/components/batch-bar';
  import { useValidatePwd } from '@/hooks/use-validatepwd';
  import { getErrAgentIps } from '@/api/operation/run';
  import { E_Operation_Type } from '@/enums/assetsType';
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
    const errIps = ref([]);
    if (props.selectedType === 'driver') {
      const { code, items } = await getErrAgentIps(
        Object.assign({}, sendObj, { type: E_Operation_Type.DRIVER }),
      );
      if (!code) {
        errIps.value = items ?? [];
      }
    }
    //批量升级agent或批量更新安全驱动
    useModal(
      {
        title: props.selectedType === 'agent' ? t('operation.surbatagt') : t('operation.surbateng'),
        contentProps: {
          labelText:
            props.selectedType === 'agent'
              ? t('operation.surbatagtnum', [unref(props.tableRef!).selectAllNumber])
              : unref(errIps).length
              ? unref(errIps).length === 1
                ? t('operation.drvsip', [unref(errIps)[0]])
                : t('operation.drvsips', [unref(errIps)[0], unref(errIps).length])
              : '', //t('operation.surbatengnum', [unref(props.tableRef!).selectAllNumber]),
        },
        width: 600,
        handleOk: async (conRef) => {
          await conRef.validate();

          return useValidatePwd(
            props.selectedType === 'agent' ? batchUpgradeAgent : batchAdapDriver,
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
