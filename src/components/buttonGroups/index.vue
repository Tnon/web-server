<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 18:45:55
 * @LastEditTime: 2023-03-14 11:34:49
-->
<template>
  <div class="btnG">
    <template v-for="item in actions" :key="item.text">
      <a-button
        v-permission="item.permission"
        v-if="!item.hidden"
        class="node"
        type="text"
        :disabled="item.disabled"
        @click="item.callback"
      >
        {{ item.text }}
      </a-button>
      <div class="line"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { I_Btn_Groups } from './type';

  defineProps({
    actions: {
      type: Array as PropType<I_Btn_Groups[]>,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .btnG {
    display: inline-flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #eee;
    .node {
      font-size: @fz12;
      line-height: 16px;
      border-radius: 8px;
      padding: 4px 10px;
    }

    .line {
      height: 10px;
      width: 1px;
      background-color: #eee;
      &:last-child {
        display: none;
      }
    }
  }
</style>
