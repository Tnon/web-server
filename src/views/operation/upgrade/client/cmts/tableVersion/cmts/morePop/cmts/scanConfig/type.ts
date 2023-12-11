/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-18 17:00:42
 * @LastEditTime: 2023-07-18 19:13:08
 */
import { I_Host_Map } from '@/views/reinforce/baseline/cmts/tableContent/type';

export interface I_Form_Data {
  apply_type: number | undefined; // 应用维度: 1: 全部主机; 2: 分组; 3: 主机
  host_group: string; // 分组ID列表
  host_list: I_Host_Map[]; // 主机mac列表
  scan_address: string;
  arp: boolean;
  ping: boolean;
  nmap: boolean;
  system: boolean;
  tcp: boolean;
  tcp_value: string;
  udp: boolean;
  udp_value: string;
  scan_count: number;
  package_count: number;
}
