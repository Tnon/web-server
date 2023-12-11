/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:53:53
 * @LastEditTime: 2023-08-10 18:54:42
 */
import request from '@/utils/http';
enum Api {
  gsetAlarmEmailApi = '/api/admin/user/alarm/email',
  gsetAlarmPhoneApi = '/api/admin/user/alarm/phone',
  loginlockApi = '/api/admin/user/alarm/loginlock',
  riskdiscoveryApi = '/api/admin/user/alarm/event ',
  attackdiscoveryApi = '/api/admin/user/alarm/alarm',
  filepApi = '/api/admin/user/alarm/file',
  domctlApi = '/api/admin/user/alarm/domctl',
  gSetEmailConfig = '/api/admin/email/smtp',
  getEmailTest = '/api/admin/email/smtp/test',
  testEmailapi = '/api/admin/email/test',

  gSetEmailConfigApi = '/api/admin/notification/senderstatus',
  gSetSmsConfigApi = '/api/admin/notification/sms/huawei',
  testSmsConfigApi = '/api/admin/notification/sms/huawei/test',
  acclistApi = '/api/admin/notification/receiver/list',
  updatalistApi = '/api/admin/notification/receiver/update',
  delUser = '/api/admin/notification/receiver/delete',
  addlistApi = '/api/admin/notification/receiver/create',
  getCfgApi = '/api/admin/notification/config',
  setActEnaApi = '/api/admin/notification/receiver/switch',
  alarmSwitch = '/api/admin/notification/switch',
  schApi = '/api/host_found/add_task',
  schStatusApi = '/api/host_found/last_status',
}
// /**
//  * @description 获取安全告警 Email
//  */
export function getAlarmEmail() {
  return request({
    url: Api.gsetAlarmEmailApi,
    method: 'GET',
  });
}
// /**
//  * @description 获取安全告警 Phone
//  */
// export function getAlarmPhone() {
//   return request({
//     url: Api.gsetAlarmPhoneApi,
//     method: 'GET',
//   });
// }
/**
 * @description 设置安全告警 Email
 */
export function setAlarmEmail(params: { freq: number }) {
  return request(
    {
      url: Api.gsetAlarmEmailApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}
// /**
//  * @description 设置安全告警手机短信
//  */
// export function setAlarmPhone(params: { freq: number; accept: string[] }) {
//   return request(
//     {
//       url: Api.gsetAlarmPhoneApi,
//       method: 'POST',
//       params,
//     },
//     {
//       successMessageText: 'saveSuc',
//     },
//   );
// }
/**
 * @description switch 开关选择 锁定账户
 */
export function setLoginlock(params) {
  return request(
    {
      url: Api.loginlockApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'setSuc',
    },
  );
}
/**
 * @description switch 开关选择 风险
 */
export function setRiskdiscovery(params) {
  return request(
    {
      url: Api.riskdiscoveryApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'setSuc',
    },
  );
}
/**
 * @description switch 开关选择 攻击
 */
export function setAttackdiscovery(params) {
  return request(
    {
      url: Api.attackdiscoveryApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'setSuc',
    },
  );
}
/**
 * @description switch 开关选择 文件保护
 */
export function setFileProtection(params) {
  return request(
    {
      url: Api.filepApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'setSuc',
    },
  );
}

/**
 * @description switch 开关选择 域控
 */
export function setDomctl(params) {
  return request(
    {
      url: Api.domctlApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'setSuc',
    },
  );
}
/**
 * @description switch 开关选择 锁定账户
 */
export function getLoginlock() {
  return request({
    url: Api.loginlockApi,
    method: 'GET',
  });
}
/**
 * @description switch 开关选择 风险
 */
export function getRiskdiscovery() {
  return request({
    url: Api.riskdiscoveryApi,
    method: 'GET',
  });
}
/**
 * @description switch 开关选择 攻击
 */
export function getAttackdiscovery() {
  return request({
    url: Api.attackdiscoveryApi,
    method: 'GET',
  });
}
/**
 * @description switch 开关选择 文件保护
 */
export function getFileProtection() {
  return request({
    url: Api.filepApi,
    method: 'GET',
  });
}

/**
 * @description switch 开关选择 域控
 */
export function getDomctl() {
  return request({
    url: Api.domctlApi,
    method: 'GET',
  });
}
/**
 * @description 获取邮件设置
 */
export function getEmailConfigApi() {
  return request({
    url: Api.gSetEmailConfig,
    method: 'GET',
  });
}
/**
 * @description 修改邮箱设置
 */
export function updateEmailConfigApi(params) {
  return request(
    {
      url: Api.gSetEmailConfig,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}

/**
 * @description 邮箱验证
 */
export function getEmailTestApi(params) {
  return request({
    url: Api.getEmailTest,
    method: 'POST',
    params,
  });
}
/**
 * @description 邮箱测试
 */
export function testEmailApi(params: { email: string }) {
  return request({
    url: Api.testEmailapi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取邮件和短信设置
 */
export function getEmSmsRes() {
  return request({
    url: Api.gSetEmailConfigApi,
    method: 'GET',
  });
}
/**
 * @description 获取短信设置
 */
export function getHuaWeiSmsApi() {
  return request({
    url: Api.gSetSmsConfigApi,
    method: 'GET',
  });
}

/**
 * @description 设置短信设置
 */
export function setSmsConfig<T>(params: T) {
  return request(
    {
      url: Api.gSetSmsConfigApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}

/**
 * @description 测试短信设置
 */
export function testSmsConfig<T>(params: T) {
  return request(
    {
      url: Api.testSmsConfigApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'yjsfsa',
    },
  );
}

/**
 * @description: 获取接收人
 */
export function getAcceptList<T>(params: tableParams<T>) {
  return request({
    url: Api.acclistApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 编辑接收人
 */
export function updataAcceptUser<T>(params: T) {
  return request(
    {
      url: Api.updatalistApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'modSuc',
    },
  );
}
/**
 * @description: 新增接收人
 */
export function addAcceptUser<T>(params: T) {
  return request(
    {
      url: Api.addlistApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'addSuc',
    },
  );
}

/**
 * @description: 删除接收人
 */
export function delAcceptUser<T>(params: T) {
  return request(
    {
      url: Api.delUser,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
/**
 * @description: 获取类型配置
 */
export function getNotiCfg<T>(params: T) {
  return request({
    url: Api.getCfgApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 设置启用停用
 */
export function setAcceptEnable<T>(params: T, enabled: boolean) {
  return request(
    {
      url: Api.setActEnaApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: enabled ? 'enaSuc' : 'delSucs',
    },
  );
}

/**
 * @description: 告警类型总开关
 */
export function alarmSwitch<T>(params: T, boolean) {
  return request(
    {
      url: Api.alarmSwitch,
      method: 'POST',
      params,
    },
    {
      successMessageText: boolean ? 'enaSuc' : 'delSucs',
    },
  );
}

/**
 * @description: 开始扫描
 */
export function scanHostApi<T>(params: T) {
  return request({
    url: Api.schApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取扫描状态
 */
export function getScanStatusApi() {
  return request({
    url: Api.schStatusApi,
    method: 'GET',
  });
}
