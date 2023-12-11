<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 14:58:43
 * @LastEditTime: 2022-10-12 13:46:05
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
        ip: { value: string[]; ctype: number };
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
    strategyDetal['ip'].value = preendTrim(strategyDetal['ip'].value);
    //表单验证
    return Promise.all([unref(ruleRef.value.textInputs)['ip'].validate()]);
  };
  defineExpose({
    strategyDetal,
    validateAll,
  });
</script>

<style scoped></style>
