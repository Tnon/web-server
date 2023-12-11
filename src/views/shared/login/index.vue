<template>
  <div class="login-box">
    <a-form :model="state.formInline" @submit="handleSubmit">
      <div class="title">{{ productName }}</div>
      <a-form-item>
        <a-input
          v-model:value.trim="state.formInline.username"
          size="large"
          :placeholder="t('login.loginPlac')"
        >
          <template #prefix> <UserOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value.trim="state.formInline.password"
          size="large"
          :placeholder="t('asset.pIptPwdAd')"
          type="password"
          autocomplete="new-password"
        >
          <template #prefix> <LockOutlined /></template>
        </a-input>
      </a-form-item>

      <slider-verify v-model:status="state.slid_status" />

      <a-form-item class="mt30">
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="state.loading"
          :disabled="!state.slid_status"
          block
        >
          {{ t('login.login') }}
        </a-button>
      </a-form-item>
      <div style="text-align: right" v-if="ldapIsCfg">
        <a-checkbox v-model:checked="ldapCheck" class="ldapCheck">
          {{ t('login.useLdap') }}
        </a-checkbox>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { SliderVerify } from '@/components/slideverify';
  import { reactive, ref, unref, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { pCompile } from '@/utils/urlUtils';
  import { useRouter } from 'vue-router';
  import { useUserToken } from '@/store/modules/user';
  import { useI18n } from 'vue-i18n';
  import { getSystemCfg, getLdapUserMsg, setLdapInfoMsg } from '@/api/user';
  import { getBasicInfoApi } from '@/api/product';
  import { useModal } from '@/hooks';
  import initLdapForm from './initLdapForm';
  import { getServerUpdateStatus } from '@/api/operation/upgrade';
  import { ServerUpdateEnum } from './type';

  const { t } = useI18n();
  //是否开启ldap
  const ldapIsCfg = ref<boolean>(false);
  //ldap认证
  const ldapCheck = ref<boolean>(false);
  //登录结构体
  const state = reactive({
    loading: false,
    slid_status: false,
    formInline: {
      username: '',
      password: '',
    },
  });
  //产品名称
  const productName = ref(t('login.anxinSec'));
  const userTokenStore = useUserToken();
  const router = useRouter();
  //包装登录的方法
  const toLogin = async (username, password) => {
    state.loading = true;
    const response = await userTokenStore
      .login({
        username,
        password: unref(ldapCheck) ? password : pCompile(password),
        logintype: unref(ldapCheck) ? 'ldap' : '',
      })
      .finally(() => {
        state.loading = false;
      });

    if (response) {
      router.replace('/');
    }
  };
  const handleSubmit = async () => {
    const { username, password } = state.formInline;
    if (username.trim() == '' || password.trim() == '') {
      message.warning(t('login.notEmpty'));
    } else {
      state.loading = true;
      //先查询服务是否正在升级
      const { updating } = await getServerUpdateStatus();
      if (updating === ServerUpdateEnum.UPDATING) {
        message.warning(t('operation.serverUding'));
        state.loading = false;
        return;
      }
      state.loading = false;
      //如果选择了ldap登录，请求当前用户是否完善了个人信息
      if (unref(ldapCheck)) {
        state.loading = true;
        const { need_complete, user } = await getLdapUserMsg({
          username,
          password,
          logintype: 'ldap',
        });
        state.loading = false;
        if (need_complete === true) {
          useModal(
            {
              title: t('user.waszhbsinfo'),
              contentProps: {
                formData: reactive({ name: username }),
                disKeys: { name: true },
              },

              handleOk: async (conRef) => {
                await unref(conRef.slotRef).validate();
                const sendForm = conRef.state;
                sendForm.password = pCompile(sendForm.password); // 密码加密
                sendForm.password_p = pCompile(sendForm.password_p);
                const { code } = await setLdapInfoMsg(
                  Object.assign({}, sendForm, {
                    ldap_string: user.ldap_string,
                  }),
                ); // 传参到添加用户
                !code && toLogin(username, password);
              },
            },
            initLdapForm,
          );
        } else if (need_complete === false) {
          toLogin(username, password);
        }
      } else {
        toLogin(username, password);
      }
    }
  };
  // 获取登录页信息
  const getBasicInfo = async () => {
    const { name } = await getBasicInfoApi();
    if (name) {
      productName.value = name;
    }
  };

  onMounted(async () => {
    getBasicInfo();
    const { code, ldap_enable } = await getSystemCfg();
    if (!code) {
      ldapIsCfg.value = !!ldap_enable;
    }
  });
</script>

<style lang="less" scoped>
  .login-box {
    width: 100vw;
    height: 100vh;

    background: url('@/assets/images/login-bg.jpg') no-repeat;
    background-position: 10% 40%;
    background-color: #0f1410;
    ::v-deep(.ant-form) {
      width: 400px;
      position: absolute;
      top: 30%;
      right: 15%;
      background: #fff;
      padding: 50px 30px;
      .ant-col {
        width: 100%;
      }
      .mt30 {
        margin-top: 30px;
      }
      .ant-form-item-label {
        padding-right: 6px;
      }
      .ant-input {
        font-size: @fz12;
      }
      .title {
        text-align: center;
        font-weight: 800;
        font-size: @fz22;
        color: rgba(0, 0, 0, 0.8);
        line-height: 32px;
        margin-bottom: 40px;
      }
    }
  }
</style>
