/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-24 14:27:58
 * @LastEditTime: 2022-12-25 14:36:09
 */
import handleRecord from './index.vue';
export interface T_HandleRecord {
  type: number; //1 人工处置结果  2处理状态变更 3处置策略变更
  dispose_result: number; //分别对应不同操作的详细操作 1,2,3,4... 按原型顺序
  dispose_at: string; //处理时间
  dispose_content: string; //处置内容
  dispose_num: number; //处理条数
  dispose_user: string; //处置人
  note: string; //批注
  fail_reason: string;
}
export default handleRecord;
