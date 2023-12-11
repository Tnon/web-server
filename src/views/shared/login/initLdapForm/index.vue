<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-16 10:05:59
 * @LastEditTime: 2022-11-02 15:32:38
-->
<template>
  <div>
    <slots-form ref="slotRef" :colsMap="formItems" :dis-keys="disKeys" :fields="formData" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, onBeforeUnmount } from 'vue';
  import { useFormItems, initPwdValidate } from './index';
  import slotsForm from '@/components/slots-form';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    formData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    disKeys: {
      type: Object,
      default: () => ({}),
    },
  });
  const { t } = useI18n();
  const formItems = useFormItems(t, props.formData);
  const slotRef = ref<any>('');
  // 在销回之前重置密码的验证规则，重置表单
  onBeforeUnmount(() => {
    initPwdValidate();
  });
  defineExpose({ slotRef, state: props.formData });
</script>
