/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-19 16:16:55
 * @LastEditTime: 2022-04-24 15:46:17
 */
declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
declare module '*.png' {
  const src: string;
  export default src;
}
