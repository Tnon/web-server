<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-16 19:16:09
 * @LastEditTime: 2022-10-19 17:27:30
-->
<template>
  <div class="cter">
    <template v-for="(item, index) in group_kv_path" :key="item.id">
      <span :class="{ prevNodes: index < group_kv_path.length - 1 }">
        {{ item.name }}
      </span>
      <span class="line prevNodes" v-if="index < group_kv_path.length - 1"> / </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  defineProps({
    group_kv_path: Array as PropType<any>,
  });
</script>
<style lang="less" scoped>
  .cter {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .line {
    margin: 0 5px;
  }
  .prevNodes {
    display: none;
  }
</style>
