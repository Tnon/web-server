/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-25 18:26:46
 * @LastEditTime: 2023-06-25 18:33:02
 */
export type T_Agt_Type = 'agent' | 'plugin' | 'collection';
export const enum E_Agt_Status {
  Normal = 1,
  Error,
}
export interface I_Agt_Run_Status {
  count: number;
  detail: {
    status: E_Agt_Status;
    name: string;
    desc: string;
    version: string;
  }[];
}

export type T_Self_Status = Record<T_Agt_Type, I_Agt_Run_Status>;

export const enum E_Run_Status {
  Error = 1,
  Ok,
  Parse,
  PartParse,
}
