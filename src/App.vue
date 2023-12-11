<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-21 11:29:14
 * @LastEditTime: 2023-10-12 16:28:22
-->
<template>
  <a-config-provider :locale="localLang === Language.EN ? enUS : zhCN" :theme="antvTheme">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
      <!-- 弹框统一组件 start -->
      <template v-for="(item, key) in modelVisible" :key="key">
        <component :is="item" />
      </template>
      <!-- 弹框统一组件 end -->
    </router-view>
  </a-config-provider>
</template>
<script lang="ts" setup>
  import { computed, watchEffect, unref, ComputedRef } from 'vue';
  import enUS from 'ant-design-vue/es/locale/en_US';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { Language, CustomTheme } from '@/enums/language';
  import { useLangTheme } from '@/store/modules/lang-theme';
  import { useGlobalModal } from '@/store/modules/global-modal';
  import { useUserToken } from '@/store/modules/user';
  import { getNavigatorLang } from './utils/tools';
  import { useI18n } from 'vue-i18n';
  const userTokenStore = useUserToken(),
    langThemeStore = useLangTheme(),
    globalModalStore = useGlobalModal();
  //主题色
  const THEME: ComputedRef<CustomTheme> = computed(() => langThemeStore.theme);
  watchEffect(() => {
    const METHODS = unref(THEME) === CustomTheme.DARK ? 'add' : 'remove';
    document.getElementsByTagName('html')[0].classList[METHODS]('darkTheme');
  });
  //全局弹框
  const modelVisible = computed(() => globalModalStore.modalValue);
  //国际化
  const localLang = computed(() =>
    userTokenStore.userLanguage === Language.DEFAULT
      ? getNavigatorLang()
      : userTokenStore.userLanguage,
  );
  const { t } = useI18n();
  watchEffect(() => {
    dayjs.locale(unref(localLang));
    document.title = t('login.anxinSec');
  });

  const antvTheme = {
    token: {
      colorPrimary: '#18BA79',
      colorLink: '#18BA79',
      fontSize: 12,
      sizeStep: 3,
      sizeUnit: 4,
      components: {
        Modal: {
          sizeUnit: 0,
        },
      },
    },
  };
</script>
<style lang="less">
  @import 'styles/global.less';
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.35s ease-in;
  }

  .slide-up-enter-form,
  .slide-up-leave-to {
    transform: translateY(-100%);
  }
</style>
