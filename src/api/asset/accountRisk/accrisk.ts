/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-12 19:41:07
 * @LastEditTime: 2023-06-16 11:56:29
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';
enum Api {
  assetview = '/api/asset/accrisk/assetview',
  assetview_detail = '/api/asset/accrisk/detail/assetview',
  hostview = '/api/asset/accrisk/hostview',
  hostview_detail = '/api/asset/accrisk/detail/hostview',
}

/**
 * @description: "获取弱密码风险列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取弱密码风险祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取弱密码风险列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取弱密码祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
