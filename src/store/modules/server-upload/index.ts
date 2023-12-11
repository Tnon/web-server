/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-07-24 11:24:22
 */
import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import type { ServerUploadState } from './type';

export const useServerUpload = defineStore('server-upload', () => {
  const state = reactive<ServerUploadState>({
    agent: {
      progress: 0,
      speed: 0,
      timeRemaining: 0,
    },
    server: {
      progress: 0,
      speed: 0,
      timeRemaining: 0,
    },
  });
  function SetServerProgress(type: 'server' | 'agent', progress: number): void {
    state[type].progress = progress;
  }
  function SetServerSpeed(type: 'server' | 'agent', speed: number): void {
    state[type].speed = speed;
  }
  function SetServertimeRemaining(type: 'server' | 'agent', timeRemaining: number): void {
    state[type].timeRemaining = timeRemaining;
  }
  function initData(type: 'server' | 'agent'): void {
    state[type].progress = 0;
    state[type].speed = 0;
    state[type].timeRemaining = 0;
  }

  return {
    ...toRefs(state),
    SetServerProgress,
    SetServertimeRemaining,
    SetServerSpeed,
    initData,
  };
});
