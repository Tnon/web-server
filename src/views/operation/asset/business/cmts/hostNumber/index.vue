<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 15:58:06
 * @LastEditTime: 2022-10-28 15:13:44
-->
<template>
  <div class="hostNumber" @click="viewGroupDetail">{{ hostNumber }} </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import hostGroupDetail from './cmts/hostGroupDetail';

  const props = defineProps({
    hostNumber: {
      type: Number,
      required: true,
    },
    groups: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    refreshTable: {
      type: Function,
      required: true,
    },
  });
  const viewGroupDetail = () => {
    useModal(
      {
        title: props.groupName,
        width: 1080,
        footer: false,
        contentProps: {
          groups: props.groups,
          groupName: props.groupName,
          refreshTable: props.refreshTable,
        },
        wrapClassName: 'noheadModal',
      },
      hostGroupDetail,
    );
  };
</script>

<style scoped lang="less">
  .hostNumber {
    cursor: pointer;
    color: @primary-color;
  }
</style>
