<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2021-10-12 10:44:07
-->
<template>
  <div>
    <div class="header">{{ t('setting.languageSeting') }}</div>
    <div class="langform">
      <span class="label"> {{ t('setting.productLnag') }}： </span>
      <a-select class="langselect" v-model:value="localLang">
        <a-select-option v-for="{ title, value } in options" :value="value" :key="title">
          {{ t(title) }}
        </a-select-option>
      </a-select>
    </div>
    <div style="float: right">
      <a-button type="primary" @click="commit">
        {{ t('common.confirm') }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { Language } from '@/enums/language';
  import { setUserLanguage } from '@/api/user';
  import { useI18n } from 'vue-i18n';
  import { useUserToken } from '@/store/modules/user';
  import { toogleLang } from '@/plugins/setupGlobalLocalLang';
  const { t } = useI18n();
  //用户信息仓
  const userTokenStore = useUserToken();
  //初始化语言
  const localLang = ref(userTokenStore.userLanguage);
  //语种
  const options = [
    {
      title: 'setting.prodft',
      value: Language.DEFAULT,
    },
    {
      title: 'setting.prochi',
      value: Language.ZH,
    },
    {
      title: 'setting.proeng',
      value: Language.EN,
    },
  ];
  // 密码设置
  const commit = async () => {
    const { code } = await setUserLanguage({ pref_lang: unref(localLang) });
    if (!code) {
      toogleLang(unref(localLang));
      userTokenStore.SetUserLanguage(unref(localLang));
    }
  };
</script>
<style lang="less" scoped>
  .header {
    height: 40px;
    line-height: 40px;
    font-weight: 800;
    font-size: @fz18;
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0;
    text-align: justify;
    margin-bottom: 20px;
  }
  .langform {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .label {
      flex: 1;
      text-align: right;
    }
    .langselect {
      flex: 3;
    }
  }
</style>
