/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 10:58:10
 * @LastEditTime: 2022-12-23 15:04:51
 */
export interface IPeopleRecordState {
  source: number;
  search_data: string;
  group: number | undefined;
  dispose_kind: number | undefined;
  dispose_res: number | undefined;
  dispose_user: number | undefined;
  risk_type_list: number[];
}
