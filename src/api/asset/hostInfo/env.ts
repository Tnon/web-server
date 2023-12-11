/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2022-08-15 10:34:11
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';
enum Api {
  assetview = '/api/asset/environment/assetview',
  assetview_detail = '/api/asset/environment/detail/assetview',
  hostview = '/api/asset/environment/hostview',
  hostview_detail = '/api/asset/environment/detail/hostview',
}

/**
 * @description: "获取环境变量列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取环境变量祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取环境变量列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取环境变量祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
