<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-17 17:18:45
 * @LastEditTime: 2022-04-12 11:39:08
-->
<template>
  <div class="box">
    <template v-for="item in types" :key="item.type">
      <span
        class="defaultS"
        :style="style"
        :class="{
          actived: item.type === actived,
          smallS: $attrs.size === 'small',
        }"
        @click="SelectType(item.type)"
      >
        {{ item.title }}
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  import { Types } from './type';
  defineProps({
    types: {
      type: Array as PropType<Types[]>,
    },
    actived: {
      type: [String, Number] as PropType<string | number>,
    },
    style: {
      type: Object,
    },
  });
  const emit = defineEmits(['update:actived']);
  const SelectType = (type: string): void => {
    emit('update:actived', type);
  };
</script>
<style lang="less" scoped>
  .defaultS {
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 8px;
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
  .actived {
    background: #e6e6e6;
    font-weight: 600;
    color: #000000;
  }
</style>
