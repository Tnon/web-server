<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-06-29 14:09:26
-->
<template>
  <div>
    <div class="msg">{{ labelText }}</div>
    <a-form>
      <a-form-item v-bind="validateInfos.pwdValue">
        <a-input
          type="password"
          v-model:value.trim="modelRef.pwdValue"
          :placeholder="t('asset.pIptPwdAd')"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue';
  import { reactive, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const { t } = useI18n();
  defineProps({
    labelText: String,
  });
  const modelRef = reactive({
    pwdValue: '',
  });
  const rulesRef = reactive({
    pwdValue: [
      {
        required: true,
        message: t('asset.pIptPwdAd'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  defineExpose({ ...toRefs(modelRef), validate });
</script>
<style lang="less" scoped>
  .msg {
    margin-bottom: 16px;
    font-size: @fz13;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
