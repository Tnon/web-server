<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 14:36:54
 * @LastEditTime: 2022-09-29 11:17:31
-->
<template>
  <div>
    {{ textInfo.text }}
  </div>
</template>

<script setup lang="ts">
  import { watchEffect, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getFileStatus } from '.';
  const props = defineProps({
    status: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const textInfo = reactive({
    text: '',
  });
  watchEffect(() => {
    Object.assign(textInfo, getFileStatus(props.status, t));
  });
</script>
