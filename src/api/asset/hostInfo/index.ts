/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-08 11:20:35
 * @LastEditTime: 2023-07-19 11:01:34
 */
import request from '@/utils/http';
import * as api_process from './process';
import * as api_port from './port';
import * as api_service from './service';
import * as api_env from './env';
import * as api_kernel from './kernel';
import * as api_account from './account';
import * as api_share from './share';
import * as api_webservice from './webservice';
import * as api_webframe from './webframe';
import * as api_website from './website';
import * as api_webapp from './webapp';
import * as api_app from './app';
import * as api_package from './package';
import * as api_jar from './jar';
import * as api_python from './python';
import * as api_database from './database';
import * as api_npm from './npm';
import * as api_task from './task';
import * as api_xinetd from './xinetd';
import * as api_webjs from './webjs';
import * as api_webapi from './webapi';
export default {
  api_process,
  api_port,
  api_service,
  api_env,
  api_kernel,
  api_account,
  api_share,
  api_webservice,
  api_webframe,
  api_website,
  api_webapp,
  api_app,
  api_package,
  api_jar,
  api_python,
  api_database,
  api_npm,
  api_task,
  api_xinetd,
  api_webjs,
  api_webapi,
};
enum Api {
  EXPORTCOMAPI = '/api/expport/',
}
/**
 * @description: "进程/端口/环境变量/内核/服务/账号 统一导出"
 */
export function exportExcel(params: { filter: { name: string } }, type: string) {
  return request({
    url: Api.EXPORTCOMAPI + type,
    method: 'POST',
    params,
  });
}
