/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 15:28:16
 * @LastEditTime: 2023-04-28 16:10:06
 */
export const enum HandleType {
  UNHANDLE = 1,
  HANDLED,
}
export const enum E_Handle_Status {
  SBao = 1,
  Ljie,
}
export interface I_Vrl_patch_Filter {
  //处理类型
  handle: HandleType;
  //防护状态
  handled: undefined | E_Handle_Status;
  //虚拟补丁编码
  vrl_patch_code: string;
  //利用漏洞
  vrl_code: string;
  // 影响主机
  ip_list: string;
  //主机分组
  group_list: string;
  //攻击源
  risk_src_list: string;
  //时间范围
  date_range: string;
}
