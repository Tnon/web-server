/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 16:12:26
 * @LastEditTime: 2023-02-14 11:43:05
 */
import hostStatistic from './index.vue';
import { ASSETSTATUS, ONLINESTATUS, SECURESTATUS } from '@/enums/assetsType';

export interface assetNode {
  key: string;
  title: string;
  color?: string;
  query?: { [k: string]: number };
}
export const getAssetState = (t: any): assetNode[] => [
  {
    key: 'total',
    title: t('asset.hostTotal'), // 主机总计
  },
  {
    key: 'online_count',
    title: t('common.onLine'), // 在线
    color: '#18BA79',
    query: { online: ONLINESTATUS.ONLINE },
  },
  {
    key: 'offline_count',
    title: t('common.offLine'), // 离线
    color: '#888888',
    query: { online: ONLINESTATUS.OFFLINE },
  },
  {
    key: 'uninstalled_count',
    title: t('common.uninstall'), // 已卸载
    query: { online: ONLINESTATUS.UNINSTALL },
  },
  {
    key: 'healthy_count',
    title: t('asset.safeHost'), // 安全主机
    color: '#18BA79',
    query: { secure_status: SECURESTATUS.HEALTHY, asset_status: ASSETSTATUS.SAFE },
  },
  {
    key: 'vul_count',
    title: t('asset.haveVultyHost'), // 存在漏洞主机
    color: '#F8A556',
    query: { asset_status: ASSETSTATUS.HAVEVULTY },
  },
  {
    key: 'risk_count',
    title: t('asset.riskHost'), // 存在风险主机
    color: '#F8A556',
    query: { asset_status: ASSETSTATUS.HAVERISK },
  },
  {
    key: 'alarm_count',
    title: t('asset.czgjzj'), // 存在告警主机
    color: '#F75555',
    query: { secure_status: SECURESTATUS.ALARM },
  },
  {
    key: 'event_count',
    title: t('asset.czsjzj'), // 存在事件主机
    color: '#f8a454',
    query: { secure_status: SECURESTATUS.ACDR },
  },
];
export default hostStatistic;
