<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 22:10:47
 * @LastEditTime: 2023-07-18 11:35:38
-->
<template>
  <a-form layout="vertical" class="cusform">
    <div class="tips">
      <ExclamationCircleFilled />
      <div class="text">{{ t('operation.slfklo') }}</div>
    </div>
    <!-- 接收人姓名 start -->
    <a-form-item v-bind="validateInfos.name">
      <template #label>
        <div class="label">{{ t('operation.jsrxm') }}</div>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.name"
        :placeholder="t('operation.appre', [t('operation.jsrxm')])"
      />
    </a-form-item>
    <!-- 接收人姓名 end -->

    <!-- 手机号 start -->
    <a-form-item v-bind="validateInfos.mobile">
      <template #label>
        <div class="label">{{ t('operation.sjh') }}</div>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.mobile"
        :placeholder="t('operation.appre', [t('operation.sjh')])"
      />
    </a-form-item>
    <!-- 手机号 end -->

    <!-- 邮箱 start -->
    <a-form-item v-bind="validateInfos.email">
      <template #label>
        <div class="label">{{ t('setting.email') }}</div>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.email"
        :placeholder="t('operation.appre', [t('setting.email')])"
      />
    </a-form-item>
    <!-- 邮箱 end -->

    <!-- 告警语言 start -->
    <a-form-item v-bind="validateInfos.language">
      <template #label>
        <div class="label">{{ t('setting.msgLang') }}</div>
      </template>
      <a-radio-group v-model:value="modelRef.language">
        <a-radio class="leftzn" :value="E_MSGLANG.ZH">{{ t('setting.msgZH') }}</a-radio>
        <a-radio :value="E_MSGLANG.EN">{{ t('setting.msgEN') }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <!-- 告警语言 end -->
  </a-form>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue';
  import { reactive, computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ExclamationCircleFilled } from '@ant-design/icons-vue';
  import { validateME, validateEmail, validateLen } from '.';
  import { E_MSGLANG } from '@/enums/alarm';
  const props = defineProps<{
    name?: string;
    mobile?: string;
    email?: string;
    language?: E_MSGLANG;
  }>();
  const useForm = Form.useForm;
  const { t } = useI18n();
  const modelRef = reactive({
    name: props.name ?? '',
    mobile: props.mobile ?? '',
    email: props.email ?? '',
    language: props.language ?? undefined,
  });
  const isDoubleEmpty = computed(() => !modelRef.email && !modelRef.mobile);
  const rulesRef = reactive({
    name: [
      {
        required: true,
        message: t('operation.appre', [t('operation.jsrxm')]),
      },
      {
        validator: validateLen,
        message: t('operation.validleng', [t('operation.jsrxm')]),
      },
    ],
    mobile: [
      {
        validator: validateME(isDoubleEmpty),
        message: t('operation.slfklo'),
      },
      {
        validator: validateLen,
        message: t('operation.validleng', [t('operation.sjh')]),
      },
    ],
    email: [
      {
        validator: validateME(isDoubleEmpty),
        message: t('operation.slfklo'),
      },
      {
        message: t('setting.emailPlac'),
        validator: validateEmail,
      },
      {
        validator: validateLen,
        message: t('operation.validleng', [t('setting.email')]),
      },
    ],
    language: [
      {
        required: true,
        message: t('setting.msglsgp'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  watch([() => modelRef.email, () => modelRef.mobile], () => {
    validate(['mobile', 'email']);
  });
  defineExpose({ modelRef, validate });
</script>
<style lang="less" scoped>
  .tips {
    border-radius: 8px;
    display: flex;
    align-items: baseline;
    color: #3d3d3d;
    padding: 8px 16px;
    background: #f4f4f4;
    margin-bottom: 24px;
    .text {
      margin-left: 8px;
    }
  }
  .cusform {
    :deep(.ant-input) {
      border-radius: 8px;
    }
  }
  .label {
    font-size: @fz13;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
  .leftzn {
    margin-right: 40px;
  }
</style>
