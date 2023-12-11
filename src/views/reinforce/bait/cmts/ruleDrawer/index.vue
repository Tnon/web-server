<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-28 11:02:52
 * @LastEditTime: 2023-07-13 16:52:02
-->
<template>
  <normal :record="record" :closeDraw="closeDraw" :refreshTable="refreshTable" />
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
