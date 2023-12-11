/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 19:52:37
 * @LastEditTime: 2022-10-25 12:12:30
 */
//安装与升级
import upgrate from './upgrade';
//运行管理
import run from './run';
//迁移管理
import migrate from './migrate';
//资产
import asset from './asset';
//成员管理
import user from './user';
//主机行为日志
import log from './log';
//基础设置
import basic from './basic';
//安全
import safe from './safe';
export default [...upgrate, ...run, ...migrate, ...asset, ...user, ...log, ...basic, ...safe];
