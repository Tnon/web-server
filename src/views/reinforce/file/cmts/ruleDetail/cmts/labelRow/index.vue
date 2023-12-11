<template>
  <div>
    <template v-for="item in source" :key="item">
      <div class="node"> {{ item }}</div>
      <div class="line"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  defineProps({
    source: {
      type: Array as PropType<string[]>,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .node {
    padding: 20px 16px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #eee;
    &:last-child {
      display: none;
    }
  }
</style>
