export interface I_Sec_Filter {
  //搜索
  searchdata: string;
  //危险程度
  vul_level: string;
  //危险类型
  vul_type_code: string;
}
export const enum E_Risk_Level {
  // 低
  Low = 1,
  //中
  Mid,
  // 高
  High,
  //危险
  Danger,
}
