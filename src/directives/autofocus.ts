/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-22 10:20:10
 * @LastEditTime: 2021-07-22 10:22:56
 */
import { ObjectDirective } from 'vue';
export const autofocus: ObjectDirective = {
  mounted(el: HTMLButtonElement) {
    el.focus();
  },
};
