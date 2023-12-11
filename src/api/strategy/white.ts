/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-11 20:53:56
 * @LastEditTime: 2023-02-15 19:36:30
 */
import request from '@/utils/http';
enum Api {
  getCreateUserApi = '/api/admin/user/search',
  getUpdateUserApi = '/api/admin/user/search',
  getGroupUserApi = '/api/admin/user/search',
  getList = '/api/policy/bw/list',
  addWList = '/api/policy/bw/wcreate',
  addBList = '/api/policy/bw/bcreate',
  delWbList = '/api/policy/bw/delete',
  getWbListDetail = '/api/policy/bw/detail',
  editWListApi = '/api/policy/bw/wmodify',
  editBListApi = '/api/policy/bw/bmodify',
  getHostTreeGroup = '/api/policy/bw/group',
}

/**
 * @description: "创建人列表"
 */
export function getCreateUser(params) {
  return request({
    url: Api.getCreateUserApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: "变更人列表"
 */
export function getUpdateUser(params) {
  return request({
    url: Api.getUpdateUserApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: "变更人分组人列表"
 */
export function getGroupUser(params) {
  return request({
    url: Api.getGroupUserApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取黑白名单列表
 */
export function getTableList(params: tableParams<any>) {
  return request({
    url: Api.getList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 白名单策略新增
 */
export function addWPolicy(params) {
  return request(
    {
      url: Api.addWList,
      method: 'POST',
      params,
    },
    // {
    //   successMessageText: 'appaddSuc',
    // },
  );
}
/**
 * @description: 黑名单策略新增
 */
export function addBPolicy(params) {
  return request(
    {
      url: Api.addBList,
      method: 'POST',
      params,
    },
    // {
    //   successMessageText: 'appaddSuc',
    // },
  );
}
/**
 * @description: 黑白名单策略删除
 */
export function delWbPolicy(params: { id_list: string; policy_type: number }) {
  return request(
    {
      url: Api.delWbList,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'appdelSuc',
    },
  );
}
/**
 * @description: 获取黑白名单策略详情
 */
export function getWbListDetai(params: { id: number; policy_type: number }) {
  return request({
    url: Api.getWbListDetail,
    method: 'POST',
    params,
  });
}
/**
 * @description: 白名单修改
 */
export function editWlist(params) {
  return request(
    {
      url: Api.editWListApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'appeditSuc',
    },
  );
}
/**
 * @description: 白名单修改
 */
export function editBlist(params) {
  return request(
    {
      url: Api.editBListApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'appeditSuc',
    },
  );
}
/**
 * @description: 获取黑白名单筛选主机组列表
 */
export function getPolicyTreeHostGroup(params) {
  return request({
    url: Api.getHostTreeGroup,
    method: 'POST',
    params,
  });
}
