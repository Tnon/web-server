/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2023-07-24 16:01:39
 */
import request from '@/utils/http';
enum Api {
  staticApi = '/api/policy/fm/statistics',
  staticApiDf = '/api/policy/df/statistics',
  getMacListApi = '/api/asset/host/search',
  baselineStaticApi = '/api/baseline/overview',
  baslineReApi = '/api/baseline/session',
  taskDeApi = '/api/baseline/session/statistic',
  taskCheckApi = '/api/baseline/check/view',
  taskDecApi = '/api/baseline/type/list',
  ruleCheckApi = '/api/baseline/rule/list/detail',
  ruleCheckPartApi = '/api/baseline/rule/list/detail/history',
  checkDrawApi = '/api/baseline/check/statistic',
  checkDrawApiTab = '/api/baseline/check/detail',
  ipDrawApiTab = '/api/baseline/host/detail',
  framakApi = '/api/baseline/check',
  taskCheckApiIp = '/api/baseline/host/view',
  checkDrawApiIp = '/api/baseline/host/statistic',
  rulesAllApi = '/api/baseline/rule/list',
  taskAllApi = '/api/baseline/task/list',
  taskFormDetail = '/api/baseline/task',
  rulsAllApi = '/api/baseline/rule/match/list',
  newTaskApi = '/api/baseline/task/create',
  eidtTaskApi = '/api/baseline/task/update',
  batchHandleTaskApi = '/api/baseline/task/batch/switch',
  batchDeleteTaskApi = '/api/baseline/task/batch/delete',
  canParRunNumber = '/api/baseline/task/batch/switch/count',

  blRuleApi = '/api/policy/fm/list',
  blRuleApiDf = '/api/policy/df/list',
  getRuleDetailApi = '/api/policy/fm/detail',
  getRuleDetailApiDf = '/api/policy/df/detail',
  addBlRuleApi = '/api/policy/fm/create',
  addBlRuleApiDf = '/api/policy/df/create',
  editBlRuleApi = '/api/policy/fm/modify',
  editBlRuleApiDf = '/api/policy/df/modify',
  switchRuleApi = '/api/policy/fm/switch',
  switchRuleApiDf = '/api/policy/df/switch',
  delBlRuleApi = '/api/policy/fm/delete',
  delBlRuleApiDf = '/api/policy/df/delete',
  blAlarmApi = '/api/file_tamper/alarm_list',
  drawDetailApi = '/api/file_tamper/alarm_detail',
  blhisApi = '/api/file_tamper/alarm_history_list',
  batchHanApi = '/api/file_tamper/set_handle_status',
  hostTaoApi = '/api/policy/fm/monitorhostlist',
  ruleHostApi = '/api/policy/fm/hostlist',
  ruleHostApiDf = '/api/policy/df/hostlist',
  ruleHostDApi = '/api/policy/fm/monitorlist',
  ruleHostDApiDf = '/api/policy/df/monitorlist',
  switchCountApi = '/api/policy/fm/switchcount',
  switchCountApiDf = '/api/policy/df/switchcount',
  delCountApi = '/api/policy/fm/deletecount',
  delCountApiDf = '/api/policy/df/deletecount',

  secPatcheReApi = '/api/asset/patch/assetview',
  scanPatcheAllApi = '/api/asset/patch/scan',
  scanPatcheSApi = '/api/asset/patch/curscan',
  riskOpApio = '/api/asset/vul/typelist',
  patchDeailApi = '/api/asset/patch/detail/assetview',
  patchDApi = '/api/asset/patch/detailinfo',
  patchHostApi = '/api/asset/patch/hostview',
  patchHostDApi = '/api/asset/patch/detail/hostview',

  vstaticApi = '/api/asset/virpatch/statistics',
  virpatchDApi = '/api/asset/virpatch/list',
  virpatchDeApi = '/api/asset/virpatch/entitylist',
  switchMd = '/api/asset/virpatch/switch',
  virpatchRiskApi = '/api/virpatch/alarm_list',
  pcdrawDetailApi = '/api/virpatch/alarm_detail',
  blrhisApi = '/api/virpatch/alarm_history_list',
  batchHanApiPatch = '/api/virpatch/set_handle_status',
  casCout = '/api/asset/virpatch/switchcount',
}

/**
 * @description: 获取规则统计
 */
export function getRuleStatic() {
  return request({
    url: Api.staticApi,
    method: 'GET',
  });
}
/**
 * @description: 获取规则统计 ye
 */
export function getRuleStaticDf() {
  return request({
    url: Api.staticApiDf,
    method: 'GET',
  });
}
/**
 * @description: 根据输入搜索匹配到的maclist
 */
export function getSearchMacList(params) {
  return request({
    url: Api.getMacListApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取基线统计
 */
export function getBaselineStatic() {
  return request({
    url: Api.baselineStaticApi,
    method: 'POST',
  });
}
/**
 * @description: 基线检查记录表格
 */
export function getBaselineOverview<T>(params: tableParams<T>) {
  return request({
    url: Api.baslineReApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取任务详情
 */
export function getTaskDetail(params: { session_id: number }) {
  return request({
    url: Api.taskDeApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 基线任务 检查项视图
 */
export function getTaskCheck<T>(params: tableParams<T>) {
  return request({
    url: Api.taskCheckApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取检查项类型下拉框
 */
export function getCheckTypeOptions(params: { rule: string }) {
  return request({
    url: Api.taskDecApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则的检查项列表(全部)
 */
export function getRuleChecks<T>(params: tableParams<T>) {
  return request({
    url: Api.ruleCheckApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则的检查项列表
 */
export function getRulePartChecks<T>(params: tableParams<T>) {
  return request({
    url: Api.ruleCheckPartApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取检查项所有应用的主机
 */
export function getCheckDraw<T>(params: T) {
  return request({
    url: Api.checkDrawApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则的检查项表格
 */
export function getRucheckList<T>(params: tableParams<T>) {
  return request({
    url: Api.checkDrawApiTab,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则的主机表格
 */
export function getRuipList<T>(params: tableParams<T>) {
  return request({
    url: Api.ipDrawApiTab,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取模版数据
 */
export function getFmDataApi<T>(params: T) {
  return request({
    url: Api.framakApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 基线任务 主机视图
 */
export function getCheckIpview<T>(params: tableParams<T>) {
  return request({
    url: Api.taskCheckApiIp,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取主机所有检查项
 */
export function getIpDetailV<T>(params: T) {
  return request({
    url: Api.checkDrawApiIp,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取所有的规则
 */
export function getRulesList<T>(params: tableParams<T>) {
  return request({
    url: Api.rulesAllApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取任务列表
 */
export function getTaskList<T>(params: tableParams<T>) {
  return request({
    url: Api.taskAllApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取任务表单
 */
export function getTaskFormDetail<T>(params: T) {
  return request({
    url: Api.taskFormDetail,
    method: 'GET',
    params,
  });
}
/**
 * @description: 获取基线规则下拉框
 */
export function getRules<T>(params: T) {
  return request({
    url: Api.rulsAllApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 新建任务
 */
export function addNewTask<T>(params: T) {
  return request(
    {
      url: Api.newTaskApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'createTaskSuc',
    },
  );
}

/**
 * @description: 编辑任务
 */
export function editNewTask<T>(params: T) {
  return request(
    {
      url: Api.eidtTaskApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'editTaskSuc',
    },
  );
}

/**
 * @description: 批量处理执行/暂停
 */
export function batchHandleTask<T>(params: T) {
  return request(
    {
      url: Api.batchHandleTaskApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 批量处理
 */
export function batchDeleteTask<T>(params: T) {
  return request(
    {
      url: Api.batchDeleteTaskApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 获取文件防篡改规则列表
 */
export function getBlRuleList<T>(params: tableParams<T>) {
  return request({
    url: Api.blRuleApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取文件防篡改规则列表
 */
export function getBlRuleListDf<T>(params: tableParams<T>) {
  return request({
    url: Api.blRuleApiDf,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取文件防篡改规则详情
 */
export function getBlRuleDetail<T>(params: T) {
  return request({
    url: Api.getRuleDetailApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取文件防篡改规则详情
 */
export function getBlRuleDetailDf<T>(params: T) {
  return request({
    url: Api.getRuleDetailApiDf,
    method: 'POST',
    params,
  });
}
/**

/**
 * @description: 新增规则
 */
export function addBlRule<T>(params: T) {
  return request(
    {
      url: Api.addBlRuleApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'gzxzcs',
    },
  );
}
/**
 * @description: 新增规则
 */
export function addBlRuleDf<T>(params: T) {
  return request(
    {
      url: Api.addBlRuleApiDf,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'gzxzcs',
    },
  );
}
/**
 * @description: 修改规则
 */
export function editBlRule<T>(params: T) {
  return request(
    {
      url: Api.editBlRuleApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'gzxzcsb',
    },
  );
}
/**
 * @description: 修改规则
 */
export function editBlRuleDf<T>(params: T) {
  return request(
    {
      url: Api.editBlRuleApiDf,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'gzxzcsb',
    },
  );
}
/**
 * @description: 规则启停
 */
export function switchRule<T>(params: T) {
  return request(
    {
      url: Api.switchRuleApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 规则删除
 */
export function delBlRule<T>(params: T) {
  return request(
    {
      url: Api.delBlRuleApi,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 规则启停
 */
export function switchRuleDf<T>(params: T) {
  return request(
    {
      url: Api.switchRuleApiDf,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 规则删除
 */
export function delBlRuleDf<T>(params: T) {
  return request(
    {
      url: Api.delBlRuleApiDf,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 获取文件保护告警列表
 */
export function getBlAlarmList<T>(params: tableParams<T>) {
  return request({
    url: Api.blAlarmApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取文件保护告警抽屉
 */
export function getAlarmDrawDetail<T>(params: tableParams<T>) {
  return request({
    url: Api.drawDetailApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取文件保护告警屉时间轴
 */
export function getBlHisDraw<T>(params: tableParams<T>) {
  return request({
    url: Api.blhisApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 告警批量处理
 */
export function batchHandleFile<T>(params: T) {
  return request(
    {
      url: Api.batchHanApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 批量停/启用数量
 */
export function getCanParseRunCount<T>(params: T) {
  return request({
    url: Api.canParRunNumber,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取规则监控主机视图
 */
export function getBlRuleHostList<T>(params: tableParams<T>) {
  return request({
    url: Api.ruleHostApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则监控主机视图
 */
export function getBlRuleHostListDf<T>(params: tableParams<T>) {
  return request({
    url: Api.ruleHostApiDf,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则主机详情
 */
export function getRuleHostDetail<T>(params: tableParams<T>) {
  return request({
    url: Api.ruleHostDApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则主机详情 诱饵
 */
export function getRuleHostDetailDf<T>(params: tableParams<T>) {
  return request({
    url: Api.ruleHostDApiDf,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取能选择的数量
 */
export function getSwitchCount<T>(params: T) {
  return request({
    url: Api.switchCountApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取能选择的数量
 */
export function getSwitchCountDf<T>(params: T) {
  return request({
    url: Api.switchCountApiDf,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取能删除的数量
 */
export function getDelCount<T>(params: T) {
  return request({
    url: Api.delCountApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取能删除的数量
 */
export function getDelCountDf<T>(params: T) {
  return request({
    url: Api.delCountApiDf,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取规则下所有的主机
 */
export function getTableList<T>(params: tableParams<T>) {
  return request({
    url: Api.hostTaoApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 安全补丁 补丁视图
 */
export function getSecpatchOverview<T>(params: tableParams<T>) {
  return request({
    url: Api.secPatcheReApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 安全补丁 一键扫描
 */
export function scanPatchAll() {
  return request({
    url: Api.scanPatcheAllApi,
    method: 'POST',
  });
}
/**
 * @description: 安全补丁 轮训
 */
export function getScaStaApi() {
  return request({
    url: Api.scanPatcheSApi,
    method: 'GET',
  });
}

/**
 * @description: 安全补丁 风险类型
 */
export function getRiskOptionsApi() {
  return request({
    url: Api.riskOpApio,
    method: 'GET',
  });
}

/**
 * @description: 安全补丁 补丁视图详情
 */
export function getPatchDetial<T>(params: tableParams<T>) {
  return request({
    url: Api.patchDeailApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 安全补丁 补丁抽屉
 */
export function getSecDrawDetail<T>(params: T) {
  return request({
    url: Api.patchDApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 安全补丁 补丁主机视图
 */
export function getPatchHostview<T>(params: tableParams<T>) {
  return request({
    url: Api.patchHostApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 安全补丁 补丁主机视图详情
 */
export function getPatchHostDetail<T>(params: tableParams<T>) {
  return request({
    url: Api.patchHostDApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取虚拟补丁统计
 */
export function getVirPatchStatic() {
  return request({
    url: Api.vstaticApi,
    method: 'GET',
  });
}

/**
 * @description: 虚拟补丁 列表
 */
export function getpatchList<T>(params: tableParams<T>) {
  return request({
    url: Api.virpatchDApi,
    method: 'POST',
    params,
  });
}

/**
 * @description: 虚拟补丁 编辑列表
 */
export function getPatEditlist<T>(params: tableParams<T>) {
  return request({
    url: Api.virpatchDeApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 文件状态模式切换
 */
export function switchFileMdode(params) {
  return request(
    {
      url: Api.switchMd,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}
/**
 * @description: 虚拟补丁风险列表
 */
export function getVirPatchList<T>(params: tableParams<T>) {
  return request({
    url: Api.virpatchRiskApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取虚拟补丁告警抽屉
 */
export function getVirPatchAlarmDrawDetail<T>(params: tableParams<T>) {
  return request({
    url: Api.pcdrawDetailApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取虚拟补丁告警屉时间轴
 */
export function getVPHisDraw<T>(params: tableParams<T>) {
  return request({
    url: Api.blrhisApi,
    method: 'POST',
    params,
  });
}
/**
 * @description: 补丁告警批量处理
 */
export function batchHandlePatch<T>(params: T) {
  return request(
    {
      url: Api.batchHanApiPatch,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'opraSuc',
    },
  );
}

/**
 * @description: 获取数量
 */
export function getCSCount<T>(params: T) {
  return request({
    url: Api.casCout,
    method: 'POST',
    params,
  });
}
