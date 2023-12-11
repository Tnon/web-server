import { CustomTheme } from '@/enums/language';

export const ACCESS_TOKEN = 'Access-Token'; // 用户token
export const TOKEN_TYPE = 'Token_Type'; // token类型
export const THEME_COLOR = 'Theme-Color'; //主题色

export type ILangThemeState = {
  theme: CustomTheme;
};
