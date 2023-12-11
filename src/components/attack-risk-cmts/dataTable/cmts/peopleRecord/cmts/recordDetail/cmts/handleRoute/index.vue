<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-23 16:37:24
 * @LastEditTime: 2022-12-23 16:45:35
-->
<template>
  <div>
    <template v-if="auto_intercept === E_auto_intercept.NO">
      <span>-</span>
    </template>
    <template v-else>
      <a-button type="text" @click="jumpTo">{{ t('arcomn.jnghs') }}</a-button>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { E_auto_intercept } from '.';

  const props = defineProps({
    auto_intercept: {
      type: Number,
      required: true,
    },
    dispose_content: {
      type: String,
    },
  });

  const router = useRouter();
  const { t } = useI18n();
  const jumpTo = () => {
    router.push({
      name: 'strategy-layout-black-index',
      query: {
        dispose_content: props.dispose_content,
      },
    });
  };
</script>

<style scoped></style>
