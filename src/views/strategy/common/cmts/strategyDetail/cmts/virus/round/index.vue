<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 10:55:39
 * @LastEditTime: 2022-09-20 12:01:55
-->
<template>
  <rule-time ref="ruleRef" :state="strategyDetal" />
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash';
  import { reactive, ref, unref } from 'vue';
  import ruleTime from './cmts/ruleTime';
  const props = defineProps({
    modelData: {
      type: Object,
      required: true,
    },
  });

  //策略详情
  const ruleRef = ref<any>();
  const strategyDetal = reactive<any>(cloneDeep(props.modelData));
  //整理数据
  const sortData = () => {
    //周和月 排序
    strategyDetal['time-dom'].value.sort((a, b) => a - b);
    strategyDetal['time-dow'].value.sort((a, b) => a - b);
  };
  //验证
  const validateAll = async () => {
    await sortData();
    //表单验证
    return Promise.all([unref(ruleRef).validate()]);
  };
  defineExpose({
    strategyDetal,
    validateAll,
  });
</script>

<style scoped></style>
