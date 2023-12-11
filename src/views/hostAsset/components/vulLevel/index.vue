<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-15 17:02:10
 * @LastEditTime: 2022-09-15 17:14:43
-->
<template>
  <div :style="{ color }">
    <a-badge :color="color" />
    <span>{{ t(`asset.${text}`) }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    colorList: {
      type: Array as any,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const text = ref<string>('');
  const color = ref<string>('');

  watchEffect(() => {
    [text.value, color.value] = props.colorList[props.level].split(',');
  });
</script>
<style lang="less" scoped></style>
