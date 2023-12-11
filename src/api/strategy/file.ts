/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-11 20:53:56
 * @LastEditTime: 2022-09-20 14:20:28
 */
import request from '@/utils/http';
import { Md5Sha1FormModal } from './model';
enum Api {
  md5sha1List = '/api/admin/getbwmdshalist',
  signList = '/api/admin/getbwdigisign',
  addmd5sha1List = '/api/admin/addbwmd5sha1',
  addsignApi = '/api/admin/addbwdigisign',
  delMd5Sha1api = '/api/admin/delbwmd5sha1',
  delSignapi = '/api/admin/delbwdigisign',
}

/**
 * @description: "文件MD5/SHA1 列表"
 */
export function getMd5Sha1List(params: tableParams<{ search_data: string; policy_type: number }>) {
  return request({
    url: Api.md5sha1List,
    method: 'POST',
    params,
  });
}
/**
 * @description: "新增文件MD5/SHA1"
 */
export function addMd5Sha1(params: Md5Sha1FormModal) {
  return request(
    {
      url: Api.addmd5sha1List,
      method: 'POST',
      params,
    },
    {
      successMessageText: params.methods === 'add' ? 'addSuc' : 'modSuc',
    },
  );
}
/**
 * @description: "数字签名列表"
 */
export function getSignList(params: tableParams<{ search_data: string; policy_type: number }>) {
  return request({
    url: Api.signList,
    method: 'POST',
    params,
  });
}
/**
 * @description: "新增数字签名"
 */
export function addSign(params: {
  certificate: string;
  signature: string;
  type: number;
  methods: string;
}) {
  return request(
    {
      url: Api.addsignApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: params.methods === 'add' ? 'addSuc' : 'modSuc',
    },
  );
}
/**
 * @description: "删除文件MD5/SHA1"
 */
export function delMd5Sha1(params: { ids: string[] }) {
  return request(
    {
      url: Api.delMd5Sha1api,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
/**
 * @description: "删除签名"
 */
export function delSignList(params: { ids: string[] }) {
  return request(
    {
      url: Api.delSignapi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
