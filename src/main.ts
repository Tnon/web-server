/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 09:31:11
 * @LastEditTime: 2022-07-20 16:18:14
 */

import '@/assets/icons/iconfont.css';
import '@/assets/icons/iconfont.js';
import { createApp } from 'vue';
import router, { setupRouter } from './router';
import {
  // setupPostCss,
  setupAntd,
  setupDirectives,
  GlobalI18n,
  setupGlobalMethods,
  setupCustomComponents,
} from '@/plugins';
import { setupStore } from '@/store';
import App from './App.vue';
// Register icon sprite
import 'virtual:svg-icons-register';
import '/mytheme/index.less';
const app = createApp(App);
//cssTorem
// setupPostCss();
// 注册全局常用的ant-design-vue组件
setupAntd(app);
// 注册全局组件
setupCustomComponents(app);
// 注册全局自定义指令，如：v-permission权限指令
setupDirectives(app);
// 注册全局方法
setupGlobalMethods();
//全局国际化
GlobalI18n(app);
// 挂载vuex状态管理
setupStore(app);
// 挂载路由
setupRouter(app);

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'));
