/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:53:58
 * @LastEditTime: 2022-11-15 16:41:09
 */
import request from '@/utils/http';
enum Api {
  gsetIpControl = '/api/admin/config/ipfilter',
  gsetAgentUninstall = '/api/admin/config/agtu',
  gsetLoginAuth = '/api/admin/config/login',
  gSetExpire = '/api/admin/config/jwt',
  gethisIps = '/api/admin/config/loginiphist',
}
/**
 * @description 获取可访问ip地址
 */
export function getIpControlApi() {
  return request({
    url: Api.gsetIpControl,
    method: 'GET',
  });
}

/**
 * @description 保存可访问ip地址
 */
export function updateIpControlApi(params: { enabled: boolean; items: any }) {
  return request(
    {
      url: Api.gsetIpControl,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}
/**
 * @description 获取agent防卸载密码
 */
export function getAgentUninstallApi() {
  return request({
    url: Api.gsetAgentUninstall,
    method: 'GET',
  });
}

/**
 * @description 修改agent防卸载密码
 */
export function updateAgentUniApi(params: { passcode: string; enabled: boolean }) {
  return request(
    {
      url: Api.gsetAgentUninstall,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}

/**
 * @description 控制agent卸载开关
 */
export function controlAgentUniApi(params: { passcode: string; enabled?: boolean }) {
  return request({
    url: Api.gsetAgentUninstall,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取登录鉴别次数
 */
export function getLoginAuthApi() {
  return request({
    url: Api.gsetLoginAuth,
    method: 'GET',
  });
}

/**
 * @description 更新登录鉴别次数
 */
export function updateLoginAuthApi(params: { maxtry: number }) {
  return request(
    {
      url: Api.gsetLoginAuth,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}

/**
 * @description 控制登录鉴别开关
 */
export function controlLoginAuthApi(params: { maxtry: number }) {
  return request({
    url: Api.gsetLoginAuth,
    method: 'POST',
    params,
  });
}

/**
 * @description 获取超过某时间未操作重新登录
 */
export function getLoginExpireApi() {
  return request({
    url: Api.gSetExpire,
    method: 'GET',
  });
}
/**
 * @description 设置某时间段内未操作重新登录
 */
export function setLoginExpireApi(params: { expiretime: number }) {
  return request(
    {
      url: Api.gSetExpire,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}
/**
 * @description 获取历史登录ip
 */
export function getHiIps() {
  return request({
    url: Api.gethisIps,
    method: 'GET',
  });
}
