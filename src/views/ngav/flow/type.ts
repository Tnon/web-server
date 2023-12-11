/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-21 16:28:06
 * @LastEditTime: 2022-12-29 20:14:12
 */
//攻击次数
export interface PathCi {
  //第几次的文字
  seletedCiText: string;
  //第几次的id
  detail_id: number;
  //第几次的持续时间
  duration: number;
  //第几次的开始时间
  start_time: string;
  //第几次的结束时间
  end_time: string;
}
//下拉框
export interface SelectOption {
  //下拉框label
  act_path_name: string;
  //下拉框value
  act_path_sha256: string;
  //攻击路径的开始时间
  path_start_time: string;
  //攻击路径的结束时间
  path_end_time: string;
  //下拉框选项的攻击次数
  item: PathCi[];
}

// 流程图还是时间线
export const enum NgavType {
  Flow = 1,
  TimeLine,
}
//数据源
export interface SourceState {
  rule_name: string;
  root_name: string;
  score: number;
  level: string;
  sub_rule_name: string;
  //下拉框的数据
  select_options: SelectOption[];
}
