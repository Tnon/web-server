/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-09 10:20:17
 * @LastEditTime: 2023-02-15 19:27:41
 */
import { ProgressIDState } from '../../type';
import processTree from './index.vue';

interface ResultData {
  name: string;
  id: string;
  disabled?: boolean;
  items?: ResultData[];
}
//将返回数据加工成树形
export const formatData = (data: ProgressIDState[]) => {
  const result: ResultData[] = [];
  data.forEach((ele) => {
    const obj: ResultData = {
      name: ele.process_path,
      id: ele.process_path,
      items: [],
      disabled: !(ele.pids && ele.pids.length),
    };
    if (ele.pids && ele.pids.length) {
      ele.pids.forEach((pid) => {
        obj.items!.push({
          name: pid + '',
          id: ele.process_path + '|' + pid,
        });
      });

      result.push(obj);
    }
  });
  return result;
};

//将原有数据加工成树形所属数据
export const formatPids = (pids: ProgressIDState[] | undefined) => {
  const result: string[] = [];
  if (pids) {
    pids.forEach((ele) => {
      ele.pids.forEach((pid) => {
        result.push(ele.process_path + '|' + pid);
      });
    });
  }
  return result;
};
//选完树形，构造数据发送外部
export const formatTreePids = (selectedData: string[] | undefined) => {
  const result: ProgressIDState[] = [];
  if (selectedData) {
    const obj = {};
    selectedData.forEach((ele) => {
      obj[ele.split('|')[0]] = [...(obj[ele.split('|')[0]] ?? []), ~~ele.split('|')[1]];
    });
    for (const k in obj) {
      result.push({
        process_path: k,
        pids: obj[k],
      });
    }
  }
  return result;
};
export default processTree;
