/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-18 10:24:07
 * @LastEditTime: 2023-05-18 10:15:13
 */
import { Language } from '@/enums/language';

export const ACCESS_TOKEN = 'Access-Token'; // 用户token
export const TOKEN_TYPE = 'Token_Type'; // token类型
export const ACCESS_PERMISSION = 'Access-Permission'; // 用户token
export const enum UserType {
  Normal = 1,
  LDAP,
}
export const enum USERTOKEN {
  admin = 1,
  audit,
  safe,
  operation,
  super,
}
export const enum SelectLevel {
  //未选
  None,
  //半选
  Half,
  //全选
  Done,
}
export interface M_PERMISSION {
  //路由标识
  routerName: string;
  //路由标题
  title: string;
  //全选，办选，不选
  checkLevel: SelectLevel;
  //当前页面的详细功能
  pageApis?: pageApi[];
  //子页面递归
  children?: M_PERMISSION[];
}
export interface ALL_PERMISSION {
  //全选的路由
  checkedKeys: string[];
  //半选的路由
  halfCheckedKeys: string[];
  //路由映射
  permissionMap: M_PERMISSION[];
}
const enum PermissionEffect {
  //正常
  Normal = 1,
  //隐藏
  Hidden,
  //禁用
  Disabled,
}
interface pageApi {
  name: string;
  description?: string;
  effect: PermissionEffect;
}
interface userInfo {
  id: number;
  name: string;
  email: string;
  head_image: string;
  telephone: string;
  mobile: string;
  last_logout_at: string;
  created_at: string;
  u_type: USERTOKEN;
  embed: boolean;
  u_src: UserType;
  pref_lang: Language;
  u_permission: ALL_PERMISSION;
  role_name: string;
}
export interface loginResult {
  token: {
    token: string;
    token_type: string;
  };
  user: any;
}
export type User_Info = Partial<userInfo>;

export type IUserState = {
  token: string;
  user_info: User_Info;
  isLogin: boolean;
  tokenType: string;
};
