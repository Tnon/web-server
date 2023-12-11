/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-13 18:26:09
 * @LastEditTime: 2023-02-15 13:44:16
 */
import { useUserToken } from '@/store/modules/user';
import { computed } from 'vue';
import { filter } from '@/utils/tools';
import { M_PERMISSION, SelectLevel } from '@/store/modules/user/type';
//树形数据拍平
export const treeToArr = (data: M_PERMISSION[], res: M_PERMISSION[] = []) => {
  data.forEach((item) => {
    res.push({ routerName: item.routerName, checkLevel: item.checkLevel, title: item.title });
    if (item.children && item.children.length !== 0) {
      treeToArr(item.children, res);
    }
  });
  return res;
};
//根据路由名字找出当前路由对象
export const getMatchedRouter = (
  storePermissionMap: M_PERMISSION[],
  routerName: string,
): M_PERMISSION => {
  //平铺数据
  const singleMap = treeToArr(storePermissionMap);
  const result = filter<M_PERMISSION>(singleMap, (ele) => ele.routerName === routerName);
  return { ...result[0] };
};
//判断当前路由是否有权限
export const hasPerimission = (routerName) => {
  const userTokenStore = useUserToken();
  const rulePermissions = computed(() => userTokenStore.userPermissions);

  const matchRouter = getMatchedRouter(rulePermissions.value.permissionMap, routerName);

  if (matchRouter!.checkLevel === undefined || matchRouter!.checkLevel === SelectLevel.None) {
    return false;
  }
  return true;
};
//深度遍历，将SelectLevel为2且无children的存入数组
export const getOverviewName = (routersSingleMap: M_PERMISSION[]) => {
  const result: string[] = [];
  function getName(node: M_PERMISSION[]) {
    if (Array.isArray(node) && node.length > 0) {
      node.forEach((item) => {
        if (item.checkLevel === SelectLevel.Done && !item.children) {
          result.push(item.routerName);
        }
        if (item.children) {
          getName(item.children);
        }
      });
    }
  }
  getName(routersSingleMap);
  return result;
};

//找出首页的路由名称，整体数组中第一项checkLevel为2，且无children
export const getOverviewRouterName = (outerName?: string) => {
  const userTokenStore = useUserToken();
  const rulePermissions = computed(() => userTokenStore.userPermissions);
  let routerName = '';
  if (outerName) {
    const outerRouters = filter<M_PERMISSION>(
      rulePermissions.value.permissionMap,
      (ele) => ele.routerName === outerName,
    );
    [routerName] = getOverviewName(outerRouters);
  } else {
    const outerRouters = rulePermissions.value.permissionMap;
    [routerName] = getOverviewName(outerRouters);
  }
  return routerName;
};

// 刷新当前用户的信息
export const refreshPermission = () => {
  const userTokenStore = useUserToken();
  userTokenStore.getUserInfo();
};
