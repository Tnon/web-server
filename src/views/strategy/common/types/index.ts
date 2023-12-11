/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-06 14:24:44
 * @LastEditTime: 2023-02-22 21:37:42
 */
//策略类型
export const enum StrategyType {
  Safe = 9,
  Asset,
  White,
  Black,
}

//开关
export const enum SwitchMode {
  Close,
  Open,
}
//周期
export const enum Rounds {
  EveryDay = 1,
  Weekly,
  Monthly,
}
//黑名名单表格筛选结构体
export interface I_BW_Filter {
  //攻击类型 导航
  risk_path: string | undefined;
  //主机分组
  host_group: string | undefined;
  //搜素属性值
  search_data: string;
  //属性
  attribute: string | undefined;
  //攻击类型 多选
  attack_type: string | undefined;
  //应用分组 多选
  apply_group: string | undefined;
  //创建人
  create_user: string | undefined;
  //最新规则内容变更人
  update_content_user: string | undefined;
  //最新应用分组变更人
  update_group_user: string | undefined;
  //暂时
  policy_type: E_WB_Enum;
}
export const enum E_WB_Enum {
  White = 11,
  Black,
}
