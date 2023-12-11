<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-16 19:16:09
 * @LastEditTime: 2022-08-03 16:58:13
-->
<template>
  <div>
    <template v-if="!group_kv_path"> - </template>
    <template v-else>
      <template v-for="(item, index) in group_kv_path" :key="item.id">
        <span>
          {{ item.name }}
          <span v-if="index < group_kv_path.length - 1"> / </span>
        </span>
      </template>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  defineProps({
    group_kv_path: Array as PropType<any>,
  });
</script>
