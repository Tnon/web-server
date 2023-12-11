/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-11 15:46:43
 * @LastEditTime: 2023-07-19 11:04:37
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';

enum Api {
  assetview = '/api/asset/xinetd/assetview',
  assetview_detail = '/api/asset/xinetd/detail/assetview',
  hostview = '/api/asset/xinetd/hostview',
  hostview_detail = '/api/asset/xinetd/detail/hostview',
  assetview_axpand = '/api/asset/xinetd/detail/assetexpand',
}

/**
 * @description: "获取xinetd网络托管服务列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取xinetd网络托管服务祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取xinetd网络托管服务列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取xinetd网络托管服务祥细列表：主机视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取xinetd网络托管服务祥细列表：资产视图—详细信息子列"
 */
export function getAssetExpand(params) {
  return request({
    url: Api.assetview_axpand,
    method: 'POST',
    params,
  });
}
