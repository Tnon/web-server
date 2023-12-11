/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-12-08 19:37:17
 * @LastEditTime: 2022-09-23 13:07:15
 */
const components = import.meta.glob('./*/*.{vue,tsx}', { eager: true });
const modules = {};
Object.keys(components).forEach((path) => {
  const fileName = path.split('/')[1];
  modules[fileName] = (components[path] as any).default;
});
export default modules;
