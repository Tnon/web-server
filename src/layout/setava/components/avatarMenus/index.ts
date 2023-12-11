/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-01-13 10:31:23
 */
import { USERTOKEN } from '@/store/modules/user/type';
import avatarMenus from './index.vue';
export const getRoleName = (u_type: USERTOKEN, t) => {
  return (
    ['', t('user.sysAdmin'), t('user.auditAdmin'), t('user.anqgly'), t('user.yunwadmi')][
      ~~u_type
    ] ?? ''
  );
};

export default avatarMenus;
