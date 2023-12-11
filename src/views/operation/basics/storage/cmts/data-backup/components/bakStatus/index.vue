<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2022-09-01 12:46:24
-->
<template>
  <div :style="{ color: state.color }">
    {{ state.text }}
  </div>
</template>
<script lang="ts" setup>
  import { BAKSTATUS, COLORS } from '@/enums/pstatus';
  import { reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    status: Number,
  });
  const { t } = useI18n();
  const state = reactive({
    color: COLORS.NORMAL,
    text: '',
  });
  watchEffect(() => {
    state.color = COLORS.NORMAL;
    state.text = '';
    switch (props.status) {
      case BAKSTATUS.BAKING:
        state.text = t('setting.baking');
        break;
      case BAKSTATUS.BAKSUCCESS:
        state.text = t('setting.bakSuc');
        state.color = COLORS.SUCCESS;
        break;
      case BAKSTATUS.BAKFAIL:
        state.text = t('setting.bakFail');
        state.color = COLORS.ERROR;
        break;
      case BAKSTATUS.IMPORTING:
        state.text = t('setting.Importing');
        break;
      case BAKSTATUS.IMPSUCCESS:
        state.text = t('setting.iptSucc');
        state.color = COLORS.SUCCESS;
        break;
      case BAKSTATUS.IMPFAIL:
        state.text = t('setting.iptFail');
        state.color = COLORS.ERROR;
        break;
    }
  });
</script>
