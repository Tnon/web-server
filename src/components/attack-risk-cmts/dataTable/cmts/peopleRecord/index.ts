/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 09:55:10
 * @LastEditTime: 2022-12-23 17:38:17
 */
import { E_PeopleHandleResult } from '../peopleResult';
import peopleRecord from './index.vue';

export const getPeopleHandleResult = (t) => {
  return [
    {
      label: t('arcomn.jcljz'),
      value: E_PeopleHandleResult.Injecting,
    },
    {
      label: t('arcomn.jcylj'),
      value: E_PeopleHandleResult.Injected,
    },
    {
      label: t('arcomn.jcljsb'),
      value: E_PeopleHandleResult.InjectError,
    },
    {
      label: t('arcomn.jcparer'),
      value: E_PeopleHandleResult.InjectPartError,
    },
    {
      label: t('arcomn.jcljcs'),
      value: E_PeopleHandleResult.InjectTimeOut,
    },
  ];
};
export default peopleRecord;
