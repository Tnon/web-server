/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-07 09:50:54
 * @LastEditTime: 2022-12-26 09:48:08
 */
import type { ProxyOptions } from 'vite';
import https from 'https';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;
const httpsRE = /^https:\/\//;
/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target: target,
      ...(isHttps
        ? {
            changeOrigin: true,
            secure: false,
            //mac 代理失败
            agent: new https.Agent(),
          }
        : {}),
    };
  }
  return ret;
}
