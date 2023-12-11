import { defineStore } from 'pinia';
import { ILangThemeState, THEME_COLOR } from './type';
import { createStorage } from '@/utils/Storage';
import { CustomTheme } from '@/enums/language';
import { reactive, toRefs } from 'vue';
const Storage = createStorage({ storage: localStorage });
export const useLangTheme = defineStore('lang-theme', () => {
  const state = reactive<ILangThemeState>({
    theme: Storage.get(THEME_COLOR, CustomTheme.LIGHT),
  });
  const SetTheme = (color: CustomTheme) => {
    Storage.set(THEME_COLOR, color);
    state.theme = color;
  };
  return {
    ...toRefs(state),
    SetTheme,
  };
});
