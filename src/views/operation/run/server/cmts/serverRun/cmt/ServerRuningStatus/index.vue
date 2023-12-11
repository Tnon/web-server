<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-18 19:13:20
 * @LastEditTime: 2022-11-18 19:19:35
-->
<template>
  <span class="abnerr" :style="{ color: state.color }">
    <component :is="state.component" />
    <span class="title"> {{ state.title }}</span>
  </span>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { RuningStatus } from '.';
  import { CheckCircleFilled, WarningFilled } from '@ant-design/icons-vue';
  const props = defineProps({
    status: Number as PropType<RuningStatus>,
  });
  const state = reactive({
    title: '',
    color: '',
    component: undefined,
  });
  const { t } = useI18n();
  watchEffect(() => {
    if (props.status === RuningStatus.NORMAL) {
      Object.assign(state, {
        title: t('operation.deteNor'),
        color: '#18BA79',
        component: CheckCircleFilled,
      });
    } else if (props.status === RuningStatus.ERROR) {
      Object.assign(state, {
        title: t('operation.deteErr'),
        color: '#F75555',
        component: WarningFilled,
      });
    } else {
      Object.assign(state, {
        title: '-',
        color: '#000',
        component: 'span',
      });
    }
  });
</script>

<style scoped lang="less">
  .abnerr {
    display: flex;
    align-items: center;
    .title {
      margin-left: 4px;
    }
  }
</style>
