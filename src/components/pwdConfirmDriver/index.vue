<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-09-21 13:55:01
-->
<template>
  <a-form>
    <a-form-item v-bind="validateInfos.type">
      <a-checkbox-group class="checkG" v-model:value="modelRef.type">
        <a-checkbox :value="1" name="type">{{ t('operation.nez') }}</a-checkbox>
        <a-checkbox :value="2" name="type">{{ t('operation.cj') }}</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item v-bind="validateInfos.pwdValue">
      <a-input
        type="password"
        v-model:value.trim="modelRef.pwdValue"
        :placeholder="t('asset.pIptPwdAd')"
      />
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
    type: [1, 2],
    pwdValue: '',
  });
  const rulesRef = reactive({
    type: [
      {
        type: 'array',
        required: true,
        message: t('operation.qlskfg'),
        trim: 'change',
      },
    ],
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
