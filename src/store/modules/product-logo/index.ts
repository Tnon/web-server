/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-02-17 15:48:39
 */
import { systemConfig } from '@/api/system';
import { OSTYPE } from '@/enums/assetsType';
import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

import { E_Win_State, IProductLogo } from './type';

export const useProductLogo = defineStore('product-logo', () => {
  const state = reactive<IProductLogo>({
    logoUrl: '',
    productVersion: '',
    //acdr根据后端接口
    acdr_enabled: false,
    os_type: OSTYPE.LINUX,
    win_state: E_Win_State.None,
    alarmCount: 0,
  });
  function SetProductLogo(url: string): void {
    state.logoUrl = url;
  }
  function SetProductVersion(version: string): void {
    state.productVersion = version;
  }
  //acdr根据后端接口
  function SetProductAcdr(acdr_enabled: boolean): void {
    state.acdr_enabled = acdr_enabled;
  }
  function SetOsType(ostype: OSTYPE): void {
    state.os_type = ostype;
  }
  function SetAlarmCount(count: number): void {
    state.alarmCount = count;
  }
  function SetSwitchAble(status: E_Win_State): void {
    state.win_state = status;
  }

  //获取产品信息
  async function GetProductLogoVersion() {
    const { logo, version, acdr_enabled, os_type, win_state } = await systemConfig();
    SetProductLogo(logo);
    SetProductVersion(version);
    SetProductAcdr(acdr_enabled ?? false);
    SetOsType(os_type ?? OSTYPE.LINUX);
    SetSwitchAble(win_state ?? E_Win_State.None);
  }
  return {
    ...toRefs(state),
    SetProductLogo,
    SetProductVersion,
    GetProductLogoVersion,
    //acdr根据后端接口
    SetProductAcdr,
    SetSwitchAble,
    SetAlarmCount,
    SetOsType,
  };
});
