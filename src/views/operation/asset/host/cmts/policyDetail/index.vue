<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 17:34:41
 * @LastEditTime: 2022-10-19 18:23:59
-->
<template>
  <div class="name" @click="linkTo" :class="{ policySucc }">
    {{ policyName }}
    <span v-if="!policySucc">{{ t('operation.partEff') }}</span>
  </div>
</template>

<script setup lang="ts">
  import { StrategyType } from '@/views/strategy/common/types';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    policyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    policyName: {
      type: String,
      required: true,
    },
    policyId: {
      type: Number,
      required: true,
    },
    policySucc: {
      type: Boolean,
      required: true,
    },
  });
  //路由跳转
  const router = useRouter();
  const { t } = useI18n();
  const linkTo = () => {
    router.push({
      name:
        props.policyType === StrategyType.Safe
          ? 'strategy-layout-safe-index'
          : 'strategy-layout-asset-index',
      query: {
        selectedId: props.policyId,
      },
    });
  };
</script>

<style scoped lang="less">
  .name {
    cursor: pointer;
    color: @warn-color;
  }
  .policySucc {
    color: @primary-color;
  }
</style>
