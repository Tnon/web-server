/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-31 15:15:19
 * @LastEditTime: 2023-05-11 15:15:57
 */
import { HANDLETYPE } from '@/enums/attack_risk';
import request from '@/utils/http';

enum Api {
  periodStatistics = '/api/overview/querydurationrisknum',
  logoutintervalinfo = '/api/overview/querylogoutintervalinfo',
  attRiskNum = '/api/overview/queryrisknum',
  attRiskNumWin = '/win/api/overview/queryrisknum',
  hostTopN = '/api/overview/queryriskhosttopn',
  lineCharts = '/api/overview/querylinechart',
  statData = 'api/overview/queryrisknum',
  hostview_detail = 'api/asset/summary',
  opeta_detai = 'api/maintenance/summary',
}

/**
 * @description 期间统计
 */
export function getPeriodStatistics(params: { days: string }) {
  return request({
    url: Api.periodStatistics,
    method: 'POST',
    params,
  });
}
/**
 * @description 查询登出期间风险与攻击数
 */
export function getNologinDura() {
  return request({
    url: Api.logoutintervalinfo,
    method: 'POST',
  });
}

/**
 * @description 查询已/未处理的攻击和风险数
 */
export function getAttRiskNum(params: { handle: HANDLETYPE }) {
  return request({
    url: Api.attRiskNum,
    method: 'POST',
    params,
  });
}
/**
 * @description 查询已/未处理的攻击和风险数 windows
 */
export function getAttRiskNumWin(params: { handle: HANDLETYPE }) {
  return request({
    url: Api.attRiskNumWin,
    method: 'POST',
    params,
  });
}

/**
 * @description 危险主机top N
 */
export function dangerHostTopN(params: { count: number; type: number }) {
  return request({
    url: Api.hostTopN,
    method: 'POST',
    params,
  });
}
/**
 * @description 折线图 interval:期间  1/7/30   type:1攻击 2风险
 */
export function getLineData(params: { interval: number; type: number }) {
  return request({
    url: Api.lineCharts,
    method: 'POST',
    params,
  });
}
/**
 * @description 统计数据
 */
export function getAEARP() {
  return request({
    url: Api.statData,
    method: 'GET',
  });
}

/**
 * @description: "获取资产详情
 */
export function getAssetDetail<T>(params: tableParams<T>) {
  return request({
    url: Api.hostview_detail,
    method: 'POST',
    params,
  });
}
/**
 * @description: "运维详情
 */
export function getOperationDetail<T>(params: tableParams<T>) {
  return request({
    url: Api.opeta_detai,
    method: 'POST',
    params,
  });
}
