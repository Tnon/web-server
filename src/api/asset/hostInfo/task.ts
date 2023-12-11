/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-11 15:46:43
 * @LastEditTime: 2023-01-12 18:57:49
 */
import request from '@/utils/http';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from '../model/assetsModel';

enum Api {
  assetview = '/api/asset/task/assetview',
  assetview_detail = '/api/asset/task/detail/assetview',
  hostview = '/api/asset/task/hostview',
  hostview_detail = '/api/asset/task/detail/hostview',
  assetview_axpand = '/api/asset/task/detail/assetexpand',
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
 * @description: "获取计划任务列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
  return request({
    url: Api.assetview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取计划任务祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
  return request({
    url: Api.assetview_detail,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取计划任务列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
  return request({
    url: Api.hostview,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取计划任务祥细列表：主机视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取计划任务祥细列表：资产视图—详细信息子列"
 */
export function getAssetExpand(params) {
  return request({
    url: Api.assetview_axpand,
    method: 'POST',
    params,
  });
}
