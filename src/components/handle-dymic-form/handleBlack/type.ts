/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 11:02:11
 * @LastEditTime: 2023-02-08 14:04:44
 */
export interface IThreatRules {
  //处置方式
  methods: number | undefined;
  //应用分组
  group: string;
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
  //表单
  rules_detail: IThreatRules[];
}
