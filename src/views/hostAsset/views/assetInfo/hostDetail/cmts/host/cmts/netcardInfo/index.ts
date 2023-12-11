/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-17 21:03:37
 * @LastEditTime: 2022-12-29 16:52:43
 */
import netcardInfo from './index.vue';
export const configData = (t: any) => ({
  cardConfig: [
    {
      label: t('asset.macAdress'), // mac地址
      key: 'eth_mac',
    },
    {
      label: t('asset.ipv4'), // ipv4
      key: 'eth_ipv4_list',
    },
    {
      label: t('asset.ipv6'), // ipv6
      key: 'eth_ipv6_list',
    },
    {
      label: t('asset.defaultGateway'), // 默认网关
      key: 'eth_gateway_list',
    },
    {
      label: 'DNS Server', // DNS Server
      key: 'dns_list',
    },
    {
      label: t('asset.netcardStatus'), // 网卡状态
      key: 'eth_link_state',
    },
    {
      label: t('asset.subnetMask'), // 网卡子网掩码
      key: 'eth_mask_list',
    },
    {
      label: t('asset.netcardSpeed'), // 网卡速度
      key: 'eth_speed',
    },
    {
      label: t('asset.broadcastAddress'), // 网卡广播地址
      key: 'eth_bcast_list',
    },
  ],
});
export default netcardInfo;
