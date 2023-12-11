<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-13 10:31:44
 * @LastEditTime: 2022-11-11 13:46:16
-->
<template>
  <switch-nodes v-model:actived="state!.selectedType" :types="dymicTab" />
</template>

<script setup lang="ts">
  import switchNodes from '@/components/switchNodes';
  defineProps({
    state: Object,
  });
  const dymicTab = [
    {
      type: 'client',
      title: 'operation.client',
    },
    {
      type: 'server',
      title: 'operation.server',
    },
    {
      type: 'engine',
      title: 'operation.engine',
    },
    // {
    //   type: 'clientengine',
    //   title: 'operation.clientengine',
    // },
    // {
    //   type: 'serverengine',
    //   title: 'operation.serverengine',
    // },
    // // 新增漏扫引擎
    // {
    //   type: 'vultyengine',
    //   title: 'operation.vultyScanengine',
    // },
  ];
</script>
