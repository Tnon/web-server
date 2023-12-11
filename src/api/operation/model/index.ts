/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-07-13 10:59:16
 */
import { E_Operation_Type, ONLINESTATUS, OSTYPE, UPCLIPKGTYPE } from '@/enums/assetsType';
export interface ClientFilter {
  osver?: OSTYPE | undefined;
  agent_version?: string | undefined;
  agent_upgraded_status?: number | undefined;
  driver_upgraded_status?: number | undefined;
  groups: string;
  searchdata: string;
  online: number | undefined;
  driver_version?: string | undefined;
  os_info: string;
}
export interface EngineFilter {
  engine_version?: string | undefined;
  engine_upgrade_status?: number | undefined;
  groups: string;
  searchdata: string;
  online: number | undefined;
  type: UPCLIPKGTYPE;
}
export interface UnadapFilter {
  os_info: string;
  host_info: string;
  agent_version: string | undefined;
  status: undefined | number;
  groups: string;
}
/**
 * @description: ldap
 */
export interface LdapProps {
  ldap_enable: boolean;
  ldap_server: string;
  ldap_port: string;
  entry_dn: string;
  entry_pwd: string;
}
export interface syslogParams {
  ip: string;
  port: string;
  protocol: string;
  enabled: false;
  attack: false;
  risk: false;
  behavior: false;
  asset: false;
  asset_option: number;
  asset_weekday: Array<number>;
  asset_daytime: string;
}

export interface RunAgentFilter {
  self_verify: number | undefined;
  online: number | undefined;
  osver: OSTYPE | undefined;
  groups: string;
  searchdata: string;
  os: string;
  host_id?: string;
}

export interface RunDriverFilter {
  driver_status: number | undefined;
  online: number | undefined;
  groups: string;
  searchdata: string;
  osver: OSTYPE;
  os: string;
}

export interface RaspFilter {
  show_status: number | undefined;
  online: number | undefined;
  groups: string;
  searchdata: string;
}
export interface BatchAction<T> {
  include: string;
  exclude: string;
  filter: Partial<T>;
  password?: string;
  type?: E_Operation_Type;
}

export interface CollectionPointFilter {
  searchdata: string;
  online: number | undefined;
  groups: string;
  osver: OSTYPE;
}
export interface GroupHost {
  group_id?: number;
  groups?: string;
  tags: string;
  os: string;
  online: ONLINESTATUS;
}
export interface CloudDetectionFilter {
  searchdata: string;
  online: number | undefined;
  groups: string;
  tags: string;
  osver: OSTYPE;
}
