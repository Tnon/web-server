/*
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-07-12 15:59:47
 * @LastEditTime: 2022-09-26 10:42:27
 */

import { ASSETSTATUS, GROUPS, ONLINESTATUS, OSTYPE, SECURESTATUS } from '@/enums/assetsType';

//资产视图
export interface AssetsView {
  name: string;
}

//主机视图
export interface HostView {
  searchdata: string;
  osver: OSTYPE | undefined;
  group_id: number;
}

//资产详情视图
export interface AssetsViewDetail {
  name: string;
}

//主机详情视图
export interface HostViewDetail {
  id: string;
}

//主机列表
export interface HostList {
  osver: OSTYPE;
  online: ONLINESTATUS;
  asset_status?: ASSETSTATUS;
  secure_status?: SECURESTATUS;
  group_id: number | GROUPS;
  groups: string;
  searchdata: string;
  update_time?: string;
  tags: string;
  os: string;
  offline_order_by?: number; // 是否按离线时间排序
}

//移动主机参数
export interface MovePara {
  group_id: number | GROUPS;
  target_group_id: number | GROUPS;
  flag: number;
}

//删除主机参数
export interface DelPara {
  id: number;
  move_to: number;
}

//删除主机参数
export interface AddPara {
  parent_id: number;
  name: string;
}

//分组重命名
export interface RnamePara {
  group_id: number | GROUPS;
  new_name: string;
}

//移动主机/删除主机
export interface MoveDelPara {
  group_id?: number | number[];
  host_id_array?: string;
  filter?: Partial<HostList>;
  exclude?: string;
  password?: string;
}

//标签
export interface HostTags {
  host_id: string;
  tag: string;
}
