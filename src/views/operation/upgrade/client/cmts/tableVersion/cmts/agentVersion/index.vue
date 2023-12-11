<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 19:36:21
 * @LastEditTime: 2023-10-30 14:15:56
-->
<template>
  <a-popover
    trigger="hover"
    placement="right"
    destroyTooltipOnHide
    :overlayClassName="showContentCmp ? 'showContent' : 'hideContent'"
  >
    <template #content>
      <div v-if="agent_upgrade_failure_reason && agent_upgrade_failure_reason !== '-'">
        <div class="title">{{ t('operation.abnresn') }}</div>
        <div class="value">{{ agent_upgrade_failure_reason }}</div>
      </div>
      <div v-if="agent_version && agent_version !== '-'">
        <div class="title">{{ t('operation.cretver') }}</div>
        <div class="value">{{ agent_version }}</div>
      </div>
    </template>
    <div :style="{ color: nodeInfo.color }" class="node">
      <component :is="nodeInfo.icon" class="icon" />
      <span>{{ nodeInfo.title }}</span>
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { PropType, computed, reactive, watchEffect } from 'vue';
  import { UPGRADESTATUS } from '@/enums/pstatus';
  import { useI18n } from 'vue-i18n';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    WarningFilled,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
  const props = defineProps({
    type: Number as PropType<UPGRADESTATUS>,
    agent_upgrade_failure_reason: String,
    agent_version: String,
  });
  const nodeInfo = reactive({
    title: '',
    color: '',
    icon: undefined,
  }) as any;
  const { t } = useI18n();
  watchEffect(() => {
    if (props.type === UPGRADESTATUS.LATEST) {
      nodeInfo.title = t('operation.lastVer');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = CheckCircleFilled;
    } else if (props.type === UPGRADESTATUS.UPGRADEABLE) {
      nodeInfo.title = t('operation.Upgradeable');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === UPGRADESTATUS.UPGRADING) {
      nodeInfo.title = t('operation.upgrading');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === UPGRADESTATUS.PREPARE) {
      nodeInfo.title = t('operation.prepupgra');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === UPGRADESTATUS.FAILED) {
      nodeInfo.title = t('operation.upgraFail');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = WarningFilled;
    } else if (props.type === UPGRADESTATUS.PackageCheckIng) {
      nodeInfo.title = t('operation.checking');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === UPGRADESTATUS.WAITING) {
      nodeInfo.title = t('operation.dlz');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else {
      nodeInfo.title = '-';
    }
  });

  const showContentCmp = computed(
    () =>
      (props.agent_upgrade_failure_reason && props.agent_upgrade_failure_reason !== '-') ||
      (props.agent_version && props.agent_version !== '-'),
  );
</script>

<style scoped lang="less">
  .title {
    font-weight: 600;
    display: inline-block;
    margin: 8px 0;
    margin-right: 16px;
  }
  .value {
    display: inline-block;
    margin-right: 16px;
  }
  .node {
    display: inline-flex;
    align-items: center;
    line-height: normal;
    .icon {
      margin-right: 4px;
    }
  }
</style>
