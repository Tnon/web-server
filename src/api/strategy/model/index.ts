import { OSTYPE } from '@/enums/assetsType';

/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-09-20 14:01:39
 */
export interface Md5Sha1FormModal {
  md5: string;
  methods: string;
  name: string;
  osver: OSTYPE;
  remark: string;
  sha1: string;
  type: string;
}
