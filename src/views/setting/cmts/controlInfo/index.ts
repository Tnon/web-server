/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-05-18 10:41:02
 */
import { useProductLogo } from '@/store/modules/product-logo';
import { computed } from 'vue';
import controlInfo from './index.vue';
interface contrType {
  title: string;
  value: string;
}
// type controlTypes = 'control' | 'time' | 'com' | 'telc'
type controlTypes = 'control' | 'telc';
export const useContrInfo = (t): Record<controlTypes, contrType> => {
  const produceStore = useProductLogo();
  //版本
  const product_version = computed(() => produceStore.productVersion);
  return {
    control: {
      title: t('setting.conMsg'),
      value: product_version.value,
    },
    // time: {
    //     title: '接入时间',
    //     value: '-'
    // },
    // com: {
    //     title: '授权客户',
    //     value: '-'
    // },
    telc: {
      title: t('setting.tecSerPro'),
      value: t('setting.anxinSec'),
    },
  };
};
export { controlInfo };
