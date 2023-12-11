/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2023-01-09 17:00:06
 */
import client from './client';
import engine from './engine';
import server from './server';
export default [...client, ...server, ...engine];
//未在后端权限控制，前端手动控制
export const notAdminRouters = [...client, ...engine];
