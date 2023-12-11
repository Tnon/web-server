/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2023-02-16 19:54:29
 */
//安全防护策略
import safe from './safePolicy';
//资产管理策略
import asset from './assetPolicy';
//攻击检测白名单
import white from './whiteList';
//全局自动拦截名单
import black from './blackList';
export default [...safe, ...asset, ...white, ...black];
