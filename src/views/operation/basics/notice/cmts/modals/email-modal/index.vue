<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 20:37:15
 * @LastEditTime: 2023-08-14 09:09:57
-->
<template>
  <a-form layout="vertical" class="cusForm">
    <!-- 邮件服务器 start -->
    <a-form-item v-bind="validateInfos.host">
      <template #label>
        <span class="label">{{ t('setting.mailSer') }}</span>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.host"
        :placeholder="t('operation.fwxa', ['smtp.exmail.qq.com'])"
      />
    </a-form-item>
    <!-- 邮件服务器 end -->
    <div class="row">
      <!-- 通信协议 start -->
      <a-form-item v-bind="validateInfos.encryption" class="node">
        <template #label>
          <span class="label">{{ t('setting.comPro') }}</span>
        </template>
        <a-select
          :placeholder="t('setting.proPlac')"
          :options="sslOptions"
          v-model:value="modelRef.encryption"
        />
      </a-form-item>
      <!-- 通信协议 end -->

      <!-- 端口 start -->
      <a-form-item v-bind="validateInfos.port" class="node">
        <template #label>
          <span class="label">{{ t('setting.port') }}</span>
        </template>
        <a-input
          type="text"
          v-model:value.trim="modelRef.port"
          :placeholder="t('setting.portPlac')"
        />
      </a-form-item>
      <!-- 端口 end -->
    </div>
    <!-- 跳过证书认证 start -->
    <a-form-item v-bind="validateInfos.skipcert" class="node">
      <template #label>
        <span class="label">{{ t('setting.skipCertificate') }}</span>
      </template>
      <a-select
        :placeholder="t('setting.skipPlac')"
        :options="skipOptions"
        v-model:value="modelRef.skipcert"
      />
    </a-form-item>
    <!-- 跳过证书认证 end -->

    <!-- 发送邮件的邮箱地址 start -->
    <a-form-item v-bind="validateInfos.username" class="node">
      <template #label>
        <span class="label">{{ t('setting.emailAddF') }}</span>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.username"
        :placeholder="t('operation.fwxa', ['Message@Anxinsec.com'])"
      />
    </a-form-item>
    <!-- 发送邮件的邮箱地址 end -->

    <!-- 发送邮件的邮箱密码 start -->
    <a-form-item v-bind="validateInfos.password" class="node">
      <template #label>
        <span class="label">{{ t('setting.emPwd') }}</span>
      </template>
      <div class="hasBtn">
        <a-input
          type="password"
          class="ipt"
          v-model:value.trim="modelRef.password"
          placeholder="*****"
        />
        <a-button class="btn" :loading="emailValid" @click="testEmail">
          {{ t('setting.verfEmail') }}
        </a-button>
      </div>
    </a-form-item>
    <!-- 发送邮件的邮箱密码 end -->

    <!-- 发送邮件的邮箱名字 start -->
    <a-form-item v-bind="validateInfos.from" class="node">
      <template #label>
        <span class="label">{{ t('setting.sendEName') }}</span>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.from"
        :placeholder="t('setting.namePlac')"
      />
    </a-form-item>
    <!-- 发送邮件的邮箱名字 end -->
  </a-form>
</template>
<script lang="ts" setup>
  import { Form, message } from 'ant-design-vue';
  import { reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getSslOptions } from '.';
  import { ValidatePort, validateEmail, validateEmailServer, validateFromLen } from '@/utils/reg';
  import { cloneDeep } from 'lodash';
  import { compileStr, unCompileStr } from '@/utils/urlUtils';
  import { getEmailConfigApi, getEmailTestApi } from '@/api/operation/notice';
  const useForm = Form.useForm;
  const { t } = useI18n();
  const { sslOptions, skipOptions } = getSslOptions(t);
  const modelRef = reactive({
    host: '',
    encryption: undefined,
    port: '',
    skipcert: undefined,
    username: '',
    password: '',
    from: '',
  });
  const rulesRef = reactive({
    host: [
      {
        required: true,
        message: t('setting.mailPlac'),
        validator: validateEmailServer,
      },
    ],
    encryption: [
      {
        required: true,
        message: t('setting.proPlac'),
      },
    ],
    port: [
      {
        required: true,
        message: t('setting.portPlac'),
        validator: ValidatePort,
      },
    ],
    skipcert: [
      {
        required: true,
        message: t('setting.skipPlac'),
      },
    ],
    username: [
      {
        required: true,
        message: t('setting.emailPlac'),
        validator: validateEmail,
      },
    ],
    password: [
      {
        required: true,
        message: t('setting.pwdPlac'),
      },
    ],
    from: [
      {
        message: t('setting.fromPlac'),
        validator: validateFromLen,
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  //邮箱验证
  const emailValid = ref<boolean>(false);
  const testEmail = async () => {
    try {
      await validate();
    } catch {
      return;
    }
    emailTest(true);
  };
  // 邮箱验证
  const emailTest = async (bool: boolean) => {
    if (bool) {
      emailValid.value = true;
    }
    // 修改发送邮件配置
    const smtp: any = cloneDeep(modelRef);
    smtp.password = compileStr(smtp.password);
    const { code } = await getEmailTestApi(Object.assign(smtp, { validate: undefined }));
    if (!code && bool) {
      message.success(t('setting.verfEmSuc'));
    }
    emailValid.value = false;
    return Promise.resolve({ code });
  };
  // 获取发送邮件配置
  const getEmailConfig = async () => {
    const smtp = await getEmailConfigApi();
    //表单默认ssl
    if (!smtp.encryption) {
      smtp.encryption = 'ssl';
      smtp.port = '465';
    }
    //前端解密自己加密的密码
    smtp.password = unCompileStr(smtp.password);
    smtp.skipcert = smtp.skipcert ? smtp.skipcert : 'false';
    Object.assign(modelRef, smtp);
  };
  getEmailConfig();
  //监听通讯协议
  watch(
    () => modelRef.encryption,
    (v) => {
      if (v === 'ssl') {
        modelRef.port = '465';
      } else if (v === 'none') {
        modelRef.port = '25';
      } else {
        modelRef.port = '587';
      }
    },
  );
  defineExpose({ modelRef, validate, emailTest });
</script>
<style lang="less" scoped>
  .cusForm {
    :deep(.ant-input) {
      border-radius: 8px;
    }
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
  .hasBtn {
    display: flex;
    align-items: center;
    .ipt {
      flex: 1;
    }
    .btn {
      margin-left: 16px;
    }
  }
</style>
