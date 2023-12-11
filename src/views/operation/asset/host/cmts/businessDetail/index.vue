<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 17:34:41
 * @LastEditTime: 2022-10-27 10:17:48
-->
<template>
  <div class="name" @click="linkTo">{{ business_group_name }} </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps({
    business_group_name: {
      type: String,
      required: true,
    },
  });
  //路由跳转
  const router = useRouter();
  const linkTo = () => {
    props.business_group_name !== '-' &&
      router.push({
        name: 'operation-layout-asset-business',
        query: {
          business_group_name: props.business_group_name,
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
