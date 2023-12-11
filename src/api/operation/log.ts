/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-03-27 17:44:32
 */
import request from '@/utils/http';
import { cloneDeep } from 'lodash';
enum Api {
  eveOptions = '/api/admin/eventtypelist',
  evelogList = '/api/admin/eventlist',
}

/**
 * @description: "获取行为日志所有事件"
 */
export function getEveOptions() {
  return request({
    url: Api.eveOptions,
    method: 'GET',
  });
}
/**
 * @description: "获取成员日志略表"
 */
export function getEveLogList(
  params: tableParams<{ data_range: string; search_data: string; mod: string }>,
) {
  const paramsClone = cloneDeep(params);
  if (params.filter.mod && params.filter.mod.length) {
    paramsClone.filter.mod = params.filter.mod[params.filter.mod.length - 1];
  }
  return request({
    url: Api.evelogList,
    method: 'POST',
    params: paramsClone,
  });
}
