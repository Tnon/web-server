<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 14:58:43
 * @LastEditTime: 2023-09-22 16:22:26
-->
<template>
  <strategy-rule ref="ruleRef" :strategyDetal="strategyDetal" />
</template>

<script setup lang="ts">
  import strategyRule from './cmts/rules';
  import { PropType, reactive, ref, unref } from 'vue';
  import { cloneDeep } from 'lodash';
  const props = defineProps({
    modelData: {
      type: Object as PropType<{
        basic: { value: number[]; ctype: number };
        'basic-pwdlen': { value: number; ctype: number };
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
    //表单验证
    return Promise.all([unref(ruleRef).validate()]);
  };
  defineExpose({
    strategyDetal,
    validateAll,
  });
</script>

<style scoped></style>
