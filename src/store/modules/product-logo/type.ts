/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-02-17 11:00:45
 */
import { OSTYPE } from '@/enums/assetsType';
export const enum E_Win_State {
  None = 1, //windows未安装
  NotActive, //安装未激活
  Active, //安装并激活
}

export type IProductLogo = {
  logoUrl: string;
  productVersion: string;
  //acdr根据后端接口
  acdr_enabled?: boolean;
  os_type: OSTYPE;
  win_state: E_Win_State;
  alarmCount: number;
};
