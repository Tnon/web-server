/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-27 16:23:56
 * @LastEditTime: 2021-09-27 16:23:57
 */

import SvgIconsPlugin from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin() {
  const svgIconsPlugin = SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/images')],
    svgoOptions: true,
    // default
    symbolId: 'ax-[dir]-[name]',
  });
  return svgIconsPlugin;
}
