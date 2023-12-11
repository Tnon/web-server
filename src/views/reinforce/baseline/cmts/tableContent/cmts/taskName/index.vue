<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 14:33:43
 * @LastEditTime: 2023-03-21 18:59:07
-->
<template>
  <div class="name" @click="jumpTo" :title="name">{{ name }} </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps({
    name: String,
    task_id: Number,
  });
  const router = useRouter();
  const jumpTo = () => {
    router.push({
      name: 'reinforce-layout-baseline-task',
      query: {
        taskName: props.name,
        taskId: props.task_id,
      },
    });
  };
</script>

<style scoped lang="less">
  .name {
    cursor: pointer;
    color: @primary-color;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
