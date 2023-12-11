/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-21 12:02:55
 * @LastEditTime: 2023-11-02 19:05:11
 */
// import { OSTYPE } from '@/enums/assetsType';
import { ipReg, portReg } from '@/utils/reg';
import { bytesLength, customSome } from '@/utils/tools';
import pwdInstallModal from './index.vue';
export const validateAgtAddress = (_, value) => {
  const strRegex =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,5})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  const re = new RegExp(strRegex);
  if (value) {
    if (re.test(value)) {
      if (value.includes(':')) {
        const port = value.split(':')[1];
        if (port > 65535) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.resolve();
  }
};
export const validateUsername = (_, value) => {
  if (bytesLength(value) > 60) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
export const validateIpPort = (_, value) => {
  if (value) {
    if (value.includes(':')) {
      const [ip, port] = value.split(':');
      if (ipReg.test(ip) && portReg.test(port)) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    } else if (ipReg.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } else {
    return Promise.resolve();
  }
};
export const validatePath = (t) => {
  const sysPath = [
    '/lib/',
    '/lib32/',
    '/lib64/',
    '/tmp/',
    '/proc/',
    '/sys/',
    '/dev/',
    '/etc/',
    '/mnt/',
    '/usr/lib/',
    '/var/',
    '/run/',
    '/media/',
    '/include/',
    '/cdrom/',
    '/lost_found/',
    '/boot/',
  ];
  const pathReg = new RegExp(/^[a-zA-Z0-9_\/-]+$/);
  return (_, value) => {
    if (value) {
      if (value.startsWith('/')) {
        if (value.indexOf(' ') < 0) {
          if (pathReg.test(value)) {
            let containPath = '';
            const flag = customSome(sysPath, (ele: string) => {
              containPath = ele;
              if (value + '/' === ele) {
                return true;
              }
              return value.startsWith(ele);
            });
            if (flag) {
              return Promise.reject(t('setting.sysfmg', [containPath]));
            } else {
              if (bytesLength(value) > 200) {
                return Promise.reject(t('setting.anleg'));
              } else {
                return Promise.resolve();
              }
            }
          } else {
            return Promise.reject(t('setting.anlkfjs'));
          }
        } else {
          return Promise.reject(t('setting.anbnkk'));
        }
      } else {
        return Promise.reject(t('setting.skjg'));
      }
    } else {
      return Promise.resolve();
    }
  };
};

export default pwdInstallModal;
