<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-27 15:55:47
 * @LastEditTime: 2023-03-21 15:55:49
-->
<template>
  <div :style="{ color: state.color }" :title="state.text" class="text">
    <a-badge :color="state.color" />
    <span>{{ state.text }}</span>
  </div>
</template>

<script setup lang="ts">
  import { E_Monitor_State } from '@/views/reinforce/file/cmts/fileMonitor/type';
  import { PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    type: Number as PropType<E_Monitor_State>,
    reason: String,
  });
  const { t } = useI18n();
  const state = reactive({
    color: '',
    text: '',
  });
  watchEffect(() => {
    if (props.type === E_Monitor_State.Normal) {
      state.color = '#18BA79';
      state.text = t('operation.deteNor');
    } else if (props.type === E_Monitor_State.Stop) {
      state.color = '#F8A556';
      state.text = t('reinforce.deteStop');
    } else {
      state.color = '#F8A556';
      state.text = t('operation.deteErr') + ' : ' + props.reason;
    }
  });
</script>

<style scoped lang="less">
  .text {
    word-break: break-word;
  }
</style>
