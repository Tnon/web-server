/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-15 19:38:51
 * @LastEditTime: 2023-02-23 20:32:23
 */
import { isNumber } from 'lodash';
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
// export const buildTreeData = (groups) => {
//   groups.forEach((ele) => {
//     if (Object.keys(ele).includes('host_group_num')) {
//       ele.id = 'business' + ele.id;
//     }
//     if (ele.host_group) {
//       ele.checkable = true;
//     } else {
//       ele.checkable = false;
//     }
//     if (!(ele.items && ele.items.length)) {
//       if (ele.host_group && ele.host_group.length) {
//         ele.items = ele.host_group;
//       }
//     } else {
//       buildTreeData(ele.items);
//     }
//     // if (Object.keys(ele).includes('host_group_num')) {
//     //   //业务组
//     //   ele.id = 'business' + ele.id;
//     //   if (ele.items) {
//     //     buildTreeData(ele.items);
//     //   }
//     // } else {
//     //   //主机组
//     //   ele.check = 1;
//     // }
//   });
// };
export const buildTreeData = (groups) => {
  // groups.forEach((ele) => {
  //   if (Object.keys(ele).includes('host_group_num')) {
  //     ele.id = 'business' + ele.id;
  //   }
  //   if (ele.host_group) {
  //     ele.checkable = true;
  //   } else {
  //     ele.checkable = false;
  //   }
  //   if (!(ele.items && ele.items.length)) {
  //     if (ele.host_group && ele.host_group.length) {
  //       ele.items = ele.host_group;
  //     }
  //   } else {
  //     buildTreeData(ele.items);
  //   }
  // });
  groups.forEach((ele) => {
    if (Object.keys(ele).includes('host_group_num')) {
      ele.id = 'business' + ele.id;
    }

    // if (ele.host_group) {
    //   ele.checkable = true;
    // } else {
    //   ele.checkable = false;
    // }
    if (ele.host_group && ele.host_group.length) {
      if (!ele.items) {
        ele.items = ele.host_group;
      } else {
        ele.items = ele.items.concat(ele.host_group);
      }
    }
    delete ele.host_group;
    if (ele.items && ele.items.length) {
      buildTreeData(ele.items);
    }
  });
};
export const buildTreeDataCheckAble = (groups) => {
  groups.forEach((ele) => {
    if (ele.items && ele.items.length) {
      if (ele.items.some((elec) => isNumber(elec.id))) {
        ele.checkable = true;
      } else {
        ele.checkable = false;
      }
    } else {
      if (Object.keys(ele).includes('host_group_num')) {
        ele.checkable = false;
      } else {
        ele.checkable = true;
      }
    }
    if (ele.items) {
      buildTreeDataCheckAble(ele.items);
    }
  });
};
export default applyHostGroup;
