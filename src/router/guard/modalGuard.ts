/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-18 16:30:01
 * @LastEditTime: 2023-01-09 12:08:56
 */
import { Router } from 'vue-router';
import { useGlobalModal } from '@/store/modules/global-modal';
import { useI18n } from '@/plugins/setupGlobalLocalLang';
export const modalGuard = (router: Router) => {
  const t = useI18n();
  //滚动到顶部
  router.afterEach(() => {
    const globalModalStore = useGlobalModal();
    //授权信息和升级弹窗弹窗不用移除
    if (globalModalStore.modalValue) {
      const modalInstances = Object.keys(globalModalStore.modalValue);
      modalInstances.forEach((instanceName) => {
        if (instanceName === t('license.authInfo') || instanceName === t('operation.uplodpkg')) {
        } else {
          delete globalModalStore.modalValue![instanceName];
        }
      });
    }
    if (document.getElementsByClassName('layout-content')[0]) {
      document.getElementsByClassName('layout-content')[0].scrollTop = 0;
    }
  });
};
