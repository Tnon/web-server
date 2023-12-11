/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-11 18:40:06
 * @LastEditTime: 2022-10-11 19:28:18
 */
import exportRouters from './export';
import reportCreateRouters from './reportCreate';

export default [...reportCreateRouters, ...exportRouters];
