/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-11 15:53:46
 * @LastEditTime: 2022-10-18 18:40:35
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';

enum Api {
  assetview = '/api/asset/webapp/assetview',
  assetview_detail = '/api/asset/webapp/detail/assetview',
  hostview = '/api/asset/webapp/hostview',
  hostview_detail = '/api/asset/webapp/detail/hostview',
  assetview_axpand = '/api/asset/webapp/detail/assetexpand',
}

/**
 * @description: "获取web应用列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取web应用祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取web应用列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取web应用祥细列表：主机视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取webapp祥细列表：资产视图—详细信息子列"
 */
export function getAssetExpand(params) {
  return request({
    url: Api.assetview_axpand,
    method: 'POST',
    params,
  });
}
