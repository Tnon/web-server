/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 10:20:18
 * @LastEditTime: 2022-12-23 14:52:45
 */
import advanSearch from './index.vue';
export const formaDataByName = (itmes) => {
  const targetArr: any = [];
  itmes.forEach((item) => {
    if (targetArr.every((ele) => ele.name != item.name)) {
      targetArr.push(item);
    } else {
      const index = targetArr.findIndex((ele) => ele.name === item.name);
      targetArr[index].id += ',' + item.id;
    }
  });
  return targetArr;
};
export default advanSearch;
