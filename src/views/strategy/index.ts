/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-05 18:37:21
 * @LastEditTime: 2022-09-25 13:16:49
 */

import { StrategyType } from './common/types';

export const getPolicyNameApi = (t, policy_type: number) => {
  let policyName: string = '';
  switch (policy_type) {
    case StrategyType.Asset:
      policyName = t('strategy.assrqd');
      break;
    case StrategyType.Safe:
      policyName = t('strategy.safe');
      break;
    case StrategyType.White:
      policyName = t('strategy.white');
      break;
    case StrategyType.Black:
      policyName = t('strategy.black');
      break;
    default:
      policyName = '-';
      break;
  }
  return policyName;
};
