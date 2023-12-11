/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2022-12-27 18:56:58
 */
import request from '@/utils/http';
import { GroupHost } from './model';
enum Api {
  hostgList = '/api/asset/group/list',
  delGps = '/api/admin/user/delete',
  addhgapi = '/api/asset/group',
  hostUserList = '/api/asset/group/adminlist',
  HOSTLIST = '/api/asset/host/list',
  GETOFFCOUNT = '/api/asset/host/offlinehostcount',
  businessGroupTreeApi = '/api/asset/businessgroup/tree',
  movgtBus = '/api/asset/businessgroup/mount',
  renameHostApi = '/api/asset/group/rename',
  deleteHostApi = '/api/asset/group',
  addBusGApi = '/api/asset/businessgroup',
  editBusGApi = '/api/asset/businessgroup/edit',
  deleteBusApi = '/api/asset/businessgroup',
  busgMoveApi = '/api/asset/businessgroup/move',
  businessGroupTreeApiAuth = 'api/asset/businessgroup/auth_tree',
}
/**
 * @description: 获取主机组列表
 */
export function getHostGroupList(params: tableParams<{ search_data: string }>) {
  return request({
    url: Api.hostgList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 删除主机组
 */
export function batchDelUsers(params: { groupidarr: number[] }) {
  return request(
    {
      url: Api.delGps,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
/**
 * @description: "新增主机组"
 */
export function addHostGroup(params: { group_name: string }) {
  return request(
    {
      url: Api.addhgapi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'zjhchsu',
    },
  );
}
/**
 * @description: 获取主机组里管理员数量表格
 */
export function getHostGroupUserList(params: tableParams<{ group_id: number }>) {
  return request({
    url: Api.hostUserList,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取主机组的主机列表"
 */
export function getHostList(params: tableParams<GroupHost>) {
  return request({
    url: Api.HOSTLIST,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取离线主机数量"
 */
export function getoffLineNumber(params: GroupHost) {
  return request({
    url: Api.GETOFFCOUNT,
    method: 'POST',
    params,
  });
}
/**
 * @description: "获取业务组树形结构"
 */
export function getBusinessGroups(
  params: tableParams<{
    business_group_name: string | undefined;
    id: number;
    policy_type?: number;
  }> & {
    exclude_id: string;
    exclude_host: boolean;
  },
) {
  return request({
    url: Api.businessGroupTreeApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: "移动主机组至业务组"
 */
export function moveHostToBusGroup(params: { group_id: number; business_group_id: number }) {
  return request(
    {
      url: Api.movgtBus,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: "主机组重命名"
 */
export function renameHostGroup(params: { id: number; new_group_name: string }) {
  return request(
    {
      url: Api.renameHostApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: "主机组删除"
 */
export function deleteHostGroup(params: { id: number; move_to: number }) {
  return request(
    {
      url: Api.deleteHostApi,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: "新增业务组"
 */
export function addBusinessGroup(params: {
  parent_id: number;
  group_name: string;
  desc_info?: string;
}) {
  return request(
    {
      url: Api.addBusGApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'bunsaddsic',
    },
  );
}
/**
 * @description: "编辑业务组"
 */
export function updateBusGroupApi(params: {
  id: number;
  new_group_name: string;
  new_group_desc?: string;
}) {
  return request(
    {
      url: Api.editBusGApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: "业务组删除"
 */
export function deleteBusGroup(params: { id: number }) {
  return request(
    {
      url: Api.deleteBusApi,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: "业务组之间互相移动"
 */
export function moveBusToBusGroup(params: { current_id: number; target_id: number; flag: number }) {
  return request(
    {
      url: Api.busgMoveApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: "获取权限业务组树形结构"
 */
export function getAuthBusinessGroups(
  params: tableParams<{
    business_group_name: string | undefined;
    id: number;
    policy_type?: number;
  }> & {
    exclude_id: string;
    exclude_host: boolean;
  },
) {
  return request({
    url: Api.businessGroupTreeApiAuth,
    method: 'POST',
    params,
  });
}
