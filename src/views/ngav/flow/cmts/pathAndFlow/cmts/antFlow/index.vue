<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-21 15:09:06
 * @LastEditTime: 2023-03-01 17:29:30
-->
<template>
  <a-spin v-if="viewIsFlow" :spinning="flowLoading">
    <ant-flow
      v-model:flowLoading="flowLoading"
      :roadWidth="roadWidth"
      :selectedCiInfo="selectedCiInfo"
      :record="record"
      :getRecord="getRecord"
    />
  </a-spin>
  <flow-time-line v-else :selectedCiInfo="selectedCiInfo" />
</template>

<script setup lang="ts">
  import { PathCi } from '@/views/ngav/flow/type';
  import { PropType, ref } from 'vue';

  import flowTimeLine from './cmts/flowTimeLine';
  import antFlow from './cmts/flow';
  defineProps({
    selectedCiInfo: {
      type: Object as PropType<PathCi>,
      required: true,
    },
    viewIsFlow: {
      type: Boolean,
      required: true,
    },
    roadWidth: {
      type: Number,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
    getRecord: {
      type: Function,
      required: true,
    },
  }); //里面有问题写在外面维护
  const flowLoading = ref<boolean>(false);
</script>
