/*
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2023-02-22 14:51:05
 * @LastEditTime: 2023-04-11 20:32:26
 */
import { customSome, preendTrim } from '@/utils/tools';
import { unref } from 'vue';
import formDetail from './index.vue';
function findMatchingItems<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];
  for (const item1 of arr1) {
    if (arr2.includes(item1)) {
      result.push(item1);
    }
  }
  return result;
}
function findMatchingStartItems<T>(arr1: T[], arr2: T[]): T[] {
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
const findStartEndItems = (valueArr, matchArr) => {
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
    file_path: {
      max: 100,
      placeholder:
        t('reinforce.arta') +
        `
/etc/passwd 
/etc/shadow`,
      fileName: t('reinforce.jkwj'),
    },
    dir_path: {
      max: 100,
      placeholder:
        t('reinforce.arta') +
        `
/temp 
/user/bin`,
      fileName: t('reinforce.jkwj'),
    },
    proc_exclude: {
      max: 100,
      placeholder:
        t('reinforce.artaa') +
        `
bash 
zsh`,
      fileName: t('reinforce.jkwj'),
    },
  };
};

export const validatePathFile = (dir_path) => {
  return (_, value) => {
    if (value.length) {
      return Promise.resolve();
    } else {
      if (dir_path.value.length) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  };
};
export const validatePathFileContain = (isHaveInject) => {
  return (_, value) => {
    if (value.length) {
      if (isHaveInject.value) {
        if (
          preendTrim(value).includes('/etc/shadow') ||
          preendTrim(value).includes('/etc/passwd')
        ) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
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
export const validatePathDir = (file_path) => {
  return (_, value) => {
    if (value.length) {
      return Promise.resolve();
    } else {
      if (file_path.value.length) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  };
};
export const validatePathDirContain = (isHaveInject) => {
  return (_, value) => {
    if (value.length) {
      const trimValue = preendTrim(value);
      if (isHaveInject.value) {
        if (
          trimValue.includes('/root') ||
          trimValue.includes('/etc') ||
          trimValue.includes('/dev') ||
          trimValue.includes('/home') ||
          trimValue.includes('/lib') ||
          trimValue.includes('/lib64') ||
          trimValue.includes('/usr') ||
          trimValue.includes('/var') ||
          trimValue.includes('/var/log') ||
          trimValue.includes('/tmp') ||
          trimValue.includes('/') ||
          findStartWidth(trimValue, '/usr/local/mprotect_agent') ||
          findStartWidth(trimValue, '/var/lib/axsec') ||
          findStartWidth(trimValue, '/etc/mprotect_agent') ||
          findStartEndWith(trimValue, '/etc/*memprotect')
        ) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  };
};
export const dymicDirPathMessage = (value, isHaveInject, t) => {
  if (isHaveInject) {
    const containArr = findMatchingItems(preendTrim(unref(value)), [
      '/root',
      '/etc',
      '/dev',
      '/home',
      '/lib',
      '/lib64',
      '/usr',
      '/var',
      '/var/log',
      '/tmp',
      '/',
    ]);
    const startArr = findMatchingStartItems(preendTrim(unref(value)), [
      '/usr/local/mprotect_agent',
      '/var/lib/axsec',
      '/etc/mprotect_agent',
    ]);
    // 首尾匹配
    const startEndArr = findStartEndItems(preendTrim(unref(value)), ['/etc/*memprotect']);

    if ([...containArr, ...startArr, ...startEndArr].length) {
      return t('reinforce.yjxsg', [[...containArr, ...startArr, ...startEndArr].join('，')]);
    } else {
      return t('reinforce.fpplcs');
    }
  } else {
    return t('reinforce.fpplcs');
  }
};

export const dymicPathPathMessage = (value, isHaveInject, t) => {
  if (isHaveInject) {
    const containArr = findMatchingItems(preendTrim(unref(value)), ['/etc/shadow', '/etc/passwd']);
    if ([...containArr].length) {
      return t('reinforce.yjxsg', [[...containArr].join('，')]);
    } else {
      return t('reinforce.fpplcs');
    }
  } else {
    return t('reinforce.fpplcs');
  }
};
export const validateprobes = (_, value) => {
  if (value && value.length) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
const findStartWidth = (arr, str) => {
  let flag = false;
  arr.forEach((ele) => {
    if (ele.startsWith(str)) {
      flag = true;
    }
  });
  return flag;
};
// 首尾匹配
const findStartEndWith = (arr, str) => {
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
export const validateRuleLength = (_, value) => {
  if (value.length) {
    const flag = customSome(value, (ele: string) => ele.length > 1023);
    if (flag) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};

export default formDetail;
