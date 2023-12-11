/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-07 15:25:39
 * @LastEditTime: 2022-12-23 17:38:21
 */
import peopleResult from './index.vue';
export const enum E_PeopleHandleResult {
  Injecting = 1,
  Injected,
  InjectError,
  InjectPartError,
  InjectTimeOut,
}
export default peopleResult;
