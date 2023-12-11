/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-15 18:13:53
 * @LastEditTime: 2021-11-29 11:37:26
 */
import { Language } from '@/enums/language';
import { getLanguage } from './helper';
export const languagePkg = {
  [Language.ZH]: getLanguage(Language.ZH),
  [Language.EN]: getLanguage(Language.EN),
};
