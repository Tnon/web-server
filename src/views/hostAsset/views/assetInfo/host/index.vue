<template>
  <assets-table-cmp v-model:group_id="group_id" ref="assetsTable" />
</template>
<script lang="ts" setup>
  import { provide, ref, unref } from 'vue';
  import AssetsTableCmp from './cmts/tableContent';
  //content元素
  const assetsTable = ref<any>(null);
  //全部分组
  const group_id = ref<number>(-1);
  //刷新卡片的方法
  const refreshFilter = () => {
    unref(assetsTable).refreshFilter();
  };
  //向孙子（poplist）注入一个刷新卡片的方法
  provide('refreshFilter', refreshFilter);
</script>
<style lang="less" scoped></style>
