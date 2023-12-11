/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-26 10:26:26
 * @LastEditTime: 2023-03-13 20:18:10
 */

import request from '@/utils/http';
import {
  TreeParams,
  AttackTableparams,
  AttackHandleRecord,
  MsgTimeLine,
  BlackWhiteRecord,
} from './model';

enum Api {
  getTree = '/api/risk/queryrisktreelist',
  getList = '/api/risk/queryriskinfo',
  getDtypePathinfo = '/api/risk/getdtypepathinfo',
  getMsgTimeline = '/api/risk/queryoneriskinfo',
  handleRecordBlackWhite = '/api/risk/setriskblackwhite',
  exportFileExcel = '/api/export/riskinfo',
  gettagList = '/api/risk/risktablist',
  getFileApi = '/api/risk/uploadfile',
  recordApi = '/api/risk/queryoperatelist',
  getPeopleList = '/api/risk/manmade_dispose_list',
  peoplerecordApi = '/api/risk/dispose_user_list',
  batchHandleApi = '/api/handle/set_handle_status',
  recordTimeApi = '/api/risk/queryhistorylist',
  pidpApi = '/api/dispose/manmade_dispose_info',
  getattrApi = '/api/dispose/attribute_filed',
  getruleValueApi = '/api/dispose/attribute_info',
  getAllattackApi = '/api/risk/threaten_kind_list',
  getAllattackApiTree = '/api/policy/bw/risktree',
  handleThereatApis = '/api/dispose/send_manmade_dispose',
  getFInalStatus = '/api/risk/uploadfilestatus',
  getCzfsApi = '/api/dispose/dispose_kind_list',
  getCanSList = '/api/risk/queryrisknum',
}

/**
 * @description: 获取攻击/风险树
 */
export function getTreeDataApi(params: TreeParams) {
  return request({
    url: Api.getTree,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取攻击/风险列表
 */
export function getTableList(params: tableParams<AttackTableparams>) {
  return request({
    url: Api.getList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取攻击/风险可选总数
 */
export function getCanSelecAlarmtApi(params: AttackTableparams) {
  return request({
    url: Api.getCanSList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取人工处置列表
 */
export function getPeopleHandleList(params) {
  return request({
    url: Api.getPeopleList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 抽屉 获取动态信息和时间轴
 */
export function getDrawDetailMsg(params: MsgTimeLine) {
  return request({
    url: Api.getMsgTimeline,
    method: 'POST',
    params,
  });
}

/**
 * @description: 加白攻击和风险
 */
export function whtblkAttackRisk(params: BlackWhiteRecord) {
  return request(
    {
      url: Api.handleRecordBlackWhite,
      method: 'POST',
      params,
    },
    {
      // successMessageText: !!params.black ? 'blakSuc' : 'whitSuc'
    },
  );
}

/**
 * @description: 导出
 */
export function exportFileExcel(params: { filter: AttackTableparams }) {
  return request({
    url: Api.exportFileExcel,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取攻击/风险标签
 */
export function getAttRiskListApi(params: { filter: AttackTableparams }) {
  return request({
    url: Api.gettagList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取文件信息和类文件信息
 */
export function getFileApi(params: {
  detail_id: string | number;
  process_id?: string;
  mac: string;
  file_type: number;
  file_size: string;
  directory_name: string;
  file_name: string;
  file_md5?: string;
}) {
  return request({
    url: Api.getFileApi,
    method: 'POST',
    params,
  });
}

/**
 * @description 批量操作，处理 打开 忽略等
 */
export function batchHandleApi(params: AttackHandleRecord) {
  return request(
    {
      url: Api.batchHandleApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 获取处置记录
 */
export function getAllRecordApi(params) {
  return request({
    url: Api.recordApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取处置人
 */
export function getHandlePeople(params) {
  return request({
    url: Api.peoplerecordApi,
    method: 'GET',
    params,
  });
}
/**
 * @description 获取攻击记录
 */
export function getAttackRecordDraw(params) {
  return request({
    url: Api.recordTimeApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取拦截的进程pid
 */
export function getPidProgress(params) {
  return request({
    url: Api.pidpApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取攻击类型下的属性
 */
export function getPolicyAttrs(params: {
  risk_type_list: string | undefined;
  black: number;
  kind?: number;
}) {
  return request({
    url: Api.getattrApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取属性的规则和值
 */
export function getAttrRuleAndValue(params: {
  risk_type_list: string | undefined;
  black: number;
  filed: string;
  mac_risk_key: string;
}) {
  return request({
    url: Api.getruleValueApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取所有攻击类型
 */
export function getAttackOptions(params) {
  return request({
    url: Api.getAllattackApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取黑白名单攻击类型
 */
export function getAttackTreeDataApi(params) {
  return request({
    url: Api.getAllattackApiTree,
    method: 'POST',
    params,
  });
}
/**
 * @description 后续自动处置
 */
export function handleThreatApi(params) {
  return request(
    {
      url: Api.handleThereatApis,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description 轮训获取文件信息
 */
export function getFinalFileStatus(params) {
  return request({
    url: Api.getFInalStatus,
    method: 'POST',
    params,
  });
}

/**
 * @description 获取处置方式
 */
export function getCzfsMethods(params) {
  return request({
    url: Api.getCzfsApi,
    method: 'POST',
    params,
  });
}
