/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-14 10:00:43
 * @LastEditTime: 2022-12-29 10:25:27
 */
import { REPORTKIND, TaskStatus, GenerateStatus } from '@/enums/reportType';
export interface FormState {
  emails: string[];
  id?: string;
  month: string[];
  name: string;
  round: 'month' | 'week';
  select: number;
  week: string[];
}

export interface TaskFilter {
  type: REPORTKIND | undefined;
  start_time: number | undefined;
  end_time: number | undefined;
  status: TaskStatus | undefined;
  report_template_id: number | undefined;
  title: string;
}
export interface TaskFormState {
  id?: number;
  title: string;
  desc_info: string;
  report_template_id: number | undefined;
  all_group: number;
  entity_group_list: string;
  type: REPORTKIND | undefined;
  // timeRange: string[] | undefined;
  start_time: number | undefined;
  end_time: number | undefined;
  send_email: boolean;
  accept_email: string;
  send_time: string;
}

export interface TaskReportFilter {
  task_id: number;
  start_time: number | undefined; // 秒级时间戳
  end_time: number | undefined; // 秒级时间戳
  status: GenerateStatus | undefined;
}
