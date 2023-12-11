<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-31 18:10:53
 * @LastEditTime: 2022-09-01 12:43:04
-->
<template>
  <a-popover trigger="click" placement="bottomLeft" destroyTooltipOnHide>
    <template #content>
      <div class="refreshContent">
        <div class="label">{{ t('arcomn.refreshDs') }}</div>
        <a-switch v-model:checked="isOpenSilence" @change="switchChange" />
      </div>
      <a-slider
        v-model:value="refreshRound"
        tooltipPlacement="bottom"
        :tip-formatter="(value) => `${value}${t('arcomn.min')}`"
        :min="1"
        :disabled="!isOpenSilence"
        :max="20"
        @afterChange="refreshRoundChange"
      />
    </template>
    <a-button type="text">
      <template #icon>
        <custom-icon class="refreshIcon" :class="{ routed: isOpenSilence }" type="#ax-update" />
      </template>
      <template v-if="isOpenSilence"> {{ `${refreshRound}${t('arcomn.min')}` }} </template>
      <template v-else> {{ t('arcomn.refreshDs') }} </template>
    </a-button>
  </a-popover>
</template>

<script setup lang="ts">
  import { useAutoRefresh } from '@/hooks/use-auto-refresh';
  import { unref, ref, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    refreshMothod: Function,
    tokenType: String,
  });
  const { t } = useI18n();
  const timer = ref<number>(0);
  const { isOpenSilence, refreshRound, refreshRoundChange, switchChange } = useAutoRefresh(
    props.refreshMothod,
    timer,
    props.tokenType,
  );
  if (unref(isOpenSilence)) {
    refreshRoundChange();
  }
  onUnmounted(() => {
    clearInterval(unref(timer));
  });
  defineExpose({ refreshRoundChange, isOpenSilence });
</script>

<style scoped lang="less">
  .refreshContent {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .label {
      width: 150px;
    }
  }
  .refreshIcon {
    transition: all 2s;
  }
  .routed {
    animation: rotate 2s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
