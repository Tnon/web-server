/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 22:10:25
 * @LastEditTime: 2023-07-18 10:18:21
 */
import { unref } from 'vue';
import accepForm from './index.vue';
import { bytesLength } from '@/utils/tools';
export const validateME = (isDoubleEmpty) => {
  return () => {
    if (unref(isDoubleEmpty)) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  };
};
export const validateEmail = (_, value) => {
  const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (value) {
    if (emailReg.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject();
  }
  return Promise.resolve();
};

export const validateLen = (_, value) => {
  if (value) {
    if (bytesLength(value) > 40) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};
export default accepForm;
