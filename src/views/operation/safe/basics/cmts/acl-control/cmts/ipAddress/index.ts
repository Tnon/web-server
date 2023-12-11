/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-04 14:30:48
 * @LastEditTime: 2022-11-04 19:04:46
 */
import { _ip2int, _int2iP } from '@/utils/tools';
import ipAddress from './index.vue';
interface IpArr {
  ip_begin: string;
  ip_end: string;
}
// 区间合并
const mergeIp = (intArr: number[][]): number[][] => {
  if (intArr.length <= 1) {
    return intArr;
  }
  intArr.sort((arr1, arr2) => {
    if (arr1[0] !== arr2[0]) {
      return arr1[0] - arr2[0];
    } else {
      return arr1[1] - arr2[1];
    }
  });
  const ans = [intArr[0]];
  let prev = intArr[0];
  for (let i = 1; i < intArr.length; i++) {
    if (intArr[i][0] - prev[1] > 1) {
      ans.push(intArr[i]);
      prev = intArr[i];
    } else {
      prev[1] = Math.max(prev[1], intArr[i][1]);
    }
  }
  return ans;
};
//合并完转换
export const sampleSample = (ipArr: IpArr[]) => {
  const intArr: number[][] = [];
  ipArr.forEach(({ ip_begin, ip_end }) => {
    const beginNumber = _ip2int(ip_begin);
    const endNumber = _ip2int(ip_end);
    intArr.push(beginNumber <= endNumber ? [beginNumber, endNumber] : [endNumber, beginNumber]);
  });
  const finalIntArr = mergeIp(intArr);
  const result: string[] = [];
  const ipObjArr: any = [];
  finalIntArr.forEach((ele) => {
    result.push(
      _int2iP(ele[0]) === _int2iP(ele[1])
        ? _int2iP(ele[0])
        : _int2iP(ele[0]) + '-' + _int2iP([ele[1]]),
    );
    ipObjArr.push({
      ip_begin: _int2iP(ele[0]),
      ip_end: _int2iP(ele[1]),
    });
  });

  return { result, ipObjArr };
};
export default ipAddress;
