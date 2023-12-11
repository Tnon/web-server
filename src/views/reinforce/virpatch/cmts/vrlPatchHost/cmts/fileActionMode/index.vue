<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-28 17:18:00
 * @LastEditTime: 2023-06-02 11:41:11
-->
<template>
  <a-radio-group :value="modeValue" :disabled="ischeck" @change="changeValue">
    <template v-for="item in modeOptions" :key="item.value">
      <a-radio class="radioCus" :value="item.value">{{ item.label }}</a-radio>
    </template>
  </a-radio-group>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { E_Mode_Action } from './type';
  import { switchFileMdode } from '@/api/reinforce';
  import { ref, watchEffect } from 'vue';

  const props = defineProps<{
    host_id: string;
    mode_val: E_Mode_Action;
    refreshTable: Fn;
    ischeck: boolean;
    patch_id: string;
  }>();
  const { t } = useI18n();
  //选项
  const modeOptions = [
    { label: t('reinforce.tzjc'), value: E_Mode_Action.StopMonitor },
    { label: t('reinforce.jcsb'), value: E_Mode_Action.Monitor },
    { label: t('reinforce.ljfh'), value: E_Mode_Action.Inject },
  ];

  const modeValue = ref<E_Mode_Action | undefined>(undefined);
  watchEffect(() => {
    modeValue.value = props.mode_val;
  });

  //改变的函数
  const changeValue = async (e) => {
    const { code } = await switchFileMdode({
      filter: { patch_id: props.patch_id },
      is_all: false,
      hostidlist: [props.host_id],
      set_status: e.target.value,
    });
    if (!code) {
      modeValue.value = e.target.value;
      props.refreshTable();
    }
  };
</script>

<style scoped lang="less">
  .radioCus {
    margin-right: 24px;
  }
</style>
