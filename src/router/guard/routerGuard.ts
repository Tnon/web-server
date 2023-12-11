/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 14:39:19
 * @LastEditTime: 2023-07-28 13:55:31
 */
import { Router } from 'vue-router';
import { storage } from '@/utils/Storage';
import { useUserToken } from '@/store/modules/user';
import { useLicense } from '@/store/modules/license-auth';
import { useProductLogo } from '@/store/modules/product-logo';
import { ACCESS_TOKEN } from '@/store/modules/lang-theme/type';
// import { computed } from 'vue';
//路由全局白名单
const allowList = [
  'login',
  'download',
  'error-404',
  'error-405',
  // 'adaptation', // 1301-430版本开始此路由登录才能访问
  'language',
  'permission',
  'monitor',
  // 'Layout',
];
const rootRouterName = 'Layout';
const loginRouteName = 'login';

export function routerGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const userTokenStore = useUserToken(),
      licenseStore = useLicense(),
      productLogoStore = useProductLogo();
    const userPermission = userTokenStore.userInfo.u_permission;
    // acdr_enabled = computed(() => productLogoStore.acdr_enabled),
    // win_state = computed(() => productLogoStore.win_state);
    const token = storage.get(ACCESS_TOKEN);
    if (token) {
      if (to.name === loginRouteName) {
        next({ name: rootRouterName });
      } else {
        //是否在路由白名单内(405)
        const allowRoute =
          to.name === rootRouterName ||
          allowList.includes(to.name as string) ||
          userPermission?.checkedKeys.includes(to.meta.permission as string) ||
          userPermission?.halfCheckedKeys.includes(to.meta.permission as string);
        if (userTokenStore.isLogin) {
          //router自身判断是否具有路由信息(404)
          const hasRoute: boolean = router.hasRoute(to.name!);

          if (hasRoute) {
            if (allowRoute) {
              next();
            } else {
              next({ name: 'error-405' });
            }
          } else {
            next({ name: 'error-404' });
          }
        } else {
          //获取license
          await licenseStore.getLicense();
          // if (!code) {
          const res: any = await userTokenStore.getUserInfo();
          //获取是否具有acdr
          await productLogoStore.GetProductLogoVersion();
          //重新计算是否具有acdr
          const hasRoute: boolean = router.hasRoute(to.name!);

          if (res) {
            if (hasRoute) {
              if (allowRoute) {
                next();
              } else {
                next({ name: 'error-405' });
              }
            } else {
              next({ name: 'error-404' });
            }
          } else {
            userTokenStore.SetToken('');
            storage.remove(ACCESS_TOKEN);
            next({ name: loginRouteName });
          }
        }
      }
    } else {
      allowList.includes(to.name as string) ? next() : next({ name: loginRouteName });
    }
  });
}
