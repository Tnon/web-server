<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 14:58:43
 * @LastEditTime: 2022-09-23 11:05:48
-->
<template>
  <strategy-rule ref="ruleRef" :strategyDetal="strategyDetal" />
</template>

<script setup lang="ts">
  import { preendTrim } from '@/utils/tools';
  import strategyRule from './cmts/rules';
  import { PropType, reactive, ref, unref } from 'vue';
  import { cloneDeep } from 'lodash';
  const props = defineProps({
    modelData: {
      type: Object as PropType<{
        regex: { value: string[]; ctype: number };
        set: { value: string[]; ctype: number };
      }>,
      required: true,
    },
  });
  //策略详情
  const strategyDetal = reactive(cloneDeep(props.modelData));
  //策略详情
  const ruleRef = ref<any>();
  //验证
  const validateAll = async () => {
    //整理表单域
    strategyDetal.regex.value = preendTrim(strategyDetal.regex.value);
    strategyDetal.set.value = preendTrim(strategyDetal.set.value);
    //表单验证
    return Promise.all([
      unref(ruleRef.value.textInputs)['regex'].validate(),
      unref(ruleRef.value.textInputs)['set'].validate(),
    ]);
  };
  defineExpose({
    strategyDetal,
    validateAll,
  });
</script>

<style scoped></style>
