/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2023-02-15 12:02:10
 */
import { App } from 'vue';

import { permission } from '@/directives/permission';
import { autofocus } from '@/directives/autofocus';
import { customHtml } from '@/directives/customHtml';

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
  // 权限控制指令（演示）
  app.directive('permission', permission);
  //自动聚焦
  app.directive('focus', autofocus);
  //自定义html
  app.directive('customHtml', customHtml);
}
