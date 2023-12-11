<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 15:58:06
 * @LastEditTime: 2023-04-07 17:36:32
-->
<template>
  <div class="hostNumber" @click="viewGroupDetail">{{ hostNumber }} </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { GROUPS } from '@/enums/assetsType';

  const props = defineProps({
    hostNumber: {
      type: Number,
      required: true,
    },
    group_id: {
      type: Number,
      required: true,
    },
  });
  const router = useRouter();
  //查看分组下主机的详情
  const viewGroupDetail = () => {
    router.push({
      name: 'operation-layout-asset-manage',
      query:
        props.group_id === GROUPS.ALL
          ? undefined
          : {
              group_id: props.group_id,
            },
    });
  };
</script>

<style scoped lang="less">
  .hostNumber {
    cursor: pointer;
    color: @primary-color;
  }
</style>
