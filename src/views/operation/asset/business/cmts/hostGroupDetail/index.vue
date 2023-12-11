<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 17:34:41
 * @LastEditTime: 2022-10-20 17:10:57
-->
<template>
  <div class="name" @click="linkTo">{{ hostGroupNumber }} </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps({
    hostGroupNumber: {
      type: Number,
      required: true,
    },
    business_group_id: {
      type: Number,
      required: true,
    },
  });
  //路由跳转
  const router = useRouter();
  const linkTo = () => {
    router.push({
      name: 'operation-layout-asset-host',
      query: {
        business_group_id: props.business_group_id,
      },
    });
  };
</script>

<style scoped lang="less">
  .name {
    cursor: pointer;
    color: @primary-color;
  }
</style>
