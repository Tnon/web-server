/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:32
 * @LastEditTime: 2022-07-20 10:21:23
 */
/**
 * @description: 登陆接口参数
 */
export interface LoginParams {
  username: string;
  password: string;
  logintype: string;
}
/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  // 用户id
  userId: string | number;
  // token
  token: string;
}
/**
 * @description: 获取用户
 */
export interface UserList {
  search_data: string;
}
