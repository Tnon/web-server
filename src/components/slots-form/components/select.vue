<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-11 18:34:04
 * @LastEditTime: 2022-04-24 15:33:36
-->
<template>
  <a-select
    :placeholder="formItem.placeholder"
    v-model:value="modelValue"
    :disabled="disKeys[dataIndex] || disabled"
  >
    <template v-if="formItem.options && formItem.options.length">
      <template v-for="option in formItem.options" :key="option.value">
        <a-select-option :value="option.value">
          {{ option.label }}
        </a-select-option>
      </template>
    </template>
    <template v-else>
      <template v-for="option in asyncOptions" :key="option.id">
        <a-select-option :value="option.id">
          {{ option.repname }}
        </a-select-option>
      </template>
    </template>
  </a-select>
</template>
<script lang="ts" setup>
  import { PropType, computed, onMounted, reactive } from 'vue';
  import { FormItem } from '@/types/schema';
  import { isFunction } from '@/utils/is';
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
    value: undefined as any, // 表单项值
    disabled: Boolean,
  });
  const emit = defineEmits(['update:value']);
  const asyncOptions = reactive<any>([]);
  const getOptions = async () => {
    if (isFunction(props.formItem.asyncOptions)) {
      const data = await props.formItem.asyncOptions();
      Object.assign(asyncOptions, data);
    }
  };

  const modelValue = computed({
    get: () => props.value,
    set: (val) => emit('update:value', val),
  });
  onMounted(() => {
    getOptions();
  });
</script>
