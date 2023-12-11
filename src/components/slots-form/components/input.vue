<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-19 16:18:57
 * @LastEditTime: 2023-10-30 14:32:38
-->
<template>
  <div class="inputBtn">
    <a-input
      :type="formItem.type"
      :placeholder="formItem.placeholder"
      v-model:value="modelValue"
      :disabled="disKeys[dataIndex] || disabled"
    />
    <slot v-if="formItem.extraSlot"></slot>
  </div>
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
<style lang="less" scoped>
  .inputBtn {
    display: flex;
    .btn {
      margin-left: 20px;
    }
  }
</style>
