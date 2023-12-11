<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-12 11:49:29
 * @LastEditTime: 2023-01-12 11:51:39
-->
<template>
  <div v-if="name && name.length">
    {{ name.slice(0, 1).toUpperCase() }}
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: {
      type: String,
    },
  });
</script>

<style scoped></style>
