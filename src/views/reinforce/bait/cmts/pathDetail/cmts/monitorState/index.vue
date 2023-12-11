<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-27 15:55:47
 * @LastEditTime: 2023-08-04 10:02:31
-->
<template>
  <div :style="{ color: state.color }" :title="state.text" class="text">
    <a-badge :color="state.color" />
    <span>{{ state.text }}</span>
  </div>
</template>

<script setup lang="ts">
  import { E_Ex_Code } from '../../type';
  import { PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    type: Number as PropType<E_Ex_Code>,
  });
  const { t } = useI18n();
  const state = reactive({
    color: '',
    text: '',
  });

  watchEffect(() => {
    if (props.type === E_Ex_Code.Normal) {
      state.color = '#18BA79';
      state.text = t('operation.deteNor');
    } else if (props.type === E_Ex_Code.Driver_No_Start) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.exmsgns');
    } else if (props.type === E_Ex_Code.Path_No_Exist) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.exmsgne');
    } else if (props.type === E_Ex_Code.Path_Too_Much) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.exmsgtm');
    } else if (props.type === E_Ex_Code.Agent_Error) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.exmsgar');
    } else if (props.type === E_Ex_Code.Req_Error) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.exmsgre');
    } else if (props.type === E_Ex_Code.Mik_File_Error) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.exmsgmfr');
    } else if (props.type === E_Ex_Code.Agent_P_Dir_No) {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + t('reinforce.askffs');
    } else {
      state.color = '#F8A556';
      state.text = t('operation.deteErr');
    }
  });
</script>

<style scoped lang="less">
  .text {
    word-break: break-word;
  }
</style>
