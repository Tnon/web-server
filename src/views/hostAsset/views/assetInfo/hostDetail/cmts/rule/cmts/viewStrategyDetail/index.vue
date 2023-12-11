<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 15:29:44
 * @LastEditTime: 2023-02-27 19:10:08
-->
<template>
  <div @click="jumpTo" class="view">
    {{ t('asset.lookOver') }}
  </div>
</template>

<script setup lang="ts">
  import { StrategyType } from '@/views/strategy/common/types';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  const props = defineProps({
    policy_type: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    policy_id: {
      type: Number,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  const jumpTo = () => {
    let routerName = '';
    switch (props.policy_type) {
      case StrategyType.Asset:
        routerName = 'strategy-layout-asset-index';
        break;
      case StrategyType.Safe:
        routerName = 'strategy-layout-safe-index';
        break;
      case StrategyType.White:
        routerName = 'strategy-layout-white-index';
        break;
      case StrategyType.Black:
        routerName = 'strategy-layout-black-index';
        break;
      default:
        routerName = '';
        break;
    }
    routerName &&
      router.push({
        name: routerName,
        query: {
          selectedId: props.policy_id,
        },
      });
  };
</script>

<style scoped lang="less">
  .view {
    cursor: pointer;
    color: @primary-color;
  }
</style>
