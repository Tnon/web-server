/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-20 18:20:14
 * @LastEditTime: 2022-10-27 11:25:22
 */
import { bytesLength } from '@/utils/tools';
import addModal from './index.vue';
export const validateName = async (_, value: string) => {
  if (bytesLength(value) > 40) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
export default addModal;
