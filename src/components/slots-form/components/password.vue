<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-04-24 15:33:18
-->
<template>
  <div class="inputBtn">
    <a-popover placement="right" v-if="formItem.mode" destroyTooltipOnHide trigger="focus">
      <template #content>
        <pwd-level v-bind="formItem.mode" />
      </template>
      <a-input
        :type="formItem.type"
        :placeholder="formItem.placeholder"
        v-model:value.trim="modelValue"
        :disabled="disKeys[dataIndex] || disabled"
      />
    </a-popover>
    <a-input
      v-else
      :type="formItem.type"
      :placeholder="formItem.placeholder"
      v-model:value.trim="modelValue"
      :disabled="disKeys[dataIndex] || disabled"
    />
    <slot v-if="formItem.extraSlot"></slot>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { FormItem } from '@/types/schema';
  import { pwdLevel } from '@/components/pwdLevel';

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
