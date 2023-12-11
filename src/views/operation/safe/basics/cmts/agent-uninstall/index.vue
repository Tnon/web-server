<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-07-20 10:34:53
-->
<template>
  <div class="box">
    <div class="title">{{ t('operation.client') }}</div>
    <swt-card
      v-bind="options"
      v-model:isOpen="isOpenPwd"
      @confirm="confirm"
      @switchChange="switchChange"
      class="card"
    >
      <a-form>
        <a-form-item v-bind="validateInfos.passcode">
          <a-input-password type="password" v-model:value.trim="modelRef.passcode" class="slots" />
        </a-form-item>
      </a-form>
    </swt-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, unref } from 'vue';
  import { swtCard } from '@/views/operation/components/swt-card';
  import {
    updateAgentUniApi,
    getAgentUninstallApi,
    controlAgentUniApi,
  } from '@/api/operation/safe';
  import { message, Form } from 'ant-design-vue';
  import { ValidateAgentPwd } from '@/utils/reg';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const { t } = useI18n();
  //卸载密码
  // const passcode = ref<string>('')
  const modelRef = reactive({
    passcode: '',
  });
  const rulesRef = reactive({
    passcode: [
      {
        message: t('setting.agtUisPwd'),
        validator: ValidateAgentPwd,
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  //选项
  const options = {
    title: 'setting.agtUniTit',
    subtitle: t('setting.regChPwd'),
    label: t('setting.uniPwdSet'),
  };
  //是否开启
  const isOpenPwd = ref<boolean>(false);

  // 保存agent卸载密码设置
  const confirm = async () => {
    if (modelRef.passcode) {
      try {
        await validate();
      } catch {
        return false;
      }
      await updateAgentUniApi({
        enabled: unref(isOpenPwd),
        passcode: modelRef.passcode,
      });
    } else {
      message.error(t('setting.setUinPwd'));
    }
  };

  // 获取agent卸载密码
  const getAgentUninstall = async () => {
    const { passcode, enabled } = await getAgentUninstallApi();
    modelRef.passcode = passcode;
    isOpenPwd.value = !!enabled;
  };
  getAgentUninstall();

  // 控制设置密码开关
  const switchChange = async () => {
    await controlAgentUniApi({
      enabled: unref(isOpenPwd),
      passcode: modelRef.passcode,
    });
    unref(isOpenPwd) ? message.success(t('setting.enaSuc')) : message.success(t('setting.delSuc'));
  };
</script>
<style lang="less" scoped>
  .box {
    margin-bottom: 24px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .card {
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
    .slots {
      border-radius: 8px;
      margin-left: 8px;
    }
  }
</style>
