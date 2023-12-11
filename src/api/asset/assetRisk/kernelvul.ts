/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-08-11 16:04:26
 * @LastEditTime: 2022-09-15 20:27:28
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';
enum Api {
  assetview = '/api/asset/vul/assetview',
  assetview_detail = '/api/asset/vul/detail/assetview',
  hostview = '/api/asset/vul/hostview',
  hostview_detail = ' /api/asset/vul/detail/hostview',
  drawer_data = 'api/asset/vul',
}

/**
 * @description: "获取内核漏洞列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取内核漏洞祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取内核漏洞列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取内核漏洞祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: 漏洞详情抽屉
 * /asset/vul/{id}
 */
export function getDrawerData<T>(params: T) {
  return request({
    url: Api.drawer_data,
    method: 'POST',
    params,
  });
}
