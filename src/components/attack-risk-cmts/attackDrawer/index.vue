<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-28 11:02:52
 * @LastEditTime: 2022-12-23 20:04:34
-->
<template>
  <component :is="normal" :record="record" :closeDraw="closeDraw" :refreshTable="refreshTable" />
</template>

<script lang="ts" setup>
  import normal from './normal';
  defineProps({
    record: {
      type: Object,
      required: true,
    },
    refreshTable: {
      type: Function,
    },
    closeDraw: Function,
  });
</script>

<style lang="less"></style>
