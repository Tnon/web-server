<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 15:29:44
 * @LastEditTime: 2023-08-10 19:08:30
-->
<template>
  <div class="container">
    <!-- 华为云服务 start -->
    <div class="tips">{{ t('operation.hwy') }}</div>
    <!-- 华为云服务 end -->
    <div class="line"></div>
    <!-- 基础配置 start -->
    <a-form layout="vertical">
      <div class="smsform">
        <div class="row">
          <!-- appkey start -->
          <a-form-item v-bind="validateInfos.appkey" class="node">
            <template #label>
              <span class="label">APP_Key</span>
            </template>
            <a-input
              type="text"
              v-model:value.trim="modelRef.appkey"
              :placeholder="t('operation.appkeyplac')"
            />
          </a-form-item>
          <!-- appkey end -->

          <!-- APP_Secret start -->
          <a-form-item v-bind="validateInfos.appsecret" class="node">
            <template #label>
              <span class="label">APP_Secret</span>
            </template>
            <a-input
              type="password"
              v-model:value.trim="modelRef.appsecret"
              :placeholder="t('operation.appsecretplac')"
            />
          </a-form-item>
          <!-- APP_Secret end -->
        </div>
        <!-- 接入地址 start -->
        <a-form-item v-bind="validateInfos.baseurl">
          <template #label>
            <span class="label">{{ t('operation.appu') }}</span>
          </template>
          <a-input
            type="text"
            v-model:value.trim="modelRef.baseurl"
            :placeholder="t('operation.btplac')"
          />
        </a-form-item>
        <!-- 接入地址 end -->

        <!-- 签名通道号 start -->
        <a-form-item v-bind="validateInfos.channel">
          <template #label>
            <span class="label">{{ t('operation.td') }}</span>
          </template>
          <a-input
            type="text"
            v-model:value.trim="modelRef.channel"
            :placeholder="t('operation.tdplac')"
          />
        </a-form-item>
        <!-- 签名通道号 end -->
      </div>

      <div class="line"></div>
      <temp-sms
        :templates="modelRef.templates"
        :validate="validate"
        :validateField="validateField"
        :modelRef="modelRef"
      />
    </a-form>
    <!-- 基础配置 end -->
  </div>
</template>

<script setup lang="ts">
  import { Form } from 'ant-design-vue';
  import { reactive, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { validateLength } from '.';
  import tempSms from './cmts/temp-sms';
  import { getHuaWeiSmsApi } from '@/api/operation/notice';
  import { unCompileStr } from '@/utils/urlUtils';
  import { bytesLength } from '@/utils/tools';
  const useForm = Form.useForm;
  const { t } = useI18n();
  //表单
  const modelRef = reactive({
    appkey: '',
    appsecret: '',
    baseurl: '',
    channel: '',
    templates: {
      alarm_single: { id: '', template: t('operation.mbsteo') },
      alarm_group: { id: '', template: t('operation.mbstet') },
    },
  });
  //模版id设置的正确性
  const templateIdRight = computed(
    () =>
      !!(
        modelRef.templates.alarm_group.id &&
        modelRef.templates.alarm_single.id &&
        bytesLength(modelRef.templates.alarm_single.id) <= 40 &&
        bytesLength(modelRef.templates.alarm_group.id) <= 40
      ),
  );
  const rulesRef = reactive({
    appkey: [
      {
        required: true,
        message: t('operation.appre', ['APP_Key']),
      },
      {
        validator: validateLength,
        message: t('operation.ccMax'),
      },
    ],
    appsecret: [
      {
        required: true,
        message: t('operation.appre', ['APP_Secret']),
      },
      {
        validator: validateLength,
        message: t('operation.ccMax'),
      },
    ],
    baseurl: [
      {
        required: true,
        message: t('operation.appre', [t('operation.appu')]),
      },
      {
        validator: validateLength,
        message: t('operation.ccMax'),
      },
    ],
    channel: [
      {
        required: true,
        message: t('operation.appre', [t('operation.td')]),
      },
      {
        validator: validateLength,
        message: t('operation.ccMax'),
      },
    ],
  });
  //获取短信设置
  const getSmsConfig = async () => {
    const { code, ...res } = await getHuaWeiSmsApi();
    !code && Object.assign(modelRef, res, { appsecret: unCompileStr(res.appsecret) });
  };
  getSmsConfig();
  const { validate, validateInfos, validateField } = useForm(modelRef, rulesRef);
  defineExpose({ validate, modelRef, templateIdRight });
</script>

<style scoped lang="less">
  .container {
    :deep(.ant-input) {
      border-radius: 8px;
    }
    .tips {
      font-size: @fz12;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      padding: 8px 16px;
      background: #f8f8f8;
      border-radius: 8px;
      margin: 0 16px;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.08);
      margin-bottom: 16px;
    }
    .smsform {
      padding: 0 16px;
      .label {
        font-size: @fz13;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
      .row {
        display: flex;
        align-items: center;
        .node {
          flex: 1;
          &:nth-child(1) {
            margin-right: 8px;
          }
          &:nth-child(2) {
            margin-left: 8px;
          }
        }
      }
    }
  }
</style>
