<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-02 20:31:57
 * @LastEditTime: 2021-08-05 09:28:34
-->
<template>
  <slots-forms
    :formItemLayout="formItemLayout"
    :colsMap="formItems"
    :fields="fields"
    ref="slotsForm"
  />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useFormItems } from './index';
  import slotsForms from '@/components/slots-form';
  const props = defineProps({
    fields: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
  const slotsForm = ref<any>();
  const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const formItems = useFormItems(t);
  defineExpose({ slotsForm, fields: props.fields });
</script>
