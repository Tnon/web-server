<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-01-13 15:33:44
-->
<template>
  <a-form>
    <a-form-item v-bind="validateInfos.server_ip">
      <a-input
        type="text"
        v-model:value.trim="modelRef.server_ip"
        :placeholder="t('operation.fudippacl')"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { validateIpPort } from '@/views/operation/upgrade/client/cmts/pwdInstall';
  import { Form } from 'ant-design-vue';
  import { reactive, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const props = defineProps({
    server_ip: String,
  });
  const { t } = useI18n();
  const modelRef = reactive({
    server_ip: props.server_ip,
  });
  const rulesRef = reactive({
    server_ip: [
      {
        required: true,
        message: t('operation.pincre', [t('operation.fudip')]),
      },
      {
        validator: validateIpPort,
        message: t('operation.pincre', [t('operation.fudip')]),
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  defineExpose({ ...toRefs(modelRef), validate });
</script>
