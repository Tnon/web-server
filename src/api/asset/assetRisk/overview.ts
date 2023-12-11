/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-12 10:58:54
 * @LastEditTime: 2023-03-14 21:35:15
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';
enum Api {
  assetview = '/api/asset/vul/assetview',
  assetview_detail = '/api/asset/vul/detail/assetview',
  hostview = '/api/asset/vul/hostview',
  hostview_detail = ' /api/asset/vul/detail/hostview',
  STATISTICSLoop = '/api/asset/vul/statistic',
  STATISTICSRisk = '/api/asset/pwd/statistic',
}

/**
 * @description: "获取全部漏洞列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取全部漏洞祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取全部漏洞列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取全部漏洞祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取漏洞统计"
 * /assets/host/{id}
 */
export function HostDetailLoopStatic(params: string) {
  return request({
    url: Api.STATISTICSLoop,
    method: 'GET',
    params,
  });
}

/**
 * @description: "获取风险统计"
 * /assets/host/{id}
 */
export function HostDetailRiskStatic(params: string) {
  return request({
    url: Api.STATISTICSRisk,
    method: 'GET',
    params,
  });
}
