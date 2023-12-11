/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-16 14:21:39
 * @LastEditTime: 2022-12-29 19:31:10
 */
import request from '@/utils/http';
enum Api {
  assetOverview = '/api/overview/asset', // 获取资产概览数据
  hostStatistic = '/api/overview/entity', // 获取主机统计数据
  operSysPie = '/api/overview/osdistribution', // 获取操作系统饼图数据
  usagePie = '/api/overview/resourceusage', // 获取使用率饼图数据
  getResourceAlarmOverview = '/api/asset/host/resource/alarm/overview', // 获取资源使用率告警数据
  hostInfoMsgApi = '/api/asset/host/alert',
}

/**
 * @description: "获取资源使用率告警数据"
 */
export function getResourceAlarmOverview(params) {
  return request({
    url: Api.getResourceAlarmOverview,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取资产概览数据"
 */
export function getAssetOverview() {
  return request({
    url: Api.assetOverview,
    method: 'POST',
  });
}

/**
 * @description: "获取主机统计数据"
 */
export function getHostStatistic() {
  return request({
    url: Api.hostStatistic,
    method: 'POST',
  });
}

/**
 * @description: "获取操作系统饼图数据"
 */
export function getOperSysPie() {
  return request({
    url: Api.operSysPie,
    method: 'POST',
  });
}

/**
 * @description: "获取使用率饼图数据"
 */
export function getUsagePie(params) {
  return request({
    url: Api.usagePie,
    method: 'POST',
    params,
  });
}

// /**
//  * @description: "获取内核漏洞祥细列表：资产视图"
//  */
// export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
//   return request({
//     url: Api.assetview_detail,
//     method: 'POST',
//     params,
//   });
// }
/**
 * @description: "获取主机弹窗信息"
 */
export function getHostInfo(params) {
  return request({
    url: Api.hostInfoMsgApi,
    method: 'GET',
    params,
  });
}
