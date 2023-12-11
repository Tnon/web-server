/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2022-08-17 11:55:11
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';

enum Api {
  assetview = '/api/asset/package/assetview',
  assetview_detail = '/api/asset/package/detail/assetview',
  hostview = '/api/asset/package/hostview',
  hostview_detail = '/api/asset/package/detail/hostview',
  assetview_axpand = '/api/asset/package/detail/assetexpand',
}

/**
 * @description: "获取安装包列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取安装包祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取安装包列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取安装包祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取安装包祥细列表：资产视图"
 */
export function getAssetExpand(params) {
  return request({
    url: Api.assetview_axpand,
    method: 'POST',
    params,
  });
}
