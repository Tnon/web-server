<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 10:55:39
 * @LastEditTime: 2022-09-20 12:11:14
-->
<template>
  <strategy-rule ref="ruleRef" :strategyDetal="strategyDetal" />
</template>

<script setup lang="ts">
  import { preendTrim } from '@/utils/tools';
  import { cloneDeep } from 'lodash';
  import { reactive, ref, unref } from 'vue';
  import strategyRule from './cmts/rules';

  const props = defineProps({
    modelData: {
      type: Object,
      required: true,
    },
  });
  //策略详情
  const ruleRef = ref<any>();
  let {
    'ip-pattern': ipPattern,
    'account-pattern': accountPattern,
    ...timeObj
  } = cloneDeep(props.modelData);
  //响应式结构体
  const strategyDetal = reactive({
    'ip-pattern': ipPattern,
    'account-pattern': accountPattern,
    timeObj,
  });
  //整理数据
  const sortData = () => {
    //周和月 排序
    strategyDetal.timeObj['time-dom'].value.sort((a, b) => a - b);
    strategyDetal.timeObj['time-dow'].value.sort((a, b) => a - b);
    //整理表单域
    strategyDetal['ip-pattern'].value = preendTrim(strategyDetal['ip-pattern'].value);
    strategyDetal['account-pattern'].value = preendTrim(strategyDetal['account-pattern'].value);
  };
  //验证
  const validateAll = async () => {
    await sortData();
    //表单验证
    return Promise.all([
      unref(ruleRef.value.textInputs)['ip-pattern'].validate(),
      unref(ruleRef.value.textInputs)['account-pattern'].validate(),
      unref(ruleRef.value.ruleTimeRef).validate(),
    ]);
  };
  defineExpose({
    strategyDetal: {
      'ip-pattern': strategyDetal['ip-pattern'],
      'account-pattern': strategyDetal['account-pattern'],
      ...strategyDetal.timeObj,
    },
    validateAll,
  });
</script>
