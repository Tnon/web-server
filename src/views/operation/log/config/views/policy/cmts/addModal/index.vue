<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-02 20:31:57
 * @LastEditTime: 2023-08-29 17:14:52
-->
<template>
  <slots-form
    :formItemLayout="formItemLayout"
    :colsMap="formItems"
    :fields="fields"
    class="customForm"
    ref="formRef"
  />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useFormItems } from './index';
  import slotsForm from '@/components/slots-form';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    fields: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
  const formItems = useFormItems(t);
  const formRef = ref<any>();
  const formItemLayout = {
    layout: 'vertical',
    hideRequiredMark: true,
  };
  defineExpose({ formRef, fields: props.fields });
</script>
<style lang="less" scoped>
  .customForm {
    :deep(.ant-form-item-label > label) {
      color: rgba(0, 0, 0, 0.8);
      font-size: @fz13;
      font-weight: 600;
    }
  }
</style>
