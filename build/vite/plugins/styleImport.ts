/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-27 16:27:35
 * @LastEditTime: 2021-09-28 16:25:50
 */
import styleImport from 'vite-plugin-style-import';
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
export function configStyleImportPlugin() {
  //生产和开发先用一样的
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          // 组件样式按需加载，无需全局引入
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
    ],
  });
  return styleImportPlugin;
  // return Components({
  //   resolvers: [AntDesignVueResolver()],
  // });
}
