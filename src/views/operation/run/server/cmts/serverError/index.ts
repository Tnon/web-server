/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-04 11:07:37
 * @LastEditTime: 2022-11-18 18:55:30
 */
import serverError from './index.vue';
import { TableColumn } from '@/types/tableColumn';
export const enum ERRORTYPE {
  CPU = 1,
  MEM,
  SER,
  ABN,
}
const getTypeName = (type, t) => {
  let text = '';
  if (type === ERRORTYPE.CPU) {
    text = t('operation.cpuerr');
  } else if (type === ERRORTYPE.MEM) {
    text = t('operation.memerr');
  } else if (type === ERRORTYPE.SER) {
    text = t('operation.sererr');
  } else if (type === ERRORTYPE.ABN) {
    text = t('operation.abnerr');
  }
  return text;
};
export const useColumns = (t): TableColumn[] => [
  {
    title: t('operation.errtype'),
    dataIndex: 'notice_type',
    customRender: ({ text }) => getTypeName(text, t),
    // 1 cpu资源异常 2 内存资源异常 3 服务探针异常 4 异常重启
  },
  {
    title: t('operation.errtserv'),
    dataIndex: 'module',
  },
  {
    title: t('operation.errdesf'),
    dataIndex: 'desc',
  },
  {
    title: t('operation.gjsj'),
    dataIndex: 'notice_at',
  },
];

export default serverError;
