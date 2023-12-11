/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:32
 * @LastEditTime: 2022-11-16 11:31:01
 */
import { Language } from '@/enums/language';
import request from '@/utils/http';

import { LoginParams } from './model/userModel';

enum Api {
  login = '/api/login',
  logout = '/api/logout',
  current = '/api/admin/user/info',

  updateUserAll = '/api/admin/user/update',

  sysConfig = '/api/home/info',
  saveLangCfg = '/api/admin/user/pref_lang',

  permisAllApi = '/api/maintenance/role/menu/update/all',
  permisYWAllApi = '/api/maintenance/role/menu/resolve',
  pdyAllrou = '/api/maintenance/role/menu/all',
  ldapMsgApi = '/api/login',
  setLdapMsgApo = '/api/ldap/complete',
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: Api.current,
    method: 'GET',
    // headers: {
    //   ignoreCancelToken: true,
    // },
  });
}

/**
 * @description: 用户登录
 */
export function login(params: LoginParams) {
  return request(
    {
      url: Api.login,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'loginSuc',
    },
  );
}

/**
 * @description: 用户登出
 */
export function logout() {
  return request({
    url: Api.logout,
    method: 'POST',
  });
}

/**
 * @description 个人信息/修改部门名称
 */
export function updateDeptApi(params) {
  return request(
    {
      url: Api.updateUserAll,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}

/**
 * @description 修改电话号码
 */
export function updateMobileApi(params) {
  return request(
    {
      url: Api.updateUserAll,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}

/**
 * @description 修改座机号码
 */
export function upadteTelphoneApi(params) {
  return request(
    {
      url: Api.updateUserAll,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}

/**
 * @description: 首页获取配置
 */
export function getSystemCfg() {
  return request({
    url: Api.sysConfig,
    method: 'GET',
  });
}
/**
 * @description: 用户语言设置
 */
export function setUserLanguage(params: { pref_lang: Language }) {
  return request({
    url: Api.saveLangCfg,
    method: 'POST',
    params,
  });
}

/**
 * @description: 国际化配置接口
 */
export function changeFile(params) {
  return request({
    url: '/change',
    method: 'POST',
    params,
  });
}
/**
 * @description: 权限配置接口(全量)
 */
export function saveAllRoutersApi(params) {
  return request({
    url: Api.permisAllApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 权限配置接口(运维)
 */
export function saveYWRoutersApi(params) {
  return request({
    url: Api.permisYWAllApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取产品路由信息
 */
export function getAllRoutersApi() {
  return request({
    url: Api.pdyAllrou,
    method: 'GET',
  });
}
/**
 * @description: 获取ldap用户是否完善了信息
 */
export function getLdapUserMsg(params: { username: string; password: string; logintype: string }) {
  return request({
    url: Api.ldapMsgApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 完善ldap用户信息
 */
export function setLdapInfoMsg(params) {
  return request({
    url: Api.setLdapMsgApo,
    method: 'POST',
    params,
  });
}
