/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:40:52
 * @LastEditTime: 2023-07-31 13:53:04
 */
import { OSTYPE, UPCLIPKGTYPE, UPSERPKGTYPE } from '@/enums/assetsType';
import request from '@/utils/http';
import { EngineFilter, ClientFilter, UnadapFilter, BatchAction } from './model';
enum Api {
  upgradeList = '/api/maintenance/upgrade/host_list',
  unadaplistApi = '/api/agent/driver/no_adapter_host_count',
  agentDriverNumberApi = '/api/maintenance/upgrade/status_statistic',
  agentdirverVerApi = '/api/maintenance/upgrade/version_statistic_list',
  upgradeAgtApi = '/api/maintenance/upgrade/agent_single_upgrade',
  upgradeDriApi = '/api/maintenance/upgrade/driver_single_upgrade',
  agtupNumber = '/api/maintenance/upgrade/agent_batch_upgrade_count',
  driupNumber = '/api/maintenance/upgrade/driver_batch_upgrade_count',
  agtupBatch = '/api/maintenance/upgrade/agent_batch_upgrade',
  driupBatch = '/api/maintenance/upgrade/driver_batch_upgrade',
  clientRecord = '/api/agent/package/list',
  engineRecord = '/api/enginelib/list',
  serengineRecord = '/api/serverengine/package/list',
  engineList = '/api/maintenance/engine/host_list',
  makeCmd = '/api/agent/make_install_cmd',
  agentVers = '/api/agent/all_version',
  Enginevers = '/api/feature/all_version',
  adaEnvVersion = '/api/maintenance/driver/version_list',
  unadapListApi = '/api/agent/driver/no_adapter_host_list',
  featureList = '/api/feature/package/list ',
  fraturelibInfo = '/api/feature/latest_version',
  ServerlibInfo = '/api/serverengine/latest_version',
  recallVer = '/api/feature/recall',
  recallSerVer = '/api/serverengine/recall',
  engineVerApi = '/api/maintenance/engine/version_dist',
  pkgVersions = '/api/agent/agent_latest_version',
  updateEngApi = '/api/maintenance/engine/batch_upgrade_count',
  recallAgentVersion = '/api/agent/recall',
  GetAndSetUpGtype = '/api/agent/upgrade_way',
  GetAndSetIpType = '/api/admin/config/chief_ip',
  getengverApi = '/api/maintenance/engine/status_statistics',
  vultyEngineRecord = '/api/asset/vul/package/list',
  vultyEngineInfo = '/api/asset/vul/latest_version',
  // ultyRecall = '/api/asset/vul/recall',
  pkgEngineVersions = '/api/enginelib/status_info',
  updpkgEngineVersions = '/api/enginelib/upgrade',
  getSerPkgInfoApi = '/server/update/info',
  serverRecord = '/server/update/list',
  serverMdApi = '/server/update/modules',
  upgradeSevApi = '/server/update',
  delServePkg = '/server/update/delete',
  getSerUpdingApi = '/server/update/status',
  mergeChunksApi = '/server/update/merge',
  saveClientIpApi = '/api/admin/config/set_to_server_ip',
  hostfApi = '/api/host_found/list',
}

// /**
//  * @description: 自研漏扫引擎版本撤回
//  */
// export function rebkVultyLibVer(params: { package_id: number; type: undefined; password: string }) {
//   return request(
//     {
//       url: Api.ultyRecall,
//       method: 'POST',
//       params,
//     },
//     {
//       successMessageText: 'verRecSucc',
//     },
//   );
// }
// /**
//  * @description: 获取自研漏扫引擎版本信息
//  */
// export function getVultyEngineInfo() {
//   return request({
//     url: Api.vultyEngineInfo,
//     method: 'GET',
//   });
// }
// /**
//  * @description: 获取自研漏扫引擎上传记录
//  */
// export function getVultyEngineRecord(params: tableParams<unknown>) {
//   return request({
//     url: Api.vultyEngineRecord,
//     method: 'POST',
//     params,
//   });
// }
/**
 * @description: 获取适配驱动库列表
 */
export function getTableList(params: tableParams<ClientFilter>) {
  return request({
    url: Api.upgradeList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获未适配数量
 */
export function getUnadapListApi() {
  return request({
    url: Api.unadaplistApi,
    method: 'GET',
  });
}
/**
 * @description: 获取适agent和驱动数量
 */
export function getAgentDriverVersion(params: { osver: OSTYPE }) {
  return request({
    url: Api.agentDriverNumberApi,
    method: 'GET',
    params,
  });
}
/**
 * @description: 获取agent/driver详情
 */
export function getagentordriverVersion(params: tableParams<{ osver: OSTYPE; ver_kind: number }>) {
  return request({
    url: Api.agentdirverVerApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 升级单台agent
 */
export function singleUpgradeAgent(params: { host_id: string; password: string }) {
  return request(
    {
      url: Api.upgradeAgtApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 升级server
 */
export function UpgradeServer(params: { password: string }) {
  return request({
    url: Api.upgradeSevApi,
    method: 'POST',
    params,
  });
}

/**
 * @description:适配单台diver
 */
export function singleUpgradeDriver(params: { host_id: string; password: string }) {
  return request(
    {
      url: Api.upgradeDriApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 批量升级agent数量
 */
export function getAgentUpNumber(params: ClientFilter) {
  return request({
    url: Api.agtupNumber,
    method: 'POST',
    params,
  });
}
/**
 * @description: 批量适配驱动数量
 */
export function getDriverUpNumber(params: ClientFilter) {
  return request({
    url: Api.driupNumber,
    method: 'POST',
    params,
  });
}

/**
 * @description: 批量升级agent
 */
export function batchUpgradeAgent(params: BatchAction<ClientFilter>) {
  return request(
    {
      url: Api.agtupBatch,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 批量适配驱动
 */
export function batchAdapDriver(params: BatchAction<ClientFilter>) {
  return request(
    {
      url: Api.driupBatch,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 获取agent上传记录
 */
export function getClientRevord(params: tableParams<unknown>) {
  return request({
    url: Api.clientRecord,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取引擎上传记录
 */
export function getEngineRevord(params: tableParams<unknown>) {
  return request({
    url: Api.engineRecord,
    method: 'POST',
    params,
  });
}
// /**
//  * @description: 获取服务端引擎库上传记录
//  */
// export function getSerEngineRevord(params: tableParams<unknown>) {
//   return request({
//     url: Api.serengineRecord,
//     method: 'POST',
//     params,
//   });
// }
/**
 * @description: 获取服务端上传记录
 */
export function getServerRevord(params: tableParams<unknown>) {
  return request({
    url: Api.serverRecord,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取引擎列表
 */
export function getEngineList(params: tableParams<EngineFilter>) {
  return request({
    url: Api.engineList,
    method: 'POST',
    params,
  });
}

/**
 * @description 生成安装命令
 */
export function makeInstallCmd<T>(params: T) {
  return request({
    url: Api.makeCmd,
    method: 'GET',
    params,
  });
}
/**
 * @description: 获取agent版本列表
 */
export function getallvers() {
  return request({
    url: Api.agentVers,
    method: 'GET',
  });
}
/**
 * @description: 获取引擎版本列表
 */
export function getallEnginevers(params: { type: UPCLIPKGTYPE }) {
  return request({
    url: Api.Enginevers,
    method: 'GET',
    params,
  });
}
/**
 * @description: 获取适配环境列表
 */
export function getadaEnvVersion() {
  return request({
    url: Api.adaEnvVersion,
    method: 'GET',
  });
}

/**
 * @description: 获取未适配列表
 */
export function getUnadapList(params: tableParams<UnadapFilter>) {
  return request({
    url: Api.unadapListApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取特征库上传记录
 */
export function getFeatureUpList(params: tableParams<unknown>) {
  return request({
    url: Api.featureList,
    method: 'POST',
    params,
  });
}

// /**
//  * @description 获取特征库信息
//  */
// export function getFeatureInfo(params: { type: UPCLIPKGTYPE }) {
//   return request({
//     url: Api.fraturelibInfo,
//     method: 'GET',
//     params,
//   });
// }
// /**
//  * @description 获取服务端引擎信息
//  */
// export function getServerEngineInfo(params: { type: UPSERPKGTYPE }) {
//   return request({
//     url: Api.ServerlibInfo,
//     method: 'GET',
//     params,
//   });
// }
/**
 * @description: 获取杀毒引擎列表
 */
export function getEnginTable() {
  return request({
    url: Api.engineList,
    method: 'POST',
  });
}
/**
 * @description: 客户端版本撤回
 */
export function rebkFeaLibVer(params: {
  package_id: number;
  type: UPCLIPKGTYPE;
  password: string;
}) {
  return request(
    {
      url: Api.recallVer,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'verRecSucc',
    },
  );
}
/**
 * @description: 服务端版本撤回
 */
export function rebkSerLibVer(params: {
  package_id: number;
  type: UPSERPKGTYPE;
  password: string;
}) {
  return request(
    {
      url: Api.recallSerVer,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'verRecSucc',
    },
  );
}
/**
 * @description: 获取引擎详情
 */
export function getEngineVersion(params: tableParams<{}>) {
  return request({
    url: Api.engineVerApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取agent包版本信息
 */
export function getPkgVer() {
  return request({
    url: Api.pkgVersions,
    method: 'GET',
  });
}

/**
 * @description: 批量更新引擎数量
 */
export function getBatUpdateEngineNum(params: EngineFilter) {
  return request({
    url: Api.updateEngApi,
    method: 'POST',
    params,
  });
}
/**
 * @description agent版本撤回
 */
export function recallAgent(params: { osver: OSTYPE | undefined }) {
  return request(
    {
      url: Api.recallAgentVersion,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'verRecSuc',
    },
  );
}
/**
 * @description 删除安装包
 */
export function deleteServer(params: { password: string }) {
  return request(
    {
      url: Api.delServePkg,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'pkgdleSucc',
    },
  );
}

/**
 * @description 获取升级方式
 */
export function getUpGradeType() {
  return request({
    url: Api.GetAndSetUpGtype,
    method: 'GET',
  });
}

/**
 * @description 获取升级方式
 */
export function setUpGradeType(params: { way: number }) {
  return request(
    {
      url: Api.GetAndSetUpGtype,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'setSuc',
    },
  );
}
/**
 * @description 获取引擎版本分布
 */
export function getEngineVersions(params: { type: UPCLIPKGTYPE }) {
  return request({
    url: Api.getengverApi,
    method: 'GET',
    params,
  });
}
/**
 * @description: 获取引擎包版本信息
 */
export function getEnginePkgVer() {
  return request({
    url: Api.pkgEngineVersions,
    method: 'GET',
  });
}
/**
 * @description: 更新引擎包版本信息
 */
export function updateEngine(params: { code: string }) {
  return request(
    {
      url: Api.updpkgEngineVersions,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'engups',
    },
  );
}
/**
 * @description 获取server包信息
 */
export function getServerPkgVer() {
  return request({
    url: Api.getSerPkgInfoApi,
    method: 'POST',
  });
}

/**
 * @description: 获取服务端模块列表
 */
export function getServerTableList(params: tableParams<{}>) {
  return request({
    url: Api.serverMdApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取服务是否正在升级
 */
export function getServerUpdateStatus() {
  return request({
    url: Api.getSerUpdingApi,
    method: 'POST',
  });
}
/**
 * @description 断点续传合并文件
 */
export function mergeChunks(params, url) {
  return request({
    url,
    method: 'GET',
    params,
  });
}

/**
 * @description 保存服务端IP
 */
export function saveClientIpApi(params, url) {
  return request(
    {
      url,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}
/**
 * @description 获取服务端IP
 */
export function getClientIpApi(url) {
  return request({
    url,
    method: 'GET',
  });
}

/**
 * @description: 主机发现列表
 */
export function getFindHostList(params: tableParams<{}>) {
  return request({
    url: Api.hostfApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取ip显示
 */
export function getIpTypeApi() {
  return request({
    url: Api.GetAndSetIpType,
    method: 'GET',
  });
}

/**
 * @description 保存ip显示
 */
export function setIpTypeApi(params: { way: number }) {
  return request(
    {
      url: Api.GetAndSetIpType,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'yycg',
    },
  );
}
