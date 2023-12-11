/*
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2022-07-19 20:54:06
 * @LastEditTime: 2022-12-29 19:31:41
 */
import request from '@/utils/http';
enum Api {
  delBak = '/api/admin/backup/',
  recoverDataBase = '/api/admin/backup/restore/',
  diskSpaceApi = '/api/admin/backup/envinfo',
  getDataBackup = '/api/admin/backup/list',
  backup_database = '/api/admin/backup',
  gsetLogStorageApi = '/api/admin/config/log',
  getMonitor = '/server/systeminfo',
  getDetectionTask = '/api/maintenance/server/detection_task_data',
}

/**
 * @description 删除备份
 * Api.delBak/{id}
 */
export function deleteBak(params: string) {
  return request(
    {
      url: Api.delBak,
      method: 'DELETE',
      params,
    },
    {
      successMessageText: 'delSuc',
    },
  );
}

/**
 * @description 恢复备份
 */
export function recoverDb(id: number) {
  return request({
    url: Api.recoverDataBase + id,
    method: 'POST',
  });
}
/**
 * @description 获取是否具有磁盘空间
 */
export function getDiskSpace() {
  return request({
    url: Api.diskSpaceApi,
    method: 'GET',
  });
}

/**
 * @description 获取数据备份列表
 */
export function getDataBackupApi(params: tableParams<unknown>) {
  return request({
    url: Api.getDataBackup,
    method: 'POST',
    params,
  });
}
/**
 * @description 立即备份
 */
export const backup_database = () => {
  return request({
    url: Api.backup_database,
    method: 'POST',
  });
};

/**
 * @description 获取日志存储限制
 */
export function getLogStorageApi() {
  return request({
    url: Api.gsetLogStorageApi,
    method: 'GET',
  });
}

/**
 * @description 更新日志存储限制
 */
export function updateLogStorageApi(params: { expire: number }) {
  return request(
    {
      url: Api.gsetLogStorageApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: 'saveSuc',
    },
  );
}

/**
 * @description 控制日志存储开关
 */
export function controlLogStorageApi(params: { expire: number }) {
  return request({
    url: Api.gsetLogStorageApi,
    method: 'POST',
    params,
  });
}
/**
 * @description 资源监控
 */
export function getMonitorApi() {
  return request({
    url: Api.getMonitor,
    method: 'GET',
  });
}

/**
 * @description: 获取webshell及静态杀毒检测数据
 */
export function getDetectionTaskApi() {
  return request({
    url: Api.getDetectionTask,
    method: 'POST',
  });
}
