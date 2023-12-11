<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 19:36:21
 * @LastEditTime: 2023-10-30 14:12:01
-->
<template>
  <a-popover
    trigger="hover"
    placement="right"
    destroyTooltipOnHide
    :overlayClassName="showContentCmp ? 'showContent' : 'hideContent'"
  >
    <template #content>
      <div v-if="driver_upgrade_failure_reason && driver_upgrade_failure_reason !== '-'">
        <div class="title">{{ t('operation.abnresn') }}</div>
        <div class="value">{{ driver_upgrade_failure_reason }}</div>
      </div>
      <div v-if="driver_version && driver_version !== '-'">
        <div class="title">{{ t('operation.cretver') }}</div>
        <div class="value">{{ driver_version }}</div>
      </div>
    </template>
    <div :style="{ color: nodeInfo.color }" class="node">
      <component :is="nodeInfo.icon" class="icon" />
      <span>{{ nodeInfo.title }}</span>
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect, computed } from 'vue';
  import { ADAPTASTATUS } from '@/enums/pstatus';
  import { useI18n } from 'vue-i18n';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    WarningFilled,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
  const props = defineProps({
    type: Number as PropType<ADAPTASTATUS>,
    driver_upgrade_failure_reason: String,
    driver_version: String,
  });
  const nodeInfo = reactive({
    title: '',
    color: '',
    icon: undefined,
  }) as any;
  const { t } = useI18n();
  watchEffect(() => {
    if (props.type === ADAPTASTATUS.Adapted) {
      nodeInfo.title = t('operation.adadriv');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = CheckCircleFilled;
    } else if (props.type === ADAPTASTATUS.Updateable) {
      nodeInfo.title = t('operation.adaupd');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === ADAPTASTATUS.Prepare) {
      nodeInfo.title = t('operation.driprepa');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === ADAPTASTATUS.Updating) {
      nodeInfo.title = t('operation.adaping');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === ADAPTASTATUS.Error) {
      nodeInfo.title = t('operation.adaerr');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = WarningFilled;
    } else if (props.type === ADAPTASTATUS.UnAdapted) {
      nodeInfo.title = t('operation.unadaupd');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = WarningFilled;
    } else if (props.type === ADAPTASTATUS.PackageCheckIng) {
      nodeInfo.title = t('operation.checking');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === ADAPTASTATUS.WAITING) {
      nodeInfo.title = t('operation.dlz');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else {
      nodeInfo.title = '-';
    }
  });

  const showContentCmp = computed(
    () =>
      (props.driver_upgrade_failure_reason && props.driver_upgrade_failure_reason !== '-') ||
      (props.driver_version && props.driver_version !== '-'),
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
