/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2022-08-15 10:34:00
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';
enum Api {
  assetview = '/api/asset/share/assetview',
  assetview_detail = '/api/asset/share/detail/assetview',
  hostview = '/api/asset/share/hostview',
  hostview_detail = '/api/asset/share/detail/hostview',
}

/**
 * @description: "获取共享文件夹列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取共享文件夹祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取共享文件夹列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取共享文件夹祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
