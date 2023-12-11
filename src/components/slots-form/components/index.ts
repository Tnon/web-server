/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2022-09-23 13:07:53
 */
// components是一个对象包含了当前目录下面的各种类型的.vue文件在这里是input.vue/radio.vue等
const components = import.meta.glob('./*.vue', { eager: true });
const modules = {};

// modules是一个对象{hooks-form-input:{组件信息},...}，path是键名
Object.keys(components).forEach((path) => {
  const fileName = 'hooks-form-' + path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  modules[fileName] = (components[path] as any).default;
});
export default modules;
