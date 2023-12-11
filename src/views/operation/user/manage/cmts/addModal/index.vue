<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-16 10:05:59
 * @LastEditTime: 2022-10-28 16:40:48
-->
<template>
  <div>
    <slots-form ref="slotRef" :colsMap="formItems" :dis-keys="disKeys" :fields="formData" />
    <!-- 角色类型和可管理主机组 start -->
    <role-host-group ref="extraSlotRef" :isEmbed="isEmbed" :formDataExtra="formDataExtra" />
    <!-- 角色类型和可管理主机组 end -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, onBeforeUnmount } from 'vue';
  import { useFormItems, initPwdValidate } from './index';
  import slotsForm from '@/components/slots-form';
  import roleHostGroup from './cmts/roleHostGroup';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    formData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    formDataExtra: {
      type: Object,
      required: true,
    },
    isadd: {
      type: Boolean,
      required: true,
    },
    disKeys: {
      type: Object,
      default: () => ({}),
    },
    isEmbed: {
      type: Boolean,
      required: true,
    },
  });
  const { t } = useI18n();
  const formItems = useFormItems(t, props.formData, props.isadd);
  const slotRef = ref<any>('');
  const extraSlotRef = ref<any>('');
  // 在销回之前重置密码的验证规则，重置表单
  onBeforeUnmount(() => {
    initPwdValidate();
    // unref(slotRef).resetFields();
    // unref(extraSlotRef).resetFields();
  });
  defineExpose({ slotRef, extraSlotRef, state: props.formData });
</script>
