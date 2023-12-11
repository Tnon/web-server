/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-17 09:52:23
 * @LastEditTime: 2022-11-17 09:53:41
 */
import { useUserToken } from '@/store/modules/user';
import { computed, unref } from 'vue';

export const usePermission = (showUsers: number[]): boolean => {
  const userTokenStore = useUserToken();
  const userType = computed(() => userTokenStore.userInfo.u_type!);
  if (showUsers.includes(unref(userType))) {
    return true;
  }
  return false;
};
