/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 19:24:26
 * @LastEditTime: 2023-02-28 21:28:07
 */
import request from '@/utils/http';
import { Tableparams } from './model';

enum Api {
  getList = '/api/events/acdr/event_list',
  getRowInfo = '/api/events/acdr/time_list',
  ngavGragh = '/api/events/acdr/attack_chain',
  ngavGraghTimeLineStatus = '/api/events/acdr/attack_status_info',
  ngavTimeline = '/api/events/acdr/attack_timeline',
  getRecordInfo = '/api/events/acdr/single_event_list',
  getNodeInfo = '/api/events/acdr/attack_node',
  attacktimeApi = '/api/events/acdr/lane_info_list',
}
/**
 * @description: 获取ngav列表
 */
export function getTableList(params: tableParams<Tableparams>) {
  return request({
    url: Api.getList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取ngav行记录的信息
 */
export function getRowInfoByIdHandle(params: { filter: { handle: number; id: number } }) {
  return request({
    url: Api.getRowInfo,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取ngav流程图节点和边
 */
export function getNgavGraghData(params: { detail_id: number }) {
  return request({
    url: Api.ngavGragh,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取ngav流程图时间线节点的状态
 */
export function getNgavGraghTimelineDataStatus(params: {
  detail_id: number;
  flag?: number;
  file_path?: string[];
}) {
  return request({
    url: Api.ngavGraghTimeLineStatus,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取ngav时间轴节点
 */
export function getNgavTimelineData(params: { detail_id: number }) {
  return request({
    url: Api.ngavTimeline,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取ngav行记录的信息
 */
export function getNgavSimpleRecord(params: { handle: number; id: number }) {
  return request({
    url: Api.getRecordInfo,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取节点id和次数id获取节点的信息
 */
export function getNodeInfoMsg(params: {
  node_id: string;
  detail_id: number;
  node_status: number;
}) {
  return request({
    url: Api.getNodeInfo,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取时间轴
 */
export function getAttackTimeLine(params: { detail_id: number }) {
  return request({
    url: Api.attacktimeApi,
    method: 'POST',
    params,
  });
}
