<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-10-30 14:30:05
-->
<template>
  <a-form>
    <a-form-item v-bind="validateInfos.mark">
      <a-input type="text" v-model:value="modelRef.mark" :placeholder="t('arcomn.pmakrs')" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue';
  import { reactive, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const { t } = useI18n();
  const modelRef = reactive({
    mark: '',
  });
  const rulesRef = reactive({});
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  defineExpose({ ...toRefs(modelRef), validate });
</script>
