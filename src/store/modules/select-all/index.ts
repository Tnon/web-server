/*
 * @Author: duwei
 * @Date: 2022-01-10 10:41:37
 * @LastEditTime: 2022-08-18 18:12:09
 * @LastEditors: Delevin.TnT
 */
import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import { IExclude } from './type';

export const useSelectAll = defineStore('select-all', () => {
  // select-all 当前状态管理的唯一标识
  const state = reactive<IExclude>({
    exclude: [],
    isSelectAll: false,
  });
  function AddExclude(hostIds: string[]) {
    state.exclude = state.exclude.concat(hostIds);
  }
  function DelExclude(hostId: string) {
    state.exclude.splice(
      state.exclude.findIndex((item) => item === hostId),
      1,
    );
  }
  function InitExclude() {
    state.exclude = [];
  }
  function setIselectAll(type: boolean) {
    state.isSelectAll = type;
  }
  return {
    ...toRefs(state),
    AddExclude,
    DelExclude,
    InitExclude,
    setIselectAll,
  };
});
