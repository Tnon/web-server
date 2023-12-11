/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:34:03
 * @LastEditTime: 2022-07-26 14:42:35
 */
import { _ip2int, preendTrim } from '@/utils/tools';
import { isRegExp } from 'lodash';
import ruleTextarea from './index.vue';
export const fakeClick = (obj) => {
  const ev = document.createEvent('MouseEvents');
  ev.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
  );
  obj.dispatchEvent(ev);
};
const ipv4 =
  /^(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))\/([1-2][0-9]|3[0-2]|[1-9])$/;
const ipReg =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

export const validateIpRegs = (_, value) => {
  let flag = false;
  if (!value) {
    flag = false;
  } else {
    const valArr = value.split('\n');
    valArr.forEach((ele) => {
      if (ele) {
        if (ele.includes('/')) {
          if (!ipv4.test(ele)) {
            flag = true;
          }
        } else if (ele.includes('-')) {
          const [pre, next] = ele.split('-');
          if (ipReg.test(pre) && ipReg.test(next)) {
            if (_ip2int(pre) >= _ip2int(next)) {
              flag = true;
            }
          } else {
            flag = true;
          }
        } else {
          if (!ipReg.test(ele)) {
            flag = true;
          }
        }
      }
    });
  }
  if (flag) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

export const validateRegs = (_, value) => {
  let flag = true;
  if (!value) {
    flag = true;
  } else {
    const valArr = preendTrim(value.split('\n'));
    flag = valArr.every((ele) => isRegExp(ele));
  }
  if (flag) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
export const validatePaths = (_, value) => {
  let flag = true;
  if (!value) {
    flag = true;
  } else {
    const valArr = preendTrim(value.split('\n'));
    flag = valArr.every((ele) => ele !== '/');
  }
  if (flag) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
export const validatePathLength = (_, value) => {
  let flag = true;
  if (!value) {
    flag = true;
  } else {
    const valArr = preendTrim(value.split('\n'));
    flag = valArr.every((ele) => ele.length < 4096);
  }
  if (flag) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
export default ruleTextarea;
