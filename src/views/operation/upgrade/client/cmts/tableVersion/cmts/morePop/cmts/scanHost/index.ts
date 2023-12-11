/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-18 15:26:52
 * @LastEditTime: 2023-07-24 10:45:02
 */
import hostIp from '@/components/host-ip';
import scanHost from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import { E_ScanType } from './type';

export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('asset.macAdress'), //mac地址
    dataIndex: 'mac_addr',
    width: 200,
  },
  {
    title: t('asset.host'),
    dataIndex: 'ip',
    width: 200,
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        cantJump: false,
        nopop: true,
        os: record.os || record.osver,
      }),
  },
  {
    title: t('operation.sblx'), //设备类型
    dataIndex: 'device_type',
    width: 150,
  },
  {
    title: t('operation.fxfs'), //发现方式
    dataIndex: 'found_type',
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        null,
        text === E_ScanType.ARP ? 'ARP' : text === E_ScanType.PING ? 'Ping' : 'Nmap',
      ),
  },
  {
    title: t('operation.fqsmzj'), //发起扫描主机
    dataIndex: 'agent_ip',
    width: 200,
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.agent_ip,
        host_id: record.mac,
        os: record.agent_os || record.osver,
        online: record.agent_online,
        hostname: record.agent_hostname,
      }),
  },
  {
    title: t('asset.fcfxsh'), //首次发现时间
    dataIndex: 'first_time',
    width: 200,
  },
  {
    title: t('operation.zhfxsh'), //最后发现时间
    dataIndex: 'final_time',
    width: 200,
  },
];

export default scanHost;
