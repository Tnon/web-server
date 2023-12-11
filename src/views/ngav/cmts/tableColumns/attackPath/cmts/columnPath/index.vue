<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 17:55:00
 * @LastEditTime: 2022-09-26 15:49:26
-->
<template>
  <div class="paths">
    <template v-for="item in paths" :key="item.name">
      <span class="name">{{ item.process_name }}</span>
      <div class="line"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { AttackPath } from '@/views/ngav/cmts/tableColumns/attackPath/type';
  defineProps({
    paths: {
      type: Array as PropType<AttackPath[]>,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .paths {
    display: flex;
    align-items: center;
    .name {
      font-size: @fz12;
      font-weight: 600;
      color: #000000;
      word-break: keep-all;
    }
    .line {
      flex: 30px 0 0;
      height: 1px;
      border: 1px dashed #888888;
      margin: 0 16px;
      &:last-child {
        display: none;
      }
    }
  }
</style>
