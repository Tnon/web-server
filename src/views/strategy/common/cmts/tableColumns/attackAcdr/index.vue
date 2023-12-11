<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 17:23:34
 * @LastEditTime: 2023-01-11 15:37:45
-->
<template>
  <div :class="{ count }" @click="jumpTo">{{ count }} </div>
</template>

<script setup lang="ts">
  import { HANDLETYPE } from '@/enums/attack_risk';
  import { PropType } from 'vue';
  import { useRouter } from 'vue-router';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  const props = defineProps({
    routerName: {
      type: String,
      required: true,
    },
    count: Number,
    id: Number,
    policy_type: Number as PropType<E_WB_Enum>,
  });
  const router = useRouter();
  const jumpTo = () => {
    props.count &&
      router.push({
        name: props.routerName,
        query: {
          handleType:
            props.policy_type === E_WB_Enum.Black ? HANDLETYPE.CONFIRM : HANDLETYPE.IGNORE,
        },
        params: {
          policy_id: props.id,
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
