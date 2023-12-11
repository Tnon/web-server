/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 19:38:51
 * @LastEditTime: 2023-02-23 20:32:06
 */
import applyHostGroup from './index.vue';

export const getCheckedGroups = (applyGroups, groups, seletedId) => {
  groups.forEach((ele) => {
    if (ele.policy_id === seletedId) {
      applyGroups.push(ele.id);
      ele.disabled = true;
    }
    if (ele.items) {
      getCheckedGroups(applyGroups, ele.items, seletedId);
    }
  });
};
export default applyHostGroup;
