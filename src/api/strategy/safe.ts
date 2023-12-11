/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2023-02-03 18:40:35
 */
import request from '@/utils/http';
enum Api {
  sercuityList = '/api/policy/comp/list',
  sercuityListGroup = '/api/policy/comp/detail_list',
  addSafe = '/api/policy/comp/comp',
  editSafe = '/api/policy/comp/rename',
  deleteSafe = '/api/policy/comp/comp',
  getEffectOption = '/api/policy/apply_detail',
  getEffectHosts = '/api/policy/host_apply_list',
  getStraIndex = '/api/policy/comp/listindex',
  getStraData = '/api/policy/comp/detail',
  StategyApplyList = '/api/policy/group_tree',
  setStraData = '/api/policy/comp/modify',
  // setStraGroups = '/api/policy/apply',
}

/**
 * @description: "获取安全防护策略列表表格视图"
 */
export function getSercuityListWithGroup(params: tableParams<{ policy_type: number }>) {
  return request({
    url: Api.sercuityListGroup,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取安全防护策略列表"
 */
export function getSercuityList(params: tableParams<{ policy_type: number }>) {
  return request({
    url: Api.sercuityList,
    method: 'POST',
    params,
  });
}
/**
 * @description: "新增安全防护策略名称"
 */
export function addSafeStrategy(params: { pkg: { name: string; policy_type: number } }) {
  return request(
    {
      url: Api.addSafe,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'appaddSuc',
    },
  );
}
/**
 * @description: "修改安全防护策略名称"
 */
export function editSafeStrategy(params: { name: string; id: number; policy_type: number }) {
  return request(
    {
      url: Api.editSafe,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'appupdSuc',
    },
  );
}
/**
 * @description: "删除安全防护策略"
 */
export function delSafeStrategy(params: { id_string: string; policy_type: number }) {
  return request(
    {
      url: Api.deleteSafe,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'appdelSuc',
    },
  );
}
/**
 * @description: 抽屉 获取策略生效时间和数量
 */
export function getEffectOption(params: { group_id: number; id: number }) {
  return request({
    url: Api.getEffectOption,
    method: 'POST',
    params,
  });
}

/**
 * @description: 抽屉 获取策略生效主机
 */
export function getEffectHosts(params: tableParams<{ group_id: number; id: number }>) {
  return request({
    url: Api.getEffectHosts,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取编辑的策略在策略列表第几页
 */
export function getEditPageIndex(params: { id: number; page_size: number; policy_type: number }) {
  return request({
    url: Api.getStraIndex,
    method: 'POST',
    params,
  });
}
/**
 * @description: 根据策略id获取安全防护策略的详情
 */
export function getSafeStrategyData(params: { id: number; policy_type: number }) {
  return request({
    url: Api.getStraData,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取分组树，带策略"
 */
export function getStategyApplyList(params: tableParams<{ policy_type: number }>) {
  return request({
    url: Api.StategyApplyList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 根据策略id保存策略
 */
export function saveSafeStrategy(params: {
  pkg: { id: number; policy_type: number; nodes: object; name: string };
  groups: string;
}) {
  return request(
    {
      url: Api.setStraData,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'savesucess',
    },
  );
}
// /**
//  * @description: 根据策略id保存策略应用的分组
//  */
// export function saveSafeStrategyGroups(params: {
//   policy_type: number;
//   switch: { group_id: number; policy_id: number }[];
// }) {
//   return request({
//     url: Api.setStraGroups,
//     method: 'POST',
//     params,
//   });
// }
