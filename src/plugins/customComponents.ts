import { App } from 'vue';

import { globalModal } from '@/components/global-modal';
import customIcon from '@/components/custom-icon';
import countTo from '@/components/count-to';

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('GlobalModal', globalModal);
  app.component('CustomIcon', customIcon);
  app.component('CountTo', countTo);
}
