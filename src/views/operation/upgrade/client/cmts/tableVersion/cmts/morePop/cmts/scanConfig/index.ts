/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-18 16:47:04
 * @LastEditTime: 2023-08-23 20:23:20
 */
import { ipDuan, ipReg, portReg } from '@/utils/reg';
import scanConfig from './index.vue';
export const validaAddress = (t) => {
  return (_, value) => {
    if (value) {
      if (ipReg.test(value)) {
        return Promise.resolve();
      } else if (value.includes('-')) {
        const [ip1, ip2] = value.split('-');
        if (ipReg.test(ip1) && ipReg.test(ip2)) {
          const [ip11, ip12, ip13] = ip1.split('.');
          const [ip21, ip22, ip23] = ip2.split('.');
          if (ip11 === ip21 && ip12 === ip22 && ip13 === ip23) {
            return Promise.resolve();
          } else {
            return Promise.reject(t('operation.smwdplcre'));
          }
        } else {
          return Promise.reject(t('operation.smwdplcre'));
        }
      } else if (ipDuan.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(t('operation.smwdplcre'));
      }
    } else {
      // return Promise.reject(t('operation.smwdpl'));
      return Promise.resolve();
    }
  };
};

export const validatePorts = (_, value) => {
  if (value) {
    const ports = value.split(',');
    const flag = ports.every((ele) => portReg.test(ele));
    if (flag) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.resolve();
  }
};

// export const validateScanCount = (_, value) => {
//   if (value) {
//     if (value > 500) {
//       return Promise.reject();
//     } else {
//       return Promise.resolve();
//     }
//   } else {
//     return Promise.reject();
//   }
// };

// export const validatePkgCount = (_, value) => {
//   if (value) {
//     if (value > 2000) {
//       return Promise.reject();
//     } else {
//       return Promise.resolve();
//     }
//   } else {
//     return Promise.reject();
//   }
// };
export default scanConfig;
