/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 20:53:26
 * @LastEditTime: 2023-08-29 11:32:26
 */
import request from '@/utils/http';
import {
  BatchAction,
  EngineFilter,
  RaspFilter,
  RunAgentFilter,
  RunDriverFilter,
  CloudDetectionFilter,
} from './model';
enum Api {
  agentTableList = '/api/maintenance/activation/host_list',
  uniagentTableList = '/api/maintenance/activation/uninstalled_agent_list',
  rasptableList = '/api/maintenance/rasp/host_process_list',
  uniAgtNumApi = '/api/maintenance/activation/uninstallable_agent_count',
  clrAbnApi = '/api/maintenance/activation/clearable_exception_count',
  reinjectApi = '/api/maintenance/rasp/batch_injection_count',
  uninsRejApi = '/api/maintenance/rasp/batch_uninstall_count',
  getDriverList = '/api/maintenance/activation/host_list',
  resetAgent = '/api/operate/restartagent',
  stopOrStartDriver = '/api/maintenance/activation/driver_single_switch',
  collectLog = '/api/operate/applylog',
  collectLogProcess = '/api/operate/logstatus',
  batchUnintAgent = '/api/agent/batch_uninstall',
  batchUpengineApi = '/api/maintenance/engine/batch_upgrade',
  getppidApi = '/api/maintenance/rasp/ppids_list',
  injsingApi = '/api/maintenance/rasp/single_injection',
  uninssingApi = '/api/maintenance/rasp/single_uninstall',
  batchinjsingApi = '/api/maintenance/rasp/batch_injection',
  batchuninssingApi = '/api/maintenance/rasp/batch_uninstall',
  uninagentApi = '/api/maintenance/activation/batch_uninstall_agent',
  clearrecApi = '/api/maintenance/activation/batch_clear_exception',
  batchstartstopdiverApi = '/api/maintenance/activation/driver_batch_switch',
  serverEngVerApi = '/api/maintenance/enginelib/server/list',
  getRunStaticNumApi = '/api/maintenance/activation/failed_count',
  batStopStartNumApi = '/api/maintenance/activation/driver_batch_switch_count',
  engineSwtStApi = '/api/maintenance/enginelib/server/switch',
  getPointList = '/api/maintenance/activation/acdr_collection_point',
  restartMApi = '/server/service/restart',
  getSerRunList = '/server/monitor',
  getSerErrList = '/server/service/notice',
  getCloudDetectionApi = '/api/maintenance/agent/detection_task_data',
  batchRestAgent = '/api/agent/batch_restart',

  getClooeListApi = '/api/maintenance/activation/collection_point',
  setClooeListApi = '/api/maintenance/activation/collection_switch',
  getClooeListCountApi = '/api/maintenance/activation/collection_status',

  getErrIps = '/api/maintenance/driver/conflict_state',
  getCanCheckCountApi = 'api/maintenance/activation/collection_select_count',

  setCpuMApi = '/api/maintenance/activation/agent_usage_limit',
  getIpliApi = '',
  switip = '',
  chageIpBatch = '',
}

/**
 * @description 获取采集点表格数据
 */
export function getPointListApi(params: tableParams<RunDriverFilter>) {
  return request({
    url: Api.getPointList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取agent列表
 */
export function getAgentList(params: tableParams<RunAgentFilter>) {
  return request({
    url: Api.agentTableList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取已卸载客户端
 */
export function getUninstallList(params: tableParams<unknown>) {
  return request({
    url: Api.uniagentTableList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取rasp列表
 */
export function getRaspList(params: tableParams<RaspFilter>) {
  return request({
    url: Api.rasptableList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 批量卸载agent数量
 */
export function getUninstallNum(params: RunAgentFilter) {
  return request({
    url: Api.uniAgtNumApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 批量清除异常记录数量
 */
export function getClearNum(params: RunAgentFilter) {
  return request({
    url: Api.clrAbnApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 批量重新注入数量
 */
export function getReInjectNum(params: RaspFilter) {
  return request({
    url: Api.reinjectApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 批量卸载注入数量
 */
export function getUninRejNum(params: RaspFilter) {
  return request({
    url: Api.uninsRejApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取驱动管理表格数据
 */
export function getDriverListApi(params: tableParams<RunDriverFilter>) {
  return request({
    url: Api.getDriverList,
    method: 'POST',
    params,
  });
}
/**
 * @description 重启Agent
 */
export function resetAgentApi(params: { host_id: string; password: string }) {
  return request(
    {
      url: Api.resetAgent,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'agtCmdSuc',
    },
  );
}
/**
 * @description 启用和停用驱动
 */
export function driverSwitch(params: { status: number; host_id: string; password: string }) {
  return request({
    url: Api.stopOrStartDriver,
    method: 'POST',
    params,
  });
}

/**
 * @description 日志收集下载
 */
export function collectLogApi(params: { host_id: string; model: string }) {
  return request(
    {
      url: Api.collectLog,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'startCol',
    },
  );
}

/**
 * @description 日志收集进度
 */
export function collectLogProcessApi(params: { host_id: string }) {
  return request({
    url: Api.collectLogProcess,
    method: 'POST',
    params,
  });
}
/**
 * @description 批量卸载agent
 */
export function batchUninstallAgent(params: BatchAction<RunAgentFilter>) {
  return request(
    {
      url: Api.batchUnintAgent,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 批量重启agent
 */
export function batchResetAgent(params: BatchAction<RunAgentFilter>) {
  return request(
    {
      url: Api.batchRestAgent,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 批量清除异常记录
 */
export function batchClearAbnormal(params: BatchAction<RunAgentFilter>) {
  return request(
    {
      url: Api.clearrecApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 批量更改主机显示IP
 */
export function batchChangeShowIp(params: BatchAction<RunAgentFilter>) {
  return request(
    {
      url: Api.chageIpBatch,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description 批量升级引擎
 */
export function batchUpgradeEngine(params: BatchAction<EngineFilter>) {
  return request(
    {
      url: Api.batchUpengineApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 卸载时，获取有冲突的agent
 */
export function getErrAgentIps(params: BatchAction<RunAgentFilter>) {
  return request({
    url: Api.getErrIps,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取ppid详情
 */
export function getppids(params: { id: number }) {
  return request({
    url: Api.getppidApi,
    method: 'GET',
    params,
  });
}

/**
 * @description: 单台重新RASP注入
 */
export function singlgInjectRasp(params: { id: string; password: string }) {
  return request(
    {
      url: Api.injsingApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 单台卸载RASP注入
 */
export function singlgUninstallRasp(params: { id: string; password: string }) {
  return request(
    {
      url: Api.uninssingApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 批量注入rasp
 */
export function batchReInjectRasp(params: BatchAction<RaspFilter>) {
  return request(
    {
      url: Api.batchinjsingApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description 批量卸载RASP
 */
export function batchReUninstallRasp(params: BatchAction<RaspFilter>) {
  return request(
    {
      url: Api.batchuninssingApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 单台卸载Agent
 */
export function singlgUninstallAgent(params: { host_id: string; password: string }) {
  return request(
    {
      url: Api.uninagentApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 单台清除异常记录
 */
export function singlgClearRecAgent(params: { host_id: string; password: string }) {
  return request(
    {
      url: Api.clearrecApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 批量启用驱动
 */
export function batchStartDriver(params: BatchAction<RunDriverFilter>) {
  return request(
    {
      url: Api.batchstartstopdiverApi,
      method: 'POST',
      params: Object.assign({}, params, { status: 1 }),
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description 批量停用驱动
 */
export function batchStopDriver(params: BatchAction<RunDriverFilter>) {
  return request(
    {
      url: Api.batchstartstopdiverApi,
      method: 'POST',
      params: Object.assign({}, params, { status: 2 }),
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 获取引擎版本
 */
export function getserEngineVersions() {
  return request({
    url: Api.serverEngVerApi,
    method: 'GET',
  });
}
/**
 * @description: 获取agent/驱动/rasp数量
 */
export function getRunStaticNum() {
  return request({
    url: Api.getRunStaticNumApi,
    method: 'GET',
  });
}
/**
 * @description: 批量停止驱动数量
 */
export function getCanStopDriNum(params: RunDriverFilter) {
  return request({
    url: Api.batStopStartNumApi,
    method: 'POST',
    params: Object.assign({}, params, { status: 2 }),
  });
}
/**
 * @description: 批量启用驱动数量
 */
export function getCanStarDriNum(params: RunDriverFilter) {
  return request({
    url: Api.batStopStartNumApi,
    method: 'POST',
    params: Object.assign({}, params, { status: 1 }),
  });
}
/**
 * @description: 引擎启用和停用
 */
export function engineSwitchStatus(params: { id: number; enable: boolean }) {
  return request(
    {
      url: Api.engineSwtStApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 重启服务模块
 */
export function restartModule(params: { module: string }) {
  return request({
    url: Api.restartMApi,
    method: 'POST',
    params,
  });
}

/**
 * @description 获取服务模块运行状态列表
 */
export function getServerRunList(params: tableParams<{}>) {
  return request({
    url: Api.getSerRunList,
    method: 'POST',
    params,
  });
}

/**
 * @description 获取服务模块错误告警列表
 */
export function getServerErrList(params: tableParams<{}>) {
  return request({
    url: Api.getSerErrList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取云端检测任务列表
 */
export function getCloudDetectionApi(params: tableParams<CloudDetectionFilter>) {
  return request({
    url: Api.getCloudDetectionApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 采集点列表
 */
export function getCollectionList<T>(params: tableParams<T>) {
  return request({
    url: Api.getClooeListApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 采集点开关保存
 */
export function setCollection<T>(params: T) {
  return request(
    {
      url: Api.setClooeListApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 采集点数据统计
 */
export function getCollectionCount<T>(params: T) {
  return request({
    url: Api.getClooeListCountApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 采集点可选择数据
 */
export function getCanCheckCollCount<T>(params: T) {
  return request({
    url: Api.getCanCheckCountApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 采集点可选择数据
 */
export function setHostCpuMem<T>(params: T) {
  return request(
    {
      url: Api.setCpuMApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 获取IP列表
 */
export function getIplist<T>(params: T) {
  return request({
    url: Api.getIpliApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 切换IP
 */
export function switchIpShowApi<T>(params: T) {
  return request({
    url: Api.switip,
    method: 'POST',
    params,
  });
}
