/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:53:33
 * @LastEditTime: 2022-07-20 10:13:46
 */
import request from '@/utils/http';
enum Api {
  MigrateList = '/api/migrate/grouplist',
  MigrateGroup = '/api/migrate/onegroup',
  migHost = '/api/migrate/manual',
  MigrateDetail = '/api/migrate/detailinfo',
}
/**
 * @description 管理中心迁移列表
 */
export function getMigrateList(params) {
  return request({
    url: Api.MigrateList,
    method: 'POST',
    params,
  });
}
/**
 * @description 管理中心迁移
 */
export function MigrateGroup(params: { group_id: number; new_host: string; new_port: string }) {
  return request(
    {
      url: Api.MigrateGroup,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'issSuc',
    },
  );
}
/**
 * @description: 单台主机迁移
 */
export function migrateSingHost(params: { host_id: string }) {
  return request({
    url: Api.migHost,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取迁移主机详情
 */
export function getMigrateDetail(params: tableParams<{ group: number }>) {
  return request({
    url: Api.MigrateDetail,
    method: 'POST',
    params,
  });
}
