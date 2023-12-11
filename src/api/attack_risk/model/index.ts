import { HANDLETYPE, MODELTYPE, NOTICETYPE } from '@/enums/attack_risk';

/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-26 10:28:57
 * @LastEditTime: 2023-01-09 17:27:45
 */
export enum BlackWhite {
  Delete,
  White,
  Black,
}
interface TreeParams {
  type: MODELTYPE | NOTICETYPE;
  handle: HANDLETYPE;
  deep: number;
}
interface AttackTableparams {
  //攻击的类型
  risk_path: MODELTYPE;
  //处理状态
  handle: HANDLETYPE;
  //告警类型
  risk_tab_list: { id: string; kind: number }[];
  //搜索
  search_data: string;
  // 处理状态
  risk_status_list: string;
  //攻击源
  risk_src_list: string;
  //影响主机
  ip_list: string;
  //分组
  group_list: string;
  //标签
  tag_list: string;
  //时间范围
  date_range: string;
  //人工处置结果
  dispose_result_list: number | undefined;
  //当前处置策略列表
  policy_list: string | undefined;
  //策略id 从策略跳转需要
  detail_id_list: string | undefined;
  //资产详情
  host_id?: string;
}

export interface AttackHandleRecord {
  filter?: Partial<AttackTableparams>;
  isall: boolean;
  riskinfolist: string[];
  set_note: string;
  set_handle: HANDLETYPE;
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
  // page: {
  //   page_index: number;
  //   page_size: number;
  // };
}

export { TreeParams, AttackTableparams, MsgTimeLine, BlackWhiteRecord };
