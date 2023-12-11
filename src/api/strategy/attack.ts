/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-11 20:53:56
 * @LastEditTime: 2022-09-20 13:54:30
 */
import request from '@/utils/http';
import { BlackWhite } from '../attack_risk/model';
enum Api {
  attackList = '/api/risk/queryblackwhitelist',
  delAttackList = '/api/risk/deleteblackwhiteitem',
}

/**
 * @description: "攻击黑白名单列表"
 */
export function getAttackList(params: tableParams<{ black: number }>) {
  return request({
    url: Api.attackList,
    method: 'POST',
    params,
  });
}

/**
 * @description: "删除攻击黑白名单列表"
 */
export function delAttackList(params: {
  list: { id: string; dtype: number; black: BlackWhite; unique_flag_id: string }[];
}) {
  return request(
    {
      url: Api.delAttackList,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
