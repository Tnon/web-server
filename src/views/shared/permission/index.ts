/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-13 17:03:20
 * @LastEditTime: 2022-10-21 18:56:19
 */
import { M_PERMISSION, SelectLevel } from '@/store/modules/user/type';
//根据选择项目生成渲染树
export const setCheckedKeys = (
  checkedKeys: string[],
  routersSingleMap: M_PERMISSION[],
  halfCheckedKeys: string[],
): void => {
  routersSingleMap.forEach((ele) => {
    ele.checkLevel = SelectLevel.None;
    if (checkedKeys.includes(ele.routerName)) {
      ele.checkLevel = SelectLevel.Done;
    }
    if (halfCheckedKeys.includes(ele.routerName)) {
      ele.checkLevel = SelectLevel.Half;
    }
    if (ele.children) {
      setCheckedKeys(checkedKeys, ele.children, halfCheckedKeys);
    }
  });
};
