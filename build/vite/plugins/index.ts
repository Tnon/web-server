/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-27 15:40:36
 * @LastEditTime: 2023-07-27 14:29:49
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configSvgIconsPlugin } from './svgSprite';
// import { visualizer } from 'rollup-plugin-visualizer';
import { configCompressPlugin } from './compress';
// import { configStyleImportPlugin } from './styleImport';
// import { ThemePlugin } from './theme'
// import legacy from '@vitejs/plugin-legacy';

export function useVitePlugins(viteEnv: ViteEnv, isProduction: boolean) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DEL_SOURCE_FILE } = viteEnv;
  //VITE_USE_IMAGEMIN,
  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),

    // visualizer({
    //   emitFile: true, //是否被触摸
    //   filename: 'test.html', //生成分析网页文件名
    //   open: true, //在默认用户代理中打开生成的文件
    //   gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
    //   brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
    // }),
  ];

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin());

  // vite-plugin-style-import
  // vitePlugins.push(configStyleImportPlugin());

  // vite-plugin-style-import
  // vitePlugins.push(ThemePlugin());

  //vite-plugin-imagemin 一直不成功
  // isProduction && VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

  // rollup-plugin-gzip
  isProduction &&
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DEL_SOURCE_FILE),
    );

  // isProduction &&
  //   vitePlugins.push(
  //     legacy({
  //       targets: ['chrome 52'],
  //       additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  //       renderLegacyChunks: true,
  //       polyfills: [
  //         'es.symbol',
  //         'es.array.filter',
  //         'es.array.some',
  //         'es.array.every',
  //         'es.array.find',
  //         'es.promise',
  //         'es.promise.finally',
  //         'es/map',
  //         'es/set',
  //         'es.array.for-each',
  //         'es.object.define-properties',
  //         'es.object.define-property',
  //         'es.object.get-own-property-descriptor',
  //         'es.object.get-own-property-descriptors',
  //         'es.object.keys',
  //       ],
  //     }),
  //   );
  return vitePlugins;
}
