/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 21:31:10
 * @LastEditTime: 2022-11-17 20:04:35
 */
import { useUserToken } from '@/store/modules/user';
import { UserType } from '@/store/modules/user/type';
import { pCompile } from '@/utils/urlUtils';
import { computed, unref } from 'vue';

const userTokenStore = useUserToken();
//获取管理员类型 lDAP还是普通
const userType = computed(() => userTokenStore.userInfo);
export const useValidatePwd = async (api, state, conRef, callback, keepPage?) => {
  //删除
  const { code, ...res } = await api(
    Object.assign({}, state, {
      password:
        unref(userType).u_src === (UserType.Normal as any)
          ? pCompile(conRef.pwdValue)
          : conRef.pwdValue,
    }),
  );
  if (code) {
    return Promise.reject({ code });
  }
  //刷新下
  !code && callback(keepPage);
  return Promise.resolve(res);
};
