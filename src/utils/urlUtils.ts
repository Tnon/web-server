/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-12-02 16:36:58
 */
import Hashes from 'jshashes';
import { isArray, isObject } from '@/utils/is/';
export function setStateToUrl(obj: object, pro_key = ''): object {
  for (const key in obj) {
    if (isArray(obj[key])) {
      if (obj[key].length === 1) {
        if (!isObject(obj[key][0])) {
          obj[key] = obj[key][0];
        }
      } else {
        if (obj[key].length) {
          if (!isObject(obj[key][0])) {
            obj[key] = obj[key].join(',');
          }
        } else {
          obj[key] = obj[key].join(',');
        }
      }
    }
    if (pro_key === 'filter' && obj[key] === '') {
      delete obj[key];
    }
    if (isObject(obj[key])) {
      setStateToUrl(obj[key], key);
    }
  }
  return obj;
}
export const pCompile = (code) => {
  const SHA256 = new Hashes.SHA256();
  return SHA256.hex(code);
};

export const compileStr = (code) => {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
};

export const unCompileStr = (code) => {
  if (!code) {
    return code;
  }
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
};
