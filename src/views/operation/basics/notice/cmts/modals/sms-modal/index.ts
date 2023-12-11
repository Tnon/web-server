/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 15:29:25
 * @LastEditTime: 2023-07-17 17:35:02
 */
import { bytesLength } from '@/utils/tools';
import smsModal from './index.vue';
export const validateLength = (_, value) => {
  if (value) {
    if (bytesLength(value) > 100) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};
export default smsModal;
