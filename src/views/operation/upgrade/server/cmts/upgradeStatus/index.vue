<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-12 19:36:21
 * @LastEditTime: 2023-01-10 16:34:44
-->
<template>
  <div :style="{ color: nodeInfo.color }" class="node">
    <component :is="nodeInfo.icon" class="icon" />
    <span>{{ nodeInfo.title }}</span>
  </div>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect } from 'vue';
  import { SERVERUPGRADESTATUS } from '.';
  import { useI18n } from 'vue-i18n';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    WarningFilled,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
  const props = defineProps({
    type: Number as PropType<SERVERUPGRADESTATUS>,
  });
  const nodeInfo = reactive({
    title: '',
    color: '',
    icon: undefined,
  }) as any;
  const { t } = useI18n();
  watchEffect(() => {
    if (props.type === SERVERUPGRADESTATUS.SUCCESS) {
      nodeInfo.title = t('operation.sucupg');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = CheckCircleFilled;
    } else if (props.type === SERVERUPGRADESTATUS.UPGRADEABLE) {
      nodeInfo.title = t('operation.prepupgra');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === SERVERUPGRADESTATUS.UPGRADING) {
      nodeInfo.title = t('operation.uping');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = LoadingOutlined;
    } else if (props.type === SERVERUPGRADESTATUS.FAILED) {
      nodeInfo.title = t('operation.upgseerr');
      nodeInfo.color = '#F75555';
      nodeInfo.icon = WarningFilled;
    } else if (props.type === SERVERUPGRADESTATUS.PREPARE) {
      nodeInfo.title = t('operation.Upgradeable');
      nodeInfo.color = '#F8A556';
      nodeInfo.icon = ExclamationCircleFilled;
    } else if (props.type === SERVERUPGRADESTATUS.LASTED) {
      nodeInfo.title = t('operation.lastedv');
      nodeInfo.color = '#18BA79';
      nodeInfo.icon = CheckCircleFilled;
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
    line-height: normal;
    .icon {
      margin-right: 4px;
    }
  }
</style>
