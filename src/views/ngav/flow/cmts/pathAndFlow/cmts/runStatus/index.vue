<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-09-26 20:50:37
-->
<template>
  <div>
    <a-badge :status="statusInfo.status" :color="statusInfo.color" />
    <span :class="[statusInfo.status === 'processing' ? 'process' : 'default']">
      {{ statusInfo.text }}
    </span>
    <span v-if="statusInfo.subText" class="errTips"> {{ statusInfo.subText }} </span>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { NodeStatus } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { useJudgeStatus } from '.';
  const props = defineProps({
    status: Number as PropType<NodeStatus>,
  });
  const { t } = useI18n();
  //状态仓
  const statusInfo = reactive({
    status: '',
    color: '',
    text: '',
    subText: '',
  });
  watchEffect(() => {
    const status = useJudgeStatus(props.status!, t);
    Object.assign(statusInfo, status);
  });
</script>

<style lang="less" scoped>
  .process {
    color: rgba(0, 0, 0, 0.8);
  }
  .default {
    color: rgba(0, 0, 0, 0.2);
  }
  .errTips {
    color: #f75555;
  }
</style>
