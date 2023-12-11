import { ONLINESTATUS, OSTYPE, SECURESTATUS } from '@/enums/assetsType';

/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2022-04-12 10:44:37
 */
export interface ContentProps {
  group_id: number;
}
export interface Agus {
  //健康状态
  secure_status: SECURESTATUS;
  //在线离线
  online: ONLINESTATUS;
  //系统
  osver: OSTYPE;
  //高级筛选的分组
  groups: string;
  //高级筛选的日期
  update_time: string;
  //搜索
  searchdata: string;
  //标签
  tags: string;
  //组
  group_id: number;
}
