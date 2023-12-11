/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 20:25:23
 * @LastEditTime: 2022-09-26 20:49:16
 */
import runStatus from './index.vue';
import { NodeStatus } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
export const useJudgeStatus = (nodeStatus: NodeStatus, t) => {
  let status = '',
    color = '',
    text = '',
    subText = '';
  switch (nodeStatus) {
    case NodeStatus.Loading:
      status = 'processing';
      color = '#18ba79';
      text = t('ngav.geting');
      subText = '';
      break;
    case NodeStatus.Exist:
      status = 'processing';
      color = '#18ba79';
      text = t('ngav.runing');
      subText = '';
      break;
    case NodeStatus.NoExist:
      status = 'default';
      color = '#ccc';
      text = t('ngav.stopi');
      subText = '';
      break;
    case NodeStatus.ExistQ:
      status = 'processing';
      color = '#F75555';
      text = t('ngav.runing');
      subText = t('ngav.getErr');
      break;
    case NodeStatus.NoExistQ:
      status = 'default';
      color = 'rgba(247,85,85,0.3)';
      text = t('ngav.stopi');
      subText = t('ngav.getErr');
      break;
  }
  return {
    status,
    color,
    text,
    subText,
  };
};
export default runStatus;
