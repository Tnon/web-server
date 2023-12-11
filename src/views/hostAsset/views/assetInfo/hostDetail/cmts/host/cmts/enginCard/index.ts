/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-19 10:04:59
 * @LastEditTime: 2022-10-24 20:48:49
 */
import enginCard from './index.vue';
export const enginConfig = {
  acdrengine: {
    versionkey: 'acdr_version',
    timeKey: 'acdr_created_at',
  },
  hashengine: {
    versionkey: 'hash_version',
    timeKey: 'hash_created_at',
  },
  baselineengine: {
    versionkey: 'baseline_version',
    timeKey: 'baseline_created_at',
  },
};
export default enginCard;
