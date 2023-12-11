<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-28 11:02:52
 * @LastEditTime: 2023-04-27 18:08:24
-->
<template>
  <normal :patch_id="patch_id" :host_id="host_id" />
</template>

<script lang="ts" setup>
  import normal from './normal';

  defineProps({
    patch_id: {
      type: Number,
      required: true,
    },
    host_id: {
      type: String,
      required: true,
    },
  });
</script>
