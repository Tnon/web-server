/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-18 16:30:01
 * @LastEditTime: 2021-09-16 09:36:06
 */
import { Router } from 'vue-router';
import { removeAllPending } from '@/utils/tools';
export const httpGuard = (router: Router) => {
  router.beforeEach(() => {
    //移除所有请求
    removeAllPending();
  });
};
