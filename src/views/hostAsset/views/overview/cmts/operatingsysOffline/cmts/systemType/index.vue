<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-19 14:24:01
 * @LastEditTime: 2023-05-26 16:56:40
-->
<template>
  <div class="container">
    <custom-icon :type="logoType" size="24" />
    <span class="osText" :title="record.os">{{ record.os }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, watchEffect } from 'vue';
  import { osLogoType } from '@/utils/tools';

  const props = defineProps({
    record: {
      type: Object,
      required: true,
    },
  });
  const logoType = ref<string>('');
  watchEffect(() => {
    // osLogoType(os, online), 此处展示online===1时的图标
    logoType.value = unref(osLogoType(props.record.os!, 1));
  });
</script>
<style lang="less" scoped>
  .container {
    display: flex;
    align-items: center;
  }
  .osText {
    margin-left: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
