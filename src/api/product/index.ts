/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-20 10:46:10
 * @LastEditTime: 2022-07-20 11:02:45
 */
import { OSTYPE } from '@/enums/assetsType';
import request from '@/utils/http';

enum Api {
  gsetBasicInfo = '/api/admin/config/info',
  adpDriverList = '/api/agent/latest_driver',
}

/**
 * @description 获取登录页信息
 */
export function getBasicInfoApi() {
  return request({
    url: Api.gsetBasicInfo,
    method: 'GET',
  });
}

/**
 * @description 修改登录页信息
 */
export function updateBasicInfoApi(params: { name: string; support: string; contact: string }) {
  return request(
    {
      url: Api.gsetBasicInfo,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}
/**
 * @description: 获取适配驱动库列表
 */
export function getDriverList(params: tableParams<{ osver: OSTYPE | undefined }>) {
  return request({
    url: Api.adpDriverList,
    method: 'POST',
    params,
  });
}
