/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-03-14 21:25:11
 */
import request from '@/utils/http';

/**
 * @description: "激活windows"
 */
export function activeWin({ url, password = undefined }) {
  return request({
    url: url,
    method: 'POST',
    params: { password },
  });
}
