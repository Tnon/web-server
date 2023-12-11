/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-08 23:20:45
 * @LastEditTime: 2022-09-23 13:04:11
 */
const components = import.meta.glob('./*/*.vue', { eager: true });
const modules = {};
Object.keys(components).forEach((path) => {
  const fileName = path.split('/')[1];
  modules[fileName] = (components[path] as any).default;
});
export default modules;
