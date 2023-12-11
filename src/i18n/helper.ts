/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-15 18:25:28
 * @LastEditTime: 2022-09-23 13:08:45
 */
import { Language } from '@/enums/language';
export const getLanguage = (language: Language): { [key: string]: string } => {
  const languagePkg: { [key: string]: string } = {};
  const modules =
    language === Language.ZH
      ? import.meta.glob('./lang/**/zh_CN.ts', { eager: true })
      : import.meta.glob('./lang/**/en_US.ts', { eager: true });
  Object.keys(modules).forEach(async (ele) => {
    const fileName = ele.split('/')[2];
    Object.assign(languagePkg, { [fileName]: (modules[ele] as any).default });
  });
  return languagePkg;
};
