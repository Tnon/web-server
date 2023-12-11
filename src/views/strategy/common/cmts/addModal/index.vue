<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-02 20:31:57
 * @LastEditTime: 2021-07-22 10:21:58
-->
<template>
  <slots-form
    :formItemLayout="formItemLayout"
    :colsMap="formItems"
    :fields="fields"
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
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  defineExpose({ formRef, fields: props.fields });
</script>
