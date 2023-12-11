/*
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2022-12-30 18:20:14
 */
import request from '@/utils/http';
import { FormState, TaskFilter, TaskFormState, TaskReportFilter } from './model';
enum Api {
  getReportList = '/api/admin/replist',
  getSubList = '/api/admin/sublist',
  addReport = '/api/admin/repstore',
  reportList = '/api/admin/selrep',
  addSubForm = '/api/admin/substore',
  delReportSubList = '/api/admin/subdel',
  delReportManaList = '/api/admin/repdel',
  getReportDataList = '/api/report/list',

  getTaskList = 'api/report/word/report_task/list', // 任务列表
  createTask = '/api/report/word/report_task/add', // 创建任务接口
  changeTask = '/api/report/word/report_task/modify', // 单个 修改任务状态
  deleteReportTask = '/api/report/word/report_task/delete/', // 单个 删除报告任务
  batchChangeTask = '/api/report/word/report_task/batch/modify', // 批量 修改任务状态
  batchDeleteReportTask = '/api/report/word/report_task/batch/delete', // 批量 删除报告任务
  canBatchExecuteTaskNum = '/api/report/word/report_task/paused_count', // 获取能批量执行的数量接口
  canBatchStopExeTaskNum = '/api/report/word/report_task/executing_count', // 获取能批量停止执行的数量接口
  createTemplate = 'api/report/word/report_template/add', // 创建模板
  updateTemplate = '/api/report/word/report_template/update', // 修改模板
  getTemplateList = '/api/report/word/report_template/list', // 获取报告模板
  getWordReportList = 'api/report/word/report_item/list', // 获取报告列表
  deleteTemplate = '/api/report/word/report_template/delete/', // 删除模板
  deleteWordReport = '/api/report/word/report_item/delete/', // 删除报告
  editTemplate = '/api/report/word/report_task/save',
  getRecordApi = '/api/report/word/report_task',
}

/**
 * @description: 获取可批量停止执行的任务数量
 */
export function getBatchStopExeTaskNum(params) {
  return request({
    url: Api.canBatchStopExeTaskNum,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取可批量执行的任务数量
 */
export function getBatchExecuteTaskNum(params) {
  return request({
    url: Api.canBatchExecuteTaskNum,
    method: 'POST',
    params,
  });
}

/**
 * @description: 批量 删除报告任务
 */
export function batchDeleteReportTask(params) {
  return request(
    {
      url: Api.batchDeleteReportTask,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'deleteTaskSuc',
    },
  );
}

/**
 * @description: 批量 修改任务状态
 */
export function batchChangeTaskStatus(params) {
  return request(
    {
      url: Api.batchChangeTask,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'changeTaskStatusSuc',
    },
  );
}

/**
 * @description: 修改报告任务
 */
export function deleteReportTask(params: string) {
  return request(
    {
      url: Api.deleteReportTask,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'deleteTaskSuc',
    },
  );
}
/**
 * @description: 删除报告
 */
export function deleteWordReport(params) {
  return request(
    {
      url: Api.deleteWordReport,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'deleteReportSuc',
    },
  );
}
/**
 * @description: 单个 修改任务状态
 */
export function changeTaskStatus(params) {
  return request(
    {
      url: Api.changeTask,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'changeTaskStatusSuc',
    },
  );
}
/**
 * @description: 删除模板
 */
export function deleteTemplateApi(params) {
  return request(
    {
      url: Api.deleteTemplate,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'deleteTemplateSuc',
    },
  );
}
/**
 * @description: 获取报告列表
 */
export function getWordReportList(params: tableParams<TaskReportFilter>) {
  return request({
    url: Api.getWordReportList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 获取报告模板
 */
export function getTemplateListApi(params: { filter: { title: string } }) {
  return request({
    url: Api.getTemplateList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 修改模板
 */
export function updateTemplateRequest(params) {
  return request(
    {
      url: Api.updateTemplate,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'updateTemplateSuc',
    },
  );
}
/**
 * @description: 创建模板
 */
export function createTemplateRequest(params) {
  return request(
    {
      url: Api.createTemplate,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'createTemplateSuc',
    },
  );
}

/**
 * @description:  创建任务
 */
export function createTaskRequest(params: TaskFormState) {
  return request(
    {
      url: Api.createTask,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'createTaskSuc',
    },
  );
}
/**
 * @description: 修改任务
 */
export function editTaskRequest(params: TaskFormState) {
  return request(
    {
      url: Api.editTemplate,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'editTaskSuc',
    },
  );
}
/**
 * @description: 根据id查询
 */
export function getReportTaskRecord(id: number) {
  return request({
    url: Api.getRecordApi + '/' + id,
    method: 'GET',
  });
}

/**
 * @description: 获取任务列表
 */
export function getTaskList(params: tableParams<TaskFilter>) {
  return request({
    url: Api.getTaskList,
    method: 'POST',
    params,
  });
}
/**
 * @description 获取报表列表数据
 */

export function getReportDataListApi(params: tableParams<undefined>) {
  return request({
    url: Api.getReportDataList,
    method: 'POST',
    params,
  });
}

/**
 * @description 获取报表管理列表
 */
export function getReportListApi(params: { search_data: string }) {
  return request({
    url: Api.getReportList,
    method: 'POST',
    params,
  });
}
/**
 * @description 新增报表
 */
export function addReportListApi(params: { repname: string; id?: number; [key: string]: any }) {
  return request(
    {
      url: Api.addReport,
      method: 'POST',
      params,
    },
    {
      successMessageText: params.id ? 'repModSuc' : 'repAddSuc',
    },
  );
}
/**
 * @description 批量/单 删除报表订阅
 */
export function delSubReport(params: { subidarr: number[] }) {
  return request(
    {
      url: Api.delReportSubList,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
/**
 * @description 批量/单 删除报表管理
 */
export function delManaReport(params: { repidarr: number[] }) {
  return request(
    {
      url: Api.delReportManaList,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}
/**
 * @description 获取报表下拉
 */
export function getReportOptions() {
  return request({
    url: Api.reportList,
    method: 'GET',
  });
}
/**
 * @description 获取报表订阅列表
 */
export function getSubListApi(params: { search_data: string }) {
  return request({
    url: Api.getSubList,
    method: 'POST',
    params,
  });
}
/**
 * @description 添加报表订阅
 */
export function addFormSub(params: FormState) {
  return request(
    {
      url: Api.addSubForm,
      method: 'POST',
      params,
    },
    {
      successMessageText: params.id ? 'repSucModSuc' : 'repSucAddSuc',
    },
  );
}
