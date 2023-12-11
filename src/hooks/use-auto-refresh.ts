/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-31 18:10:53
 * @LastEditTime: 2022-09-01 12:47:32
 */
import { ref, unref } from 'vue';
import { storage } from '@/utils/Storage';
//刷新hook
export const useAutoRefresh = (reload, timer, modeltype) => {
  //静默刷新
  const isOpenSilence = ref<boolean>(storage.get(`openSilence${modeltype}`) ?? false);
  //静默刷新周期
  const refreshRound = ref<number>(storage.get(`silenceRound${modeltype}`) ?? 1);
  //刷新的周期函数
  const refreshRoundChange = () => {
    storage.set(`silenceRound${modeltype}`, unref(refreshRound));
    clearInterval(unref(timer));
    timer.value = setInterval(() => {
      reload();
    }, unref(refreshRound) * 1000 * 60);
  };
  //开启刷新的switch
  const switchChange = (v) => {
    storage.set(`openSilence${modeltype}`, v);
    if (v) {
      refreshRoundChange();
    } else {
      clearInterval(unref(timer));
    }
  };
  if (unref(isOpenSilence)) {
    refreshRoundChange();
  }
  return {
    timer,
    isOpenSilence,
    refreshRound,
    refreshRoundChange,
    switchChange,
  };
};
