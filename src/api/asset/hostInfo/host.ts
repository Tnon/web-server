/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-26 16:34:01
 * @LastEditTime: 2023-02-22 20:15:25
 */

import request from '@/utils/http';
import {
  HostList,
  MovePara,
  DelPara,
  AddPara,
  RnamePara,
  MoveDelPara,
  HostTags,
} from '../model/assetsModel';
enum Api {
  HOSTLIST = '/api/asset/host/list',
  STATISTICS = '/api/asset/host/statistic',
  DETAIL_HOST = '/api/asset/host',
  GROUPLIST = '/api/asset/group',
  MOVEGROUP = '/api/asset/group/move',
  DELETEGROUP = '/api/asset/group',
  ADDGROUP = '/api/asset/group',
  RENAMEGROUP = '/api/asset/group/rename',
  MOVEHOSTGROUP = '/api/asset/host/movetogroup',
  DELHOSTGROUP = '/api/asset/host/removehost',
  GETOFFCOUNT = '/api/asset/host/offlinehostcount',
  HOSTTAGS = '/api/asset/host/tag',
  HOSTDETAILHEAD = '/api/asset/host/simple',
  HOSTDETAILPOLICY = '/api/asset/host/policy',
  offLineHostApi = '/api/overview/offlinestatistic',
  exportFileExcel = '/api/asset/host/export',
  UPLOADEXCEL = '/storage/importgroup',
  LOGRECORDS = '/api/asset/host/queryimportlog',
  DOWNLOADLOG = '/api/asset/host/downloadimportlog',
  MODIFYHOSTINFO = '/api/asset/host/modify',
  dmdetalApi = '/api/asset/website/detail/appinfoview',
  appetalApi = '/api/asset/app/relateview',
  dbetalApi = '/api/asset/database/relateview',
  CanRefAssApi = '/api/asset/host/assetmanualupdate',
  updateTime = '/api/asset/host/infotime',
  systemList = '/api/asset/host/oscount',
  systemDetailList = '/api/asset/host/osentity',
  jaretalApi = '/api/asset/webframe/detail/jarinfoview',

  netcardFlow = '/api/asset/host/eth/graph', // 网卡流量监测
  getResourceAlarm = '/api/asset/host/resource/alarm/list', // 资源告警列表
  getResourceChart = '/api/asset/host/resource/graph', // 资源使用率折线图
  getResourceTable = '/api/asset/host/resource/list', // 资源使用率表格

  getEffStra = '/api/policy/bw/listscoped',
}

/**
 * @description: "获取系统版本列表"
 */
export function systemDetailList(params) {
  return request({
    url: Api.systemDetailList,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取系统版本列表"
 */
export function getOsList(params) {
  return request({
    url: Api.systemList,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取主机资产列表"
 */
export function getHostList(params: tableParams<HostList>) {
  return request({
    url: Api.HOSTLIST,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取资产统计信息"
 */
export function getStatistics(params: { group_id: number }) {
  return request({
    url: Api.STATISTICS,
    method: 'GET',
    params,
  });
}
/**
 * @description: "获取时间段离线主机"
 */
export function getOffLineHost(params: { range: string }) {
  return request({
    url: Api.offLineHostApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: "获取主机分组"
 */
export function getHostGroups(group_id = -1, exclude_id?: string) {
  return request({
    url: Api.GROUPLIST,
    method: 'GET',
    params: {
      group_id,
      exclude_id,
    },
  });
}

/**
 * @description: "分组移动"
 */
export function moveGroup(params: MovePara) {
  return request({
    url: Api.MOVEGROUP,
    method: 'POST',
    params,
  });
}

/**
 * @description: "删除分组"
 */
export function deleteGroup(params: DelPara) {
  return request(
    {
      url: Api.DELETEGROUP,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'delGrpSuc',
    },
  );
}

/**
 * @description: "重命名分组"
 */
export function renameGroup(params: RnamePara) {
  return request({
    url: Api.RENAMEGROUP,
    method: 'POST',
    params,
  });
}

/**
 * @description: "添加分组"
 */
export function addGroup(params: AddPara) {
  return request(
    {
      url: Api.ADDGROUP,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'addGrpSuc',
    },
  );
}

/**
 * @description: "移动主机/删除主机"
 */
export function move_Group(params: MoveDelPara, boolean?: boolean) {
  return request(
    {
      url: Api.MOVEHOSTGROUP,
      method: 'POST',
      params,
    },
    {
      successMessageText: !boolean ? 'moveHostSuc' : '',
    },
  );
}

/**
 * @description: "移动主机/删除主机"
 */
export function del_Group(params: MoveDelPara) {
  return request(
    {
      url: Api.DELHOSTGROUP,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'delHostSuc',
    },
  );
}

/**
 * @description: "获取离线主机数量"
 */
export function getoffLineNumber(params: HostList) {
  return request({
    url: Api.GETOFFCOUNT,
    method: 'POST',
    params,
  });
}

/**
 * @description: "添加标签"
 */
export function hostTags(params: HostTags, successMessageText: string) {
  return request(
    {
      url: Api.HOSTTAGS,
      method: 'POST',
      params,
    },
    {
      successMessageText,
    },
  );
}

/**
 * @description: "主机详情头部信息"
 */
export function hostDetailHead(params: string) {
  return request({
    url: Api.HOSTDETAILHEAD,
    method: 'GET',
    params,
  });
}

/**
 * @description: "是否可以刷新主机资产"
 */
export function isCanRefreshAsset(params: { type: number; mac: string }) {
  return request({
    url: Api.CanRefAssApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取主机详情"
 * /assets/host/{id}
 */
export function HostDetail(params: string) {
  return request({
    url: Api.DETAIL_HOST,
    method: 'GET',
    params,
  });
}

/**
 * @description: "获取主机详情-资产统计"
 * /assets/host/{id}
 */
export function HostDetailAssetStatic(params: string) {
  return request({
    url: Api.STATISTICS,
    method: 'GET',
    params,
  });
}

/**
 * @description: "获取主机详情-策略"
 * /assets/host/{id}
 */
export function getHostPolicy(params: { host_id: string }) {
  return request({
    url: Api.HOSTDETAILPOLICY,
    method: 'GET',
    params,
  });
}

/**
 * @description: "导入excel文件"
 */
export function uploadHostXls(params: { way: string; ip: string; file }) {
  return request({
    url: Api.UPLOADEXCEL,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取日记记录"
 */
export function getLogdRecords(params: tableParams<unknown>) {
  return request({
    url: Api.LOGRECORDS,
    method: 'POST',
    params,
  });
}

/**
 * @description: "下载日记"
 */
export function downloadLogdRecords(params: { id: string }) {
  return request({
    url: Api.DOWNLOADLOG,
    method: 'GET',
    params,
  });
}

/**
 * @description: "修改主机信息"
 */
export function modifyHostInfo(params: any) {
  return request(
    {
      url: Api.MODIFYHOSTINFO,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: "获取web站点详情"
 */
export function getDomainDetail(params: tableParams<unknown>) {
  return request({
    url: Api.dmdetalApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取应用关联进程详情"
 */
export function getAppDetail(params: tableParams<unknown>) {
  return request({
    url: Api.appetalApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取应用关联进程详情"
 */
export function getDatabaseDetail(params: tableParams<unknown>) {
  return request({
    url: Api.dbetalApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取主机更新时间
 */
export function getHostUpdateTime(params: string) {
  return request({
    url: Api.updateTime,
    method: 'GET',
    params,
  });
}
/**
 * @description: "获取web框架关联jar包详情"
 */
export function getJarDetail(params: tableParams<unknown>) {
  return request({
    url: Api.jaretalApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 网卡流量监测折线图
 */
export function getNetcardFlow(params) {
  return request({
    url: Api.netcardFlow,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取资源告警列表
 */
export function getResourceAlarm(params) {
  return request({
    url: Api.getResourceAlarm,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取资源使用率折线图数据
 */
export function getResourceChart(params) {
  return request({
    url: Api.getResourceChart,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取资源使用率表格
 */
export function getResourceTable(params) {
  return request({
    url: Api.getResourceTable,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取分组关联的策略
 */
export function getEffStrategy(params) {
  return request({
    url: Api.getEffStra,
    method: 'POST',
    params,
  });
}
