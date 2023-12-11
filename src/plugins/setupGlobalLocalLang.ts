/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2023-03-20 14:19:22
 */
import { App } from 'vue';
import { languagePkg } from '@/i18n';
import { createI18n, I18nOptions } from 'vue-i18n';
import { Language } from '@/enums/language';
type i18n = ReturnType<typeof createI18n>;
const getNavigatorLang = (): Language => {
  //浏览器语言
  const lang = navigator.language;
  if (lang.toLowerCase().includes('zh')) {
    return Language.ZH;
  }
  return Language.EN;
};
//配置项
const options: I18nOptions = {
  // legacy: false,
  locale: getNavigatorLang(), //默认为浏览器语言
  fallbackLocale: Language.EN,
  messages: languagePkg,
  warnHtmlMessage: false,
};
//创建实例
export const i18nInstance: i18n = createI18n(options);

export function GlobalI18n(app: App) {
  app.use(i18nInstance);
}
//切换语言函数
export const toogleLang = (lang: Language): void => {
  i18nInstance.global.locale = lang === Language.DEFAULT ? getNavigatorLang() : lang;
};
//非 setup的T
export const useI18n = () => {
  return i18nInstance.global.t;
};
