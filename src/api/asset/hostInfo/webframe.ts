/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2022-08-15 10:34:07
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';

enum Api {
  assetview = '/api/asset/webframe/assetview',
  assetview_detail = '/api/asset/webframe/detail/assetview',
  hostview = '/api/asset/webframe/hostview',
  hostview_detail = '/api/asset/webframe/detail/hostview',
  assetview_axpand = '/api/asset/webframe/detail/assetexpand',
}

/**
 * @description: "获取web框架列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取web框架祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取web框架列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取web框架祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取web框架祥细列表：资产视图"
 */
export function getAssetExpand(params) {
  return request({
    url: Api.assetview_axpand,
    method: 'POST',
    params,
  });
}
