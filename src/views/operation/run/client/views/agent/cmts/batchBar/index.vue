<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 16:40:01
 * @LastEditTime: 2023-08-29 11:37:23
-->
<template>
  <batch-bar
    v-model:isCheck="isCheckCmp"
    :danger="selectedType === 'uninstall' || selectedType === 'stop'"
    :batch-api="batchHandle"
    :disabled="!tableRef!.selectAllNumber"
  >
    <template #title>
      {{ t('operation.batOpt', [tableRef!.selectAllNumber]) }}
      {{
        selectedType === 'uninstall'
          ? t('operation.batUnial')
          : selectedType === 'reset'
          ? t('operation.batRestart')
          : selectedType === 'start'
          ? t('operation.batStart')
          : selectedType === 'stop'
          ? t('operation.batStop')
          : selectedType === 'cpumem'
          ? t('operation.batsetcm')
          : selectedType === 'selectHost'
          ? t('operation.ggasde')
          : t('operation.batclear')
      }}
    </template>
  </batch-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, ref, unref } from 'vue';
  import { useSelectAll } from '@/store/modules/select-all';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useModal, useValidatePwd } from '@/hooks';
  import { batchBar } from '@/components/batch-bar';
  import {
    batchUninstallAgent,
    batchClearAbnormal,
    batchResetAgent,
    batchStartDriver,
    batchStopDriver,
    getErrAgentIps,
    setHostCpuMem,
    batchChangeShowIp,
  } from '@/api/operation/run';
  import { E_Operation_Type } from '@/enums/assetsType';
  import cpuMemFlag from '../cpuMemFlag';
  import pwdConfirmDriver from '@/components/pwdConfirmDriver';
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
    if (props.selectedType === 'uninstall') {
      const { code, items } = await getErrAgentIps(
        Object.assign({}, sendObj, { type: E_Operation_Type.AGENT }),
      );
      if (!code) {
        errIps.value = items ?? [];
      }
    }
    if (props.selectedType === 'cpumem') {
      useModal(
        {
          title: t('operation.setcpumemu'),
          handleOk: async (contRef) => {
            await contRef.validate();
            const { code } = await setHostCpuMem({
              cpu: contRef.cpu,
              memory: contRef.memory,
              ...sendObj,
            });
            if (code) {
              return Promise.reject();
            } else {
              props.refreshTable!();
            }
          },
        },
        cpuMemFlag,
      );
    } else {
      //批量卸载/清除/重启
      useModal(
        {
          title:
            props.selectedType === 'uninstall'
              ? t('operation.suruinsagt')
              : props.selectedType === 'reset'
              ? t('operation.suruinsrst')
              : props.selectedType === 'start'
              ? t('operation.surbatStr')
              : props.selectedType === 'stop'
              ? t('operation.surbatSto')
              : props.selectedType === 'selectHost'
              ? t('operation.suruinhost')
              : t('operation.suruinsclr'),
          contentProps: {
            labelText:
              props.selectedType === 'uninstall'
                ? unref(errIps).length
                  ? unref(errIps).length === 1
                    ? t('operation.ukgsip', [unref(errIps)[0]])
                    : t('operation.ukgsips', [unref(errIps)[0], unref(errIps).length])
                  : t('operation.agttips') //t('operation.suruinsagtnum', [unref(props.tableRef!).selectAllNumber])
                : props.selectedType === 'reset'
                ? t('operation.surbatagtnum', [unref(props.tableRef!).selectAllNumber])
                : props.selectedType === 'stop' || props.selectedType === 'start'
                ? t('operation.surbatengnum', [unref(props.tableRef!).selectAllNumber])
                : props.selectedType === 'selectHost'
                ? t('operation.dfergrqq', [unref(props.tableRef!).selectAllNumber])
                : t('operation.surbatagtnum', [unref(props.tableRef!).selectAllNumber]),
          },
          width: 600,
          handleOk: async (conRef) => {
            await conRef.validate();
            if (props.selectedType === 'stop' || props.selectedType === 'start') {
              sendObj.type = conRef.type;
            }
            return useValidatePwd(
              props.selectedType === 'uninstall'
                ? batchUninstallAgent
                : props.selectedType === 'reset'
                ? batchResetAgent
                : props.selectedType === 'start'
                ? batchStartDriver
                : props.selectedType === 'stop'
                ? batchStopDriver
                : props.selectedType === 'selectHost'
                ? batchChangeShowIp
                : batchClearAbnormal,
              sendObj,
              conRef,
              props.refreshTable!,
              true,
            );
          },
        },
        props.selectedType === 'start' || props.selectedType === 'stop'
          ? pwdConfirmDriver
          : pwdConfirm,
      );
    }
  };
</script>

<style scoped></style>
