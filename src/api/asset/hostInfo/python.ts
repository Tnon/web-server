/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-11 15:46:43
 * @LastEditTime: 2022-10-18 17:04:44
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';

enum Api {
  assetview = '/api/asset/python/assetview',
  assetview_detail = '/api/asset/python/detail/assetview',
  hostview = '/api/asset/python/hostview',
  hostview_detail = '/api/asset/python/detail/hostview',
  assetview_axpand = '/api/asset/python/detail/assetexpand',
  // jarDetail = '/api/asset/jar/detail',
}
// /**
//  * @description: "jar包详情对话框"
//  */
// export function getJarDetail(params) {
//   return request({
//     url: Api.jarDetail,
//     method: 'GET',
//     params,
//   });
// }
/**
 * @description: "获取python包列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取python包祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取python包列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取python包祥细列表：主机视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取python包祥细列表：资产视图—详细信息子列"
 */
export function getAssetExpand(params) {
  return request({
    url: Api.assetview_axpand,
    method: 'POST',
    params,
  });
}
