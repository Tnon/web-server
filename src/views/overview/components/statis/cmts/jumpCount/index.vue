<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-07 11:43:40
 * @LastEditTime: 2022-12-07 12:46:38
-->
<template>
  <div @click="jumpTo" :class="[handled ? 'healthy' : type === 'attack' ? 'attack' : 'acdr']">
    {{ count }}
  </div>
</template>

<script setup lang="ts">
  import { HANDLETYPE } from '@/enums/attack_risk';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    count: {
      type: Number,
      required: true,
    },
    begintime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    handled: {
      type: Boolean,
      required: true,
    },
  });
  const router = useRouter();
  const jumpTo = () => {
    router.push({
      name: props.type,
      query: {
        begintime: props.begintime,
        endtime: props.endtime,
        handleType: props.handled ? HANDLETYPE.CONFIRM : HANDLETYPE.UNHANDLE,
      },
    });
  };
</script>

<style scoped lang="less">
  .attack {
    color: #f05064;
  }
  .acdr {
    color: #f8a454;
  }
  .healthy {
    color: #18ba79;
  }
</style>
