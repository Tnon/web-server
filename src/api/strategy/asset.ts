/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2023-01-13 11:14:19
 */
import request from '@/utils/http';
enum Api {
  sercuityList = '/api/policy/riskswitch/list',
  pigroupList = '/api/policy/comp/groupeffect',
}

/**
 * @description: "获取安全防护策略列表"
 */
export function getAssetPolicyList(params: tableParams<{ name: string }>) {
  return request({
    url: Api.sercuityList,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取策略分组列表"
 */
export function getGroupHostList(params: tableParams<{ status: number; id: number }>) {
  return request({
    url: Api.pigroupList,
    method: 'POST',
    params,
  });
}
