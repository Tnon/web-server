/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 11:03:34
 */
export enum AUTHSTATUS {
  //正版授权
  Authorized = 'genAuth',
  //未授权
  Unauthorized = 'Unauthorized',
  //授权过期
  Expired = 'authExp',
  //未生效
  Notinforce = 'notEffe',
}

export enum AUTHDAYSSTATUS {
  //永久授权
  Forever = 'perAuth',
}
