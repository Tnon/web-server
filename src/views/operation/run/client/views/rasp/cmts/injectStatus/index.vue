<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 19:36:21
 * @LastEditTime: 2023-08-07 10:18:28
-->
<template>
  <a-popover trigger="hover" placement="right" destroyTooltipOnHide>
    <template #content>
      <div v-if="failure_reason && failure_reason !== '-' && type === INJECTSTATUS.ERROR">
        <div class="title">{{ t('operation.abnresn') }}</div>
        <div class="value">{{ failure_reason }}</div>
      </div>
      <div v-else>
        <div class="value">{{ nodeInfo.tips }}</div>
      </div>
    </template>
    <div :style="{ color: nodeInfo.color }" class="node">
      <component :is="nodeInfo.icon" class="icon" />
      <span>{{ nodeInfo.title }}</span>
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { INJECTSTATUS } from '@/enums/pstatus';

  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    WarningFilled,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
  const props = defineProps({
    type: Number as PropType<INJECTSTATUS>,
    failure_reason: String,
  });
  const nodeInfo = reactive({
    title: '',
    color: '',
    icon: undefined,
    tips: '',
  }) as any;
  const { t } = useI18n();
  watchEffect(() => {
    if (props.type === INJECTSTATUS.UNINJECT) {
      nodeInfo.title = t('operation.unnject');
      nodeInfo.tips = t('operation.unnjecttips');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === INJECTSTATUS.INJECTED) {
      nodeInfo.title = t('operation.injected');
      nodeInfo.tips = t('operation.injectedtips');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = CheckCircleFilled;
    } else if (props.type === INJECTSTATUS.INJECTING) {
      nodeInfo.title = t('operation.injecting');
      nodeInfo.tips = t('operation.injectingtips');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === INJECTSTATUS.UNINSTALLED) {
      nodeInfo.title = t('operation.injunsal');
      nodeInfo.tips = t('operation.injunsaltips');
      nodeInfo.color = '#aaa';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === INJECTSTATUS.UNINSTALLING) {
      nodeInfo.title = t('operation.unining');
      nodeInfo.tips = t('operation.uniningtips');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === INJECTSTATUS.SELFDOWN) {
      nodeInfo.title = t('operation.zjj');
      nodeInfo.tips = t('operation.zjjtips');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else {
      nodeInfo.title = t('operation.injecerr');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = WarningFilled;
    }
  });
</script>

<style scoped lang="less">
  .node {
    display: inline-flex;
    align-items: center;
    line-height: normal;
    .icon {
      margin-right: 4px;
    }
  }
</style>
