/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 22:43:49
 * @LastEditTime: 2022-12-26 18:30:10
 */
/**
 * @description: 报告生成的状态
 */
export enum REPORTTYPE {
  REPORTCREATING = 1,
  REPORTCREATED,
  REPORTABNORMAL,
}
// 报告类型
export enum REPORTKIND {
  DAILY = 1,
  WEEKLY,
  MONTHLY,
  YEARLY,
  FIXD,
}
export const ReportKindList: string[] = [
  'report.daily',
  'report.weekly',
  'report.monthly',
  'report.yearly',
  'report.fixedTime',
];
// taskStatus 任务状态
// 1 未开始 2 执行中 3 暂停中 4 生成中 5 已完成
export enum TaskStatus {
  notStart = 1,
  executing,
  suspending,
  generating,
  finished,
}
export const TaskStatusList: string[] = [
  'report.notStart,#f05064',
  'report.executing,#18BA79',
  'report.suspending,#f05064',
  'report.generating,#18BA79',
  'report.finished,#18BA79',
];
// 模板状态
export enum TemplateStatus {
  DeleteUpdate,
  Update,
  AllLimit,
}

// 报告生成状态
// 1 已生成 2 生成中 3 生成失败
export enum GenerateStatus {
  Generated = 1,
  Generating,
  GenerateFailed,
}
export const GenerateStatuList: string[] = [
  'report.generated',
  'report.generating',
  'report.generateFailed',
];
export const GenerateStatuSendList: string[] = ['report.wfs', 'report.fscg', 'report.fssb'];

export const enum ReportType {
  Email = 1,
  Word,
}
