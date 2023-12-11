<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-14 10:24:13
 * @LastEditTime: 2023-06-01 11:17:15
-->
<template>
  <div>
    <div class="safestatus" v-if="alarm_count || event_count">
      <!-- 告警数量 start -->
      <span class="value attack" v-if="alarm_count">{{ t('menu.attack') }}</span>
      <!-- 告警数量 end -->
      <!-- 事件数量 start -->
      <span v-if="acdr_enabled && event_count" class="value acdr">{{ t('menu.ngav') }}</span>
      <!-- 事件数量 end -->
    </div>
    <span class="value safe" v-else>{{ t('asset.safe') }}</span>
  </div>
</template>

<script setup lang="ts">
  import { useProductLogo } from '@/store/modules/product-logo';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  defineProps({
    alarm_count: Number, // 告警
    event_count: Number, // 事件
  });
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .attack {
    background-color: rgba(240, 80, 100, 0.15);
    color: @danger-color;
  }
  .acdr {
    color: @warn-color;
    background-color: rgba(248, 164, 84, 0.15);
  }
  .safe {
    color: @primary-color;
    background: rgba(24, 186, 121, 0.15);
  }
  .value {
    padding: 2px 6px;
    margin: 4px 4px 4px 0;
  }
</style>
