<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 14:36:07
 * @LastEditTime: 2023-06-13 14:38:15
-->
<template>
  <div class="namedesc">
    <div class="name">{{ name }}</div>
    <div class="desc">{{ desc }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string;
    desc: string;
  }>();
</script>

<style scoped lang="less">
  .namedesc {
    .name {
      font-size: @fz14;
      font-weight: 600;
      color: #000000;
    }
    .desc {
      font-size: @fz13;
      color: rgba(0, 0, 0, 0.5);
      margin-top: 4px;
    }
  }
</style>
