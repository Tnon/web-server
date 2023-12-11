/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 11:43:29
 * @LastEditTime: 2023-01-10 10:48:15
 */
import { getCreateUser, getGroupUser, getUpdateUser } from '@/api/strategy/white';
import { getHostGroups } from '@/api/asset/hostInfo/host';
import advanSearch from './index.vue';
export const enum E_USER {
  Create,
  Content,
  Group,
}
//获取创建人 变更人
export const useDymicPeople = async (type: E_USER) => {
  if (type === E_USER.Create) {
    const { items } = await getCreateUser({ search_data: '' });
    return Promise.resolve(items);
  }
  if (type === E_USER.Content) {
    const { items } = await getUpdateUser({ search_data: '' });
    return Promise.resolve(items);
  }
  if (type === E_USER.Group) {
    const { items } = await getGroupUser({ search_data: '' });
    return Promise.resolve(items);
  }
  if (type === 'group') {
    const { groups } = await getHostGroups();
    return Promise.resolve(groups);
  }
};
export default advanSearch;
