<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-11-01 11:07:08
 * @LastEditTime: 2022-12-26 11:32:36
-->
<template>
  <a-form class="customForm" :labelCol="{ span: 5 }" autocomplete="off">
    <a-form-item :label="t('user.ldapSet')" name="ldap_enable" v-bind="vInfos.ldap_enable">
      <a-switch v-model:checked="formState.ldap_enable" />
    </a-form-item>
    <a-form-item :label="t('user.serverAdr')" name="ldap_server" v-bind="vInfos.ldap_server">
      <a-input type="text" :disabled="!isDisabled" v-model:value.trim="formState.ldap_server" />
    </a-form-item>
    <a-form-item :label="t('asset.port')" name="ldap_port" v-bind="vInfos.ldap_port">
      <a-input :disabled="!isDisabled" v-model:value.trim="formState.ldap_port" />
      <div class="tips"> ldap://hostname:port {{ t('user.or') }} ldaps://hostname:port </div>
    </a-form-item>
    <a-form-item :label="t('operation.initrole')" name="u_type" v-bind="vInfos.u_type">
      <a-select
        :placeholder="t('operation.ldrolePlac')"
        :disabled="!isDisabled"
        v-model:value="formState.u_type"
      >
        <a-select-option :value="LDAPROLE.ADMIN">{{ t('user.sysAdmin') }} </a-select-option>
        <a-select-option :value="LDAPROLE.YUNWEI">{{ t('user.yunwadmi') }} </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="t('user.userRealName')" name="entry_dn" v-bind="vInfos.entry_dn">
      <a-textarea :disabled="!isDisabled" v-model:value.trim="formState.entry_dn" />
      <div class="tips"> {{ t('user.example') }}cn=administrator,cn=users,dc=domain,dc=org </div>
    </a-form-item>
    <a-form-item :label="t('common.password')" name="entry_pwd" v-bind="vInfos.entry_pwd">
      <a-input :disabled="!isDisabled" type="password" v-model:value.trim="formState.entry_pwd" />
    </a-form-item>
    <a-button
      type="dashed"
      :disabled="!isDisabled"
      :loading="testLoading"
      class="testBtn"
      @click="testLadp"
    >
      {{ t('user.ldapConT') }}
    </a-button>
  </a-form>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, toRef, ref } from 'vue';
  import { FormProps } from './index';
  import { getLdapCfg, testLdapCfg } from '@/api/operation/user';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { ValidateLdap, ValidatePort } from '@/utils/reg';
  import { LDAPROLE } from '@/enums/roleEnum';
  const { t } = useI18n();
  const testLoading = ref<boolean>(false);
  // ldap表单
  const formState = reactive<FormProps>({
    ldap_enable: false,
    ldap_server: '',
    ldap_port: '',
    u_type: undefined,
    entry_pwd: '',
    entry_dn: '',
  });
  //form hook
  const useForm = Form.useForm;
  //表单验证
  const Rules = reactive({
    ldap_server: [
      {
        required: true,
        message: t('user.ldapServer'),
        validator: ValidateLdap,
      },
    ],
    ldap_port: [
      {
        required: true,
        message: t('setting.portPlac'),
        validator: ValidatePort,
      },
    ],
    u_type: [
      {
        required: true,
        message: t('operation.ldrolePlac'),
      },
    ],
    entry_dn: [
      {
        required: true,
        message: t('user.entDn'),
      },
    ],
    entry_pwd: [
      {
        required: true,
        message: t('user.piptPwd'),
      },
    ],
  });
  //form hook
  const { validate, validateInfos: vInfos } = useForm(formState, Rules);

  //是否禁用
  const isDisabled = toRef(formState, 'ldap_enable');
  const getCfg = async () => {
    const { code, ldap_enable, ...res } = await getLdapCfg();
    if (!code) {
      Object.assign(formState, { ldap_enable }, res);
    }
  };
  //调用接口
  onMounted(async () => {
    getCfg();
  });
  //测试ladp
  const testLadp = async () => {
    try {
      await validate();
      testLoading.value = true;
      await testLdapCfg(formState);
      testLoading.value = false;
    } catch {}
  };

  defineExpose({
    formState,
    validate,
  });
</script>

<style scoped lang="less">
  .customForm {
    ::v-deep(.ant-input) {
      border-radius: 8px;
    }
  }
  .tips {
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
  }
  .testBtn {
    margin-left: 98px;
  }
</style>
