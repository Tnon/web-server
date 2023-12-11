<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 19:36:21
 * @LastEditTime: 2023-02-16 11:38:25
-->
<template>
  <a-popover trigger="hover" placement="right" destroyTooltipOnHide>
    <template #content>
      <div v-if="engine_abn_reason && engine_abn_reason !== '-'">
        <div class="title">{{ t('operation.abnresn') }}</div>
        <div class="value">{{ engine_abn_reason }}</div>
      </div>
      <div v-if="engine_version && engine_version !== '-'">
        <div class="title">{{ t('operation.cretver') }}</div>
        <div class="value">{{ engine_version }}</div>
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
  import { ENGINESTATUS } from '@/enums/pstatus';
  import { useI18n } from 'vue-i18n';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    WarningFilled,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
  const props = defineProps({
    type: Number as PropType<ENGINESTATUS>,
    engine_version: String,
    engine_abn_reason: String,
  });

  const { t } = useI18n();
  const nodeInfo = reactive({
    title: '',
    color: '',
    icon: undefined,
  }) as any;
  watchEffect(() => {
    nodeInfo.title = '';
    nodeInfo.color = '';
    nodeInfo.icon = undefined;
    if (props.type === ENGINESTATUS.LATEST) {
      nodeInfo.title = t('operation.lastVer');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = CheckCircleFilled;
    } else if (props.type === ENGINESTATUS.UPGRADEABLE) {
      nodeInfo.title = t('operation.adaupd');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === ENGINESTATUS.PREPARE) {
      nodeInfo.title = t('operation.prepupgra');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === ENGINESTATUS.UPGRADING) {
      nodeInfo.title = t('operation.updating');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === ENGINESTATUS.FAILED) {
      nodeInfo.title = t('operation.adaerr');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = WarningFilled;
    } else {
      nodeInfo.title = '-';
    }
  });
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
    .icon {
      margin-right: 4px;
    }
  }
</style>
