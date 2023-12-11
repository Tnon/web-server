/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2022-11-17 09:50:15
 */
import { useUserToken } from '@/store/modules/user';
import { USERTOKEN } from '@/store/modules/user/type';
import { computed, DirectiveBinding, ObjectDirective, unref } from 'vue';

//自定义权限指令
export const permission: ObjectDirective = {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<{ name: string; showUsers: Array<USERTOKEN> }>,
  ) {
    if (binding.value == undefined) return;
    const userTokenStore = useUserToken();
    const userType = computed(() => userTokenStore.userInfo.u_type!);
    if (!binding.value.showUsers.includes(unref(userType))) {
      el.remove();
    }
  },
};
