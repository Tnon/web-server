/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-08 17:32:06
 * @LastEditTime: 2022-07-13 18:07:31
 */
import { ADAPTYPE } from '@/enums/assetsType';
import exportList from './index.vue';
export const useAdapedType = (t) => [
  {
    key: ADAPTYPE.NOTINSTALL,
    value: t('operation.notinst'),
  },
  {
    key: ADAPTYPE.NOTADAPED,
    value: t('operation.unadaupd'),
  },
];
export default exportList;
