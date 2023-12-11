/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 11:02:11
 * @LastEditTime: 2022-12-29 17:00:46
 */

export interface IThreatRules {
  //属性
  attribute: string | undefined;
  attr_values: {
    //规则，大于 小于
    rules: number | undefined;
    //属性值
    value: string | undefined;
    //且/或
    logic: string | undefined;

    //所有规则（前端用）
    rules_options: number[];
    //所有属性值（前端用）
    value_options: {
      label: string;
      value: string;
    }[];
  }[];
}
export interface IFormState {
  id?: number;
  //批注
  remarks: string;
  //攻击类型
  attack: undefined | string;
  //应用分组
  group: string;
  //规则类型
  rule_type: undefined | number;
  //表单
  rules_detail: IThreatRules[][];
}
