<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-19 16:18:57
 * @LastEditTime: 2022-04-24 15:33:44
-->
<template>
  <a-textarea
    :disabled="disKeys[dataIndex] || disabled"
    :placeholder="formItem.placeholder"
    v-model:value="modelValue"
  />
</template>
<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { FormItem } from '@/types/schema';
  const props = defineProps({
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
    disKeys: {
      type: Object,
      required: true,
    },
    dataIndex: {
      type: String,
      required: true,
    },
    disabled: Boolean,
    value: undefined as any, // 表单项值
  });
  const emit = defineEmits(['update:value']);
  const modelValue = computed({
    get: () => props.value,
    set: (val) => emit('update:value', val),
  });
</script>
