<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-02 20:31:57
 * @LastEditTime: 2021-10-12 10:35:11
-->
<template>
  <slots-form
    :formItemLayout="formItemLayout"
    :colsMap="formItems[type]"
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
    type: {
      type: String,
      default: '',
    },
  });
  const { t } = useI18n();
  const formRef = ref<any>();
  const formItems = useFormItems(t);
  const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  defineExpose({ slotsForm, fields: props.fields, formRef });
</script>
