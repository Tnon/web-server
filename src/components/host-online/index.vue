<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-02-25 14:31:14
-->
<template>
  <div>
    <a-badge
      :status="online === ONLINESTATUS.ONLINE ? 'processing' : 'default'"
      :color="online === ONLINESTATUS.ONLINE ? '#18BA79' : '#eee'"
    />
    <span class="online" v-if="online === ONLINESTATUS.ONLINE">
      {{ t('common.onLine') }}
    </span>
    <span class="offline" v-else-if="online === ONLINESTATUS.OFFLINE">
      {{ t('common.offLine') }}
    </span>
    <span class="offline" v-else>
      {{ t('common.uninstall') }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { ONLINESTATUS } from '@/enums/assetsType';
  import { PropType } from '@vue/runtime-core';
  import { useI18n } from 'vue-i18n';
  defineProps({
    online: Number as PropType<ONLINESTATUS>,
  });
  const { t } = useI18n();
</script>

<style lang="less" scoped>
  .online {
    color: #18ba79;
  }
  .offline {
    color: rgba(0, 0, 0, 0.4);
  }
</style>
