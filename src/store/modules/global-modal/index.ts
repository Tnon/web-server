/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-01-09 12:00:42
 */
import { defineStore } from 'pinia';
import { reactive, VNode, toRefs } from 'vue';
import type { IGlobalModal } from './type';
export const useGlobalModal = defineStore('gloabal-model', () => {
  const state = reactive<IGlobalModal>({
    modalValue: null,
  });
  const RemoveInstance = (title: string, keepAlive?: boolean) => {
    if (state.modalValue) {
      if (!keepAlive) {
        delete state.modalValue![title];
      }
    }
  };
  const SetGlobalModal = (value: { [k: string]: VNode } | null) => {
    if (value) {
      if (state.modalValue) {
        Object.assign(state.modalValue, value);
      } else {
        state.modalValue = Object.assign({}, value);
      }
    } else {
      state.modalValue = value;
    }
  };
  return {
    ...toRefs(state),
    SetGlobalModal,
    RemoveInstance,
  };
});
