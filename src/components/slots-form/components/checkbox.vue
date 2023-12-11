<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-19 16:18:57
 * @LastEditTime: 2022-04-24 15:32:15
-->
<template>
  <a-checkbox-group
    v-model:value="modelValue"
    v-bind="formItem"
    :disabled="disKeys[dataIndex] || disabled"
  >
    <template v-if="formItem.options && formItem.options.length">
      <template v-for="option in formItem.options" :key="option.value">
        <a-checkbox :value="option.value">
          {{ option.label }}
        </a-checkbox>
      </template>
    </template>
  </a-checkbox-group>
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
    disabled: Boolean,
    disKeys: {
      type: Object,
      required: true,
    },
    dataIndex: {
      type: String,
      required: true,
    },
    value: undefined as any, // 表单项值
  });
  const emit = defineEmits(['update:value']);
  const modelValue = computed({
    get: () => props.value,
    set: (val) => emit('update:value', val),
  });
</script>
