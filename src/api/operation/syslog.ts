/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:54:18
 * @LastEditTime: 2023-09-21 14:57:04
 */
import request from '@/utils/http';
import { syslogParams } from './model';
enum Api {
  gsetSyslog = '/api/admin/config/syslog',
  syncAssetApi = '/api/admin/config/syslog/push',
  rasptableList = '/api/policy/syslog/typelist',
  addLogApi = '/api/policy/syslog/typecreate',
  delLogApi = '/api/policy/syslog/typedelete',
  raspdtableList = '/api/policy/syslog/list',
  switchRuleApiDf = '/api/policy/syslog/enabled',
  addPApi = '/api/policy/syslog/create',
  padetailApi = '/api/policy/syslog/detail',
  delLogDeApi = '/api/policy/syslog/delete',
  rasptableLGist = '/api/policy/syslog/hostlist',
  rasptableLGdist = '/api/policy/syslog/monitorlist',
  editPApi = '/api/policy/syslog/modify',
  gsetSysLog = '/api/policy/syslog/config',
}
/**
 * @description 获取syslog信息
 */
export function getSyslogApi() {
  return request({
    url: Api.gsetSyslog,
    method: 'GET',
  });
}

/**
 * @description 修改syslog信息
 */
export function updateSyslogApi(params: syslogParams) {
  return request(
    {
      url: Api.gsetSyslog,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}
/**
 * @description 资产立即手动同步
 */
export function syncAssetApi() {
  return request(
    {
      url: Api.syncAssetApi,
      method: 'GET',
    },
    {
      successMessageText: 'zcxitbz',
    },
  );
}

/**
 * @description: r志视图
 */
export function getSysPlist<T>(params: tableParams<T>) {
  return request({
    url: Api.rasptableList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 新增日志类型
 */
export function addLogTypeApi<T>(params: T) {
  return request({
    url: Api.addLogApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 删除日志类型
 */
export function delLogTypeApi<T>(params: T) {
  return request({
    url: Api.delLogApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: z志视图
 */
export function getSysHlist<T>(params: tableParams<T>) {
  return request({
    url: Api.raspdtableList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 规则启停
 */
export function switchRuleDf<T>(params: T) {
  return request(
    {
      url: Api.switchRuleApiDf,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 规则启停
 */
export function addConfigPath<T>(params: T) {
  return request(
    {
      url: Api.addPApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 配置详情
 */
export function getPatchDetial<T>(params: T) {
  return request({
    url: Api.padetailApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 删除日志类型
 */
export function delLogTypeDetailApi<T>(params: T) {
  return request({
    url: Api.delLogDeApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: r志视图
 */
export function getSysHostlist<T>(params: tableParams<T>) {
  return request({
    url: Api.rasptableLGist,
    method: 'POST',
    params,
  });
}
/**
 * @description: 监控详情
 */
export function getMDlist<T>(params: tableParams<T>) {
  return request({
    url: Api.rasptableLGdist,
    method: 'POST',
    params,
  });
}
/**
 * @description: 规则启停
 */
export function editConfigPath<T>(params: T) {
  return request(
    {
      url: Api.editPApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: syslog配置保存
 */
export function saveSyslog<T>(params: T) {
  return request(
    {
      url: Api.gsetSysLog,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 规则启停
 */
export function getSyslog() {
  return request({
    url: Api.gsetSysLog,
    method: 'GET',
  });
}
