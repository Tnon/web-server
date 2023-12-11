/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:53:19
 * @LastEditTime: 2023-03-27 17:45:46
 */
import request from '@/utils/http';
import { cloneDeep } from 'lodash';
import { LdapProps } from './model';
enum Api {
  memOptions = '/api/admin/oplogtypelist',
  memlogList = '/api/admin/oploglist',
  updateUserPassword = '/api/admin/user/update_pwd',
  switchEnable = '/api/admin/user/switch',
  updateUserFull = '/api/admin/user/fullupdate',
  users = '/api/admin/user/list',
  addUsers = '/api/admin/user/add',
  delUsers = '/api/admin/user/delete',
  saveLdapCfg = '/api/ldap/save',
  getLadpApi = '/api/ldap/show',
  testLdapApi = '/api/ldap/test',
  getUtypeApi = '/api/maintenance/role/list',
  roleApi = '/api/maintenance/role/list/detail',
  updateUserPasswordSet = '/api/admin/user/update_pwd_current',
  addUtoH = '/api/asset/group/addadmin',
  groupUsers = '/api/asset/group/useadminlist',
}
/**
 * @description: "获取成员日志所有事件"
 */
export function getMemOptions() {
  return request({
    url: Api.memOptions,
    method: 'GET',
  });
}
/**
 * @description: "获取成员日志略表"
 */
export function getMemLogList(
  params: tableParams<{ data_range: string; search_data: string; mod: string }>,
) {
  const paramsClone = cloneDeep(params);
  if (params.filter.mod && params.filter.mod.length) {
    paramsClone.filter.mod = params.filter.mod[params.filter.mod.length - 1];
  }
  return request({
    url: Api.memlogList,
    method: 'POST',
    params: paramsClone,
  });
}
/**
 * @description 修改用户密码
 */
export function updateUserPasswordApi(params) {
  return request(
    {
      url: Api.updateUserPassword,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}
/**
 * @description: 启用/禁用用户
 */
export function enableUser(params: { id: number; enable: number }) {
  return request({
    url: Api.switchEnable,
    method: 'POST',
    params,
  });
}
/**
 * @description 编辑用户信息
 */
export function updateUserApi(params: { data: any }) {
  return request(
    {
      url: Api.updateUserFull,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}
/**
 * @description: 获取用户
 */
export function getUserList(params: tableParams<{ search_data: string }>) {
  return request({
    url: Api.users,
    method: 'POST',
    params,
  });
}
/**
 * @description: 添加用户
 */
export function addUser(params) {
  return request(
    {
      url: Api.addUsers,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'addSuc',
    },
  );
}
/**
 * @description: 删除用户
 */
export function batchDelUsers(params: { useridarr: number[] }) {
  return request(
    {
      url: Api.delUsers,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
/**
 * @description: 保存ldap配置
 */
export function saveLdapCfg(params: LdapProps) {
  return request(
    {
      url: Api.saveLdapCfg,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 获取ldap配置
 */
export function getLdapCfg() {
  return request({
    url: Api.getLadpApi,
    method: 'GET',
  });
}
/**
 * @description: 测试ldap配置
 */
export function testLdapCfg(params: LdapProps) {
  return request(
    {
      url: Api.testLdapApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'ldapTestSuccess',
    },
  );
}

/**
 * @description 设置用户密码
 */
export function setUserPasswordApi(params) {
  return request(
    {
      url: Api.updateUserPasswordSet,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}
/**
 * @description 获取角色下拉框
 */
export function getUtypes() {
  return request({
    url: Api.getUtypeApi,
    method: 'POST',
  });
}

/**
 * @description 获取角色类型
 */
export function getRoleList() {
  return request({
    url: Api.roleApi,
    method: 'POST',
  });
}
/**
 * @description 添加管理员到主机分组
 */
export function addUsersToHostGroup(params) {
  return request({
    url: Api.addUtoH,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取用户
 */
export function getGroupUserList(params: tableParams<{ group_id: number }>) {
  return request({
    url: Api.groupUsers,
    method: 'POST',
    params,
  });
}
