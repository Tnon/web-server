/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 21:34:58
 * @LastEditTime: 2022-10-08 14:32:33
 */
import { useModal } from '@/hooks';
import { createVNode } from 'vue';
export const useEditing = (handleCancle, handleOk, t) => {
  useModal(
    {
      title: t('strategy.clqh'),
      okText: t('strategy.saveapp'),
      cancleText: t('strategy.bbc'),
      handleOk: async () => {
        handleOk();
      },
      handleCancle: () => {
        handleCancle();
      },
    },
    createVNode('span', null, t('strategy.leavtips')),
  );
};
