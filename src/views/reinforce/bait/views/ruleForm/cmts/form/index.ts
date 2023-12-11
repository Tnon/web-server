/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 14:51:05
 * @LastEditTime: 2023-08-02 14:23:01
 */
import { customSome, preendTrim } from '@/utils/tools';
import formDetail from './index.vue';
export function findMatchingItems<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];
  for (const item1 of arr1) {
    if (arr2.includes(item1)) {
      result.push(item1);
    }
  }
  return result;
}
export function findMatchingStartItems<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];
  for (const item1 of arr1) {
    for (const item2 of arr2) {
      if (item1!.toString().startsWith(item2!.toString())) {
        result.push(item1);
        break;
      }
    }
  }
  return result;
}
export const findStartEndItems = (valueArr, matchArr) => {
  const result: any = [];
  for (const valueItem of valueArr) {
    for (const matchItem of matchArr) {
      const itemArr = matchItem.split('*');
      const [start, end] = itemArr;
      if (valueItem!.toString().startsWith(start) && valueItem!.toString().endsWith(end)) {
        result.push(valueItem);
        break;
      }
    }
  }
  return result;
};

export const getStaticConfig = (t) => {
  return {
    dir_path: {
      max: 50,
      placeholder:
        t('reinforce.arta') +
        `
/etc
/data`,
      fileName: t('reinforce.jkwj'),
    },
    file_format: {
      max: 50,
      placeholder:
        t('reinforce.artaa') +
        `
js
png`,
      fileName: t('reinforce.jkwj'),
    },
  };
};

export const validateLength = (max) => {
  return (_, value) => {
    if (preendTrim(value).length <= max!) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
};

export const validateprobes = (_, value) => {
  if (value && value.length) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
export const findStartWidth = (arr, str) => {
  let flag = false;
  arr.forEach((ele) => {
    if (ele.startsWith(str)) {
      flag = true;
    }
  });
  return flag;
};
// 首尾匹配
export const findStartEndWith = (arr, str) => {
  let flag = false;
  const strArr = str.split('*');
  const [start, end] = strArr;
  arr.forEach((ele) => {
    // 也可用正则
    if (ele.startsWith(start) && ele.endsWith(end)) {
      flag = true;
    }
  });
  return flag;
};
//  message: t('reinforce.ccMaxleght'),
export const validateRuleLength = (t) => {
  return (_, value) => {
    if (value.length) {
      const valueNoStart = customSome(value, (ele: string) => !ele.startsWith('/'));
      if (!valueNoStart) {
        const valueNoSpace = customSome(value, (ele: string) => ele.indexOf(' ') > -1);
        if (!valueNoSpace) {
          const flag = customSome(value, (ele: string) => ele.length > 1023);
          if (flag) {
            return Promise.reject(t('reinforce.ccMaxleght'));
          } else {
            const dirLength = customSome(value, (ele: string) => ele.split('/').length > 50);
            if (dirLength) {
              return Promise.reject(t('reinforce.ccDirLeng'));
            } else {
              const startWidthProc = customSome(value, (ele: string) => ele.startsWith('/proc/'));
              const startWidthPsys = customSome(value, (ele: string) => ele.startsWith('/sys/'));
              if (startWidthProc) {
                return Promise.reject(t('reinforce.nstsgvb', ['/propc/']));
              } else {
                if (startWidthPsys) {
                  return Promise.reject(t('reinforce.nstsgvb', ['/sys/']));
                } else {
                  return Promise.resolve();
                }
              }
            }
          }
        } else {
          return Promise.reject(t('reinforce.skkggl'));
        }
      } else {
        return Promise.reject(t('reinforce.skjgs'));
      }
    } else {
      return Promise.resolve();
    }
  };
};

export default formDetail;
