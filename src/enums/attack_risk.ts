/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-26 10:32:53
 * @LastEditTime: 2023-04-07 10:51:42
 */
/**
 * @description: 资产 title/placeholder/number名称
 */
// 提示（通知）类型：攻击、风险合并后，原来的attack和risk不再使用
// 防止更改影响其他页面，所以单独写了一个符合新版本命名的枚举
export enum NOTICETYPE {
  ALARM = 1,
  EVENT,
}
export enum MODELTYPE {
  ALL,
  ATTACK,
  NGAV,
  ATTACKPATH = '/10000/',
  NGAVPATH = '/20001/',
}
export enum ROUND {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
}
export enum HANDLETYPE {
  INIT,
  UNHANDLE,
  HANDLING,
  CONFIRM,
  IGNORE,
}

// export enum DRAWMSG {
//   srcpid = 'srcpid', //'进程id',
//   srcname = 'srcname', //'进程名',
//   srcmd5 = 'srcmd5', //'进程Md5',
//   path = 'path', //'进程路径',
//   sha256 = 'sha256', //'进程Sha256',
//   cmdline = 'cmdline', //'命令行',
//   isx86 = 'isx86', //'是否x86进程',
//   remoteip = 'remoteip', //'远端IP',
//   remoteport = 'remoteport', //'远端端口',
//   protocol = 'protocol', //'使用协议',
//   docname = 'docname', //'Doc名称',
//   computername = 'computername', //计算机名
//   username = 'username', //用户名
//   domainname = 'domainname', //域名
//   eventid = 'eventid', //事件ID
//   eventrecordid = 'eventrecordid', //日志记录ID
//   extra = 'extra', //'其他信息',
// }

export enum HANDLESTATUS {
  UNHANDLE,
  WHITE,
  BLACK,
  LANJIE,
  CLEAR,
  SHANGBAO,
  GUIDANG,
}

export enum BLACKWHITEOPTION {
  OK = 1,
  BLACK,
  WHITE,
  NO,
}
