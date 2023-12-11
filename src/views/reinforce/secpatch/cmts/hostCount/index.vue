<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-15 13:02:26
 * @LastEditTime: 2023-04-27 18:04:29
-->
<template>
  <div class="count" @click="jumpHost"> {{ hostCount }}</div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps({
    hostCount: {
      type: Number,
      default: 0,
    },
    patchName: {
      type: String,
      required: true,
    },
    patch_id: {
      type: Number,
      required: true,
    },
  });
  const router = useRouter();
  const jumpHost = () => {
    router.push({
      name: 'reinforce-layout-secpatch-detail',
      query: {
        patchName: props.patchName,
        patch_id: props.patch_id,
      },
    });
  };
</script>

<style scoped lang="less">
  .count {
    cursor: pointer;
    color: @primary-color;
  }
</style>
