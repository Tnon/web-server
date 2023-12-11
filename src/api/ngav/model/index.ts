import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';

/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-26 10:28:57
 * @LastEditTime: 2021-08-23 14:11:16
 */
export enum BlackWhite {
  Delete,
  White,
  Black,
}
interface TreeParams {
  type: MODELTYPE;
  handle: HANDLETYPE;
  deep: number;
}
interface Tableparams {
  risk_tab_list: { id: string; kind: number }[];
  searchdata: string;
  handledlist: string;
  risksrclist: string;
  iplist: string;
  dtypelist: string;
  grouplist: string;
  taglist: string;
  domainlist: string;
  daterange: string;
  risk_path: string;
  handle: HANDLETYPE;
}

interface HandleRecord {
  filter?: Tableparams;
  isall: boolean;
  riskinfolist: string[];
}
interface BlackWhiteRecord {
  list: {
    id: string;
    unique_flag_id: string;
    risk_path: string;
    dType: number;
    black: BlackWhite;
  }[];
}

interface MsgTimeLine {
  filter: {
    handle: HANDLETYPE;
    id: string;
  };
  page: {
    page_index: number;
    page_size: number;
  };
}

export { TreeParams, Tableparams, HandleRecord, MsgTimeLine, BlackWhiteRecord };
