import { defineStore } from 'pinia';
import {
  ACCESS_TOKEN,
  ACCESS_PERMISSION,
  IUserState,
  loginResult,
  TOKEN_TYPE,
  ALL_PERMISSION,
  User_Info,
} from './type';
import { createStorage } from '@/utils/Storage';
import { getUserInfo, login, logout } from '@/api/user';
import { useLicense } from '@/store/modules/license-auth';
import { getNavigatorLang } from '@/utils/tools';
import { toogleLang } from '@/plugins/setupGlobalLocalLang';
import { Language } from '@/enums/language';
import { useProductLogo } from '@/store/modules/product-logo';
const Storage = createStorage({ storage: localStorage });
export const useUserToken = defineStore({
  id: 'user-token',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    tokenType: Storage.get(TOKEN_TYPE, ''),
    user_info: {
      id: undefined,
      name: '',
      email: '',
      head_image: '',
      telephone: '',
      mobile: '',
      last_logout_at: '',
      created_at: '',
      embed: false,
      u_type: undefined,
      u_src: undefined,
      pref_lang: getNavigatorLang(),
      u_permission: Storage.get(ACCESS_PERMISSION, {
        checkedKeys: [],
        halfCheckedKeys: [],
        permissionMap: [],
      }),
    },
    isLogin: false,
  }),
  getters: {
    userAvatar(): string {
      return this.user_info!.head_image!;
    },
    userName(): string {
      return this.user_info!.name!;
    },
    userInfo(): User_Info {
      return this.user_info;
    },
    userPermissions(): ALL_PERMISSION {
      return this.user_info!.u_permission!;
    },
    userLanguage(): Language {
      return this.user_info!.pref_lang!;
    },
  },

  actions: {
    SetToken(token: string) {
      this.token = token;
      Storage.set(ACCESS_TOKEN, token);
    },
    SetPermission(permission: ALL_PERMISSION) {
      this.userInfo.u_permission = permission;
      Storage.set(ACCESS_PERMISSION, permission);
    },
    SetTokenType(type: string) {
      this.tokenType = type;
      Storage.set(TOKEN_TYPE, type);
    },
    SetUserInfo(user_info: User_Info) {
      this.user_info = user_info;
      //手动赋值(如果没，则default)
      this.SetPermission(
        user_info.u_permission
          ? user_info.u_permission
          : Storage.get(ACCESS_PERMISSION, {
              checkedKeys: [],
              halfCheckedKeys: [],
              permissionMap: [],
            }),
      );
      //手动赋值(如果没，则default)
      this.SetUserLanguage(user_info.pref_lang ? user_info.pref_lang : Language.DEFAULT);
      //动态切换语言
      toogleLang(user_info.pref_lang!);
    },
    SetUserLanguage(lang: Language) {
      //如果是系统默认，则用系统语言
      this.user_info.pref_lang = lang;
    },
    IsLogin(isLogin: boolean) {
      this.isLogin = isLogin;
    },
    SetUserInfoAvatar(url: string) {
      this.user_info.head_image = url;
    },
    // 登录
    async login(userInfo) {
      try {
        const response: loginResult = await login(userInfo);
        if (response) {
          const licenseStore = useLicense(),
            productLogoStore = useProductLogo();
          const { token, token_type } = response.token;
          //vuex存储token(持久)
          this.SetToken(token);
          //vuex存储token_type(持久)
          this.SetTokenType(token_type);
          //vuex存储临时变量,标记是否登录
          this.IsLogin(true);
          //获取用户信息
          await this.getUserInfo();
          //获取license
          await licenseStore.getLicense();
          //获取产品信息
          await productLogoStore.GetProductLogoVersion();
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    async getUserInfo() {
      const userInfo: User_Info = await getUserInfo();
      if (userInfo) {
        //仅语言持久
        this.SetUserInfo(userInfo);
        this.IsLogin(true);
        return Promise.resolve(userInfo);
      }
      return Promise.resolve('');
    },

    // 登出
    async logout(route) {
      await logout();
      this.SetToken('');
      this.SetTokenType('');
      this.SetUserInfo({});
      this.IsLogin(false);
      Storage.remove(ACCESS_TOKEN);
      Storage.remove(TOKEN_TYPE);
      route.push({
        name: 'login',
      });
      // window.location.reload();
      return Promise.resolve('');
    },
  },
});
