<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 10:02:16
 * @LastEditTime: 2023-10-16 11:25:47
-->
<template>
  <div class="header">
    <!-- 通知 title start -->
    <div class="title">
      <custom-icon type="#ax-wh-notice" class="nIcon" />
      <span class="text">{{ t('operation.basicsNotice') }}</span>
    </div>
    <!-- 通知 title end -->
    <div class="tools">
      <!-- 短信设置 start -->
      <a-button class="btn" type="text" @click="openSms">
        <template #icon>
          <setting-outlined />
        </template>
        {{ t('operation.dxsz') }}
      </a-button>
      <!-- 短信设置 end -->

      <!-- 邮件设置 start -->
      <a-button class="btn" type="text" @click="openEmail">
        <template #icon>
          <setting-outlined />
        </template>
        {{ t('operation.yjsz') }}
      </a-button>
      <!-- 邮件设置 end -->

      <!-- 接收人管理 start -->
      <a-button class="btn" type="text" @click="openAccept">
        <template #icon>
          <setting-outlined />
        </template>
        {{ t('operation.jsrgl') }}
      </a-button>
      <!-- 接收人管理 end -->
    </div>
  </div>
  <!-- 提示语 start -->
  <div class="tips" v-if="tipsShow">
    <div class="left">
      <InfoCircleFilled />
      <span class="text">
        {{
          emailSmsResult === E_ValidateResult.None
            ? t('operation.yjdxtips')
            : emailSmsResult === E_ValidateResult.Email
            ? t('operation.yjtips')
            : t('operation.dxtips')
        }}
      </span>
    </div>
    <close-outlined class="close" @click="closeTips" />
  </div>
  <!-- 提示语 end -->
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { SettingOutlined, InfoCircleFilled, CloseOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import smsModal from '../modals/sms-modal';
  import emailModal from '../modals/email-modal';
  import drawContent from '../modals/draw-content';
  import { compileStr } from '@/utils/urlUtils';
  import { E_Validate, E_ValidateResult } from './type';
  import { getEmSmsRes, updateEmailConfigApi, setSmsConfig } from '@/api/operation/notice';
  import useCreatDraw from '@/hooks/use-click-row';
  import { ref, unref } from 'vue';
  const props = defineProps<{
    emailSmsResult: E_ValidateResult;
    refreshNoticeType: Function;
  }>();
  const emit = defineEmits(['update:emailSmsResult']);
  const { t } = useI18n();
  const tipsShow = ref(false);
  //短信服务设置
  const openSms = () => {
    useModal(
      {
        title: t('operation.smsset'),
        width: 640,
        wrapClassName: 'modalBodyNopad',
        handleOk: async (contRef) => {
          await contRef.validate();
          if (unref(contRef.templateIdRight)) {
            const { code } = await setSmsConfig(
              Object.assign({}, contRef.modelRef, {
                appsecret: compileStr(contRef.modelRef.appsecret),
              }),
            );
            if (code) {
              return Promise.reject();
            }
            getEmailSmsConfig();
          } else {
            return Promise.reject();
          }
        },
      },
      smsModal,
    );
  };
  //邮件服务设置
  const openEmail = () => {
    useModal(
      {
        title: t('setting.smtpSeting'),
        handleOk: async (contRef) => {
          await contRef.validate();
          // 修改发送邮件配置
          const smtp = Object.assign({}, contRef.modelRef);
          smtp.password = compileStr(smtp.password);
          //验证邮箱是否通过
          const { code: testCode } = await contRef.emailTest(false);
          if (testCode) {
            smtp.validate = E_Validate.Error;
            return Promise.reject();
          } else {
            smtp.validate = E_Validate.Success;
          }
          const { code } = await updateEmailConfigApi(smtp);
          if (!code) {
            getEmailSmsConfig();
          }
        },
      },
      emailModal,
    );
  };
  //接收人管理
  const openAccept = () => {
    useCreatDraw(
      {
        title: t('operation.jsrgl'),
        width: 680,
        contentProps: {
          drawClass: 'noHeader',
          refreshNoticeType: props.refreshNoticeType,
        },
      },
      drawContent,
    );
  };

  //查询是否配置
  const getEmailSmsConfig = async () => {
    const { email, sms, code } = await getEmSmsRes();
    if (!code) {
      if (email === E_Validate.Error) {
        tipsShow.value = true;
        if (sms === E_Validate.Error) {
          emit('update:emailSmsResult', E_ValidateResult.None);
        } else {
          emit('update:emailSmsResult', E_ValidateResult.Email);
        }
      } else {
        if (sms === E_Validate.Error) {
          tipsShow.value = true;
          emit('update:emailSmsResult', E_ValidateResult.Sms);
        } else {
          tipsShow.value = false;
          emit('update:emailSmsResult', E_ValidateResult.Success);
        }
      }
    }
  };
  getEmailSmsConfig();

  const closeTips = () => {
    tipsShow.value = false;
  };
</script>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      .nIcon {
        width: 40px;
        height: 40px;
        color: #fff;
        border-radius: 10px;
        padding: 6px;
        background-color: @primary-color;
        margin-right: 16px;
      }
      .text {
        font-size: @fz20;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .tools {
      display: flex;
      align-items: center;
      // .btn {
      //   margin-left: 16px;
      // }
    }
  }
  .tips {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: rgba(248, 165, 86, 0.1);
    color: #f8a556;
    margin-top: 16px;
    border-radius: 8px;
    font-size: @fz13;
    .left {
      display: flex;
      align-items: center;
      .text {
        margin-left: 8px;
      }
    }
    .close {
      cursor: pointer;
    }
  }
</style>
