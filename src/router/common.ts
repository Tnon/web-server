/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2023-02-17 12:03:21
 */
//全部路由
import overview from '@/router/modules/overview';
import attack from '@/router/modules/attack';
import ngav from '@/router/modules/ngav';
import hostAsset from '@/router/modules/hostAsset';
import strategy from '@/router/modules/strategy';
import reinforce from '@/router/modules/reinforce';
import setting from '@/router/modules/setting';
import avatar from '@/router/modules/avatar';
import report from '@/router/modules/report';
import operation from '@/router/modules/operation';
//服务端全部路由
export const adminRouters = [
  ...overview,
  ...attack,
  ...ngav,
  ...hostAsset,
  ...strategy,
  ...reinforce,
  ...report,
  ...operation,
];
//设置和头像
export const setAvatarRouters = [...setting, ...avatar];
export default [...adminRouters, ...setAvatarRouters];
