/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-21 09:47:16
 * @LastEditTime: 2022-10-21 15:34:17
 */
import antTree from './index.vue';
export const transformData = (data) => {
  data.forEach((ele) => {
    if (ele.items) {
      ele.children = ele.items;
      transformData(ele.children);
      delete ele.items;
    }
  });
};

export default antTree;
