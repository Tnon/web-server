<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 11:52:51
 * @LastEditTime: 2022-07-19 21:12:42
-->
<template>
  <a-progress
    :percent="state.successPer + state.updatePer"
    :success="{ percent: state.successPer, strokeColor: '#18BA79' }"
    type="circle"
    trailColor="#F75555"
    strokeColor="#F8A556"
    :width="120"
    :strokeWidth="7"
  >
    <template #format>
      <div class="title">{{ title }}</div>
      <div class="value" @click="changeFilter!(filterType)">{{ success }}</div>
    </template>
  </a-progress>
</template>

<script setup lang="ts">
  import { reactive, watchEffect } from 'vue';

  const props = defineProps({
    success: Number,
    update: Number,
    error: Number,
    title: String,
    changeFilter: Function,
    filterType: Number,
  });
  const state = reactive({
    successPer: 0,
    updatePer: 0,
    errorPer: 0,
  });
  watchEffect(() => {
    const total = props.error! + props.success! + props.update!;
    if (total) {
      state.successPer = ~~((props.success! / total) * 100).toFixed(2);
      state.updatePer = ~~((props.update! / total) * 100).toFixed(2);
      state.errorPer = ~~((props.error! / total) * 100).toFixed(2);
    }
  });
</script>

<style scoped lang="less">
  .title {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    line-height: 24px;
  }
  .value {
    font-size: @fz16;
    font-weight: 600;
    color: #18ba79;
    line-height: 24px;
    cursor: pointer;
  }
</style>
