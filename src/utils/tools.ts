import router from '@/router';
import { computed, ref, unref } from 'vue';
import { createStorage } from '@/utils/Storage';
import { AxiosCanceler } from '@/utils/http/axiosCancel';
import request from '@/utils/http';
import { ONLINESTATUS, OSTYPE } from '@/enums/assetsType';
import { isNumber, isString } from 'lodash';
import { Language } from '@/enums/language';
const storage = createStorage();
export const datedifference = (sDate1: string, sDate2: string): number => {
  //sDate1和sDate2是2006-12-18格式
  if (!sDate1 || !sDate2) {
    return 0;
  }
  let dateSpan = 0,
    iDays = 0;
  const arr = sDate1.split('');
  arr.splice(4, 0, '-');
  arr.splice(7, 0, '-');
  sDate1 = arr.join('');

  const arr2 = sDate2.split('');
  arr2.splice(4, 0, '-');
  arr2.splice(7, 0, '-');
  sDate2 = arr2.join('');
  const sDate1N = Date.parse(sDate1);
  const sDate2N = Date.parse(sDate2);
  dateSpan = sDate2N - sDate1N;
  // dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays + 1;
};
//字符长度
export const bytesLength = (value) => {
  value = value ?? '';
  let count = value.replace(/\s*/g, '').length;
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 255) {
      count++;
    }
  }
  return count;
};

export const getQueryValue = (type: string): string => {
  const ip = computed(() => (unref(router.currentRoute).query[type] as string) ?? '');
  return unref(ip);
};
/**
 * 密码强度校验
 * @param {string} sValue
 * @param {string} email
 */
export const checkStrong = (sValue: string, email: string): any => {
  const modes = {
    low: false,
    middle: false,
    high: false,
    level: 0,
  };
  //正则表达式验证符合要求的
  // 当没有输入密码的时候返回modes
  if (sValue.length < 1) {
    return modes;
  }

  // 当输入密码在8-20位之间，level+1
  if (/^[\s\S]{8,20}$/.test(sValue)) {
    modes.low = true; //8-20
    modes.level++;
  }
  // 当输入的密码由特殊数字加上字母组成，level+1
  if (/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{0,}/.test(sValue)) {
    modes.middle = true; //字母数字特殊符合
    modes.level++;
  }
  // 当输入的密码不包括邮箱或者邮箱还没输入，level+1
  if (sValue.indexOf(email) < 0 || email == '') {
    modes.high = true; //大写
    modes.level++;
  }
  return modes;
};

//退出登录，清空
export const Logout = () => {
  router.replace({
    name: 'login',
  });
  storage.clear();
  window.location.reload();
};
export const removeAllPending = () => {
  const axiosCanceler = new AxiosCanceler();
  axiosCanceler.removeAllPending();
};
//格式化
export const preendTrim = (arr) => {
  const newa: any = [];

  arr?.forEach((ele) => {
    ele = ele.trim();
    if (ele && newa.indexOf(ele) < 0) {
      newa.push(ele);
    }
  });
  return newa;
};

/**
 * 根据os判断系统类型
 * @param os or osver
 */
export const osLogoType = (oslow: string | OSTYPE, online: ONLINESTATUS) => {
  const typesrc = ref(''),
    os = ref('');
  if (isString(oslow)) {
    os.value = oslow.toUpperCase().replace(/\s+/g, '');
  } else if (isNumber(oslow)) {
    os.value = oslow === OSTYPE.WINDOWS ? 'WINDOWS' : 'LINUX';
  } else {
    os.value = 'LINUX';
  }

  if (os.value.indexOf('WINDOWS') > -1) {
    //windows
    typesrc.value = '#ax-os-win';
  } else if (os.value.indexOf('CENTOS') > -1) {
    //centos
    typesrc.value = '#ax-os-CentOs';
  } else if (os.value.indexOf('DEBIAN') > -1) {
    //DEBIAN
    typesrc.value = '#ax-os-Debain';
  } else if (os.value.indexOf('FEDORA') > -1) {
    //fedora
    typesrc.value = '#ax-os-fedora';
  } else if (os.value.indexOf('KYLIN') > -1) {
    //NeoKylin
    typesrc.value = '#ax-os-NeoKylin';
  } else if (os.value.indexOf('SUSE') > -1 || os.value.indexOf('SLES') > -1) {
    // suse
    typesrc.value = '#ax-os-Suse';
  } else if (os.value.indexOf('UBUNTU') > -1) {
    // ubuntu
    typesrc.value = '#ax-os-Ubuntu';
  } else if (os.value.indexOf('UOS') > -1) {
    // ubuntu
    typesrc.value = '#ax-os-UOS';
  } else if (os.value.indexOf('REDFLAG') > -1) {
    // ubuntu
    typesrc.value = '#ax-os-RedFlag';
  } else if (os.value.indexOf('REDHAT') > -1) {
    //redhat
    typesrc.value = '#ax-os-RedHat';
  } else if (os.value.indexOf('DEEPIN') > -1) {
    //deepin
    typesrc.value = '#ax-os-deepin';
  } else {
    //其他暂时linux
    typesrc.value = '#ax-os-Linux';
  }
  if (online !== ONLINESTATUS.ONLINE && online !== undefined) {
    typesrc.value = typesrc.value + 'off';
  }
  return typesrc;
};
//获取当前时间字符串文件名
export const getNowDate = (arudate) => {
  const date = new Date(arudate);
  const YY = date.getFullYear();
  const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return '' + YY + MM + DD + hh + mm + ss;
};
//导出excel文件
export const exportExcel = (url, params: { filter: any }, method: any = 'POST', fileName?) => {
  return new Promise((resolve, reject) => {
    request({
      method,
      url,
      params,
      responseType: 'blob', // 表明返回服务器返回的数据类型，它可以看做是存放二进制数据的容器；
    }).then(
      (response) => {
        if (!response) {
          return;
        }
        let type;
        if (response.type.indexOf('zip') > -1) {
          type = 'application/zip';
          fileName = (fileName ?? getNowDate(new Date())) + '.zip';
        } else {
          type = 'application/vnd.ms-excel';
          fileName = (fileName ?? getNowDate(new Date())) + '.xlsx';
        }
        resolve(response);
        const blob = new Blob([response], {
          type,
        });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (navigator as any).msSaveBlob(blob, fileName);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};
//导出log文件
export const exportLog = (url) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url,
      responseType: 'blob', // 表明返回服务器返回的数据类型
    }).then(
      (response) => {
        if (!response) {
          return;
        }
        resolve(response);
        const blob = new Blob([response], {
          type: 'application/octet-stream',
        });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (navigator as any).msSaveBlob(blob, getNowDate(new Date()) + '.log');
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = getNowDate(new Date()) + '.log';
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};
//导出serverlog文件
export const exportServerLog = (url, module) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url,
      params: { module },
      responseType: 'blob', // 表明返回服务器返回的数据类型
    }).then(
      (response) => {
        if (!response) {
          return;
        }
        resolve(response);
        const blob = new Blob([response], {
          type: 'application/octet-stream',
        });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (navigator as any).msSaveBlob(blob, module + '.zip');
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = module + '.zip';
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};
export const exportReportExcel = (url: string, filename: string) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url,
      responseType: 'blob', // 表明返回服务器返回的数据类型
    }).then(
      (response) => {
        if (!response) {
          return;
        }
        resolve(response);
        const blob = new Blob([response], {
          type: 'application/octet-stream',
        });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (navigator as any).msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};
export const exportDataBak = (url: string, filename: string) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url,
      responseType: 'blob', // 表明返回服务器返回的数据类型
    }).then(
      (response) => {
        if (!response) {
          return;
        }
        resolve(response);
        const blob = new Blob([response], {
          type: 'application/zip',
        });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (navigator as any).msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};
//IP转整数
export const _ip2int = (ip) => {
  let num = 0;
  ip = ip.split('.');
  num =
    Number(ip[0]) * 256 * 256 * 256 +
    Number(ip[1]) * 256 * 256 +
    Number(ip[2]) * 256 +
    Number(ip[3]);
  num = num >>> 0;
  return num;
};
//整型解析为IP地址
export const _int2iP = (num) => {
  let str = '';
  const tt: any = [];
  tt[0] = (num >>> 24) >>> 0;
  tt[1] = ((num << 8) >>> 24) >>> 0;
  tt[2] = (num << 16) >>> 24;
  tt[3] = (num << 24) >>> 24;
  str = String(tt[0]) + '.' + String(tt[1]) + '.' + String(tt[2]) + '.' + String(tt[3]);
  return str;
};
//获取浏览器语言
export const getNavigatorLang = (): Language => {
  //浏览器语言
  const lang = navigator.language;
  if (lang.toLowerCase().includes('zh')) {
    return Language.ZH;
  }
  return Language.EN;
};
export function utf8ByteToUnicodeStr(utf8Bytes) {
  let unicodeStr = '';
  for (let pos = 0; pos < utf8Bytes.length; ) {
    const flag = utf8Bytes[pos];
    let unicode = 0;
    if (flag >>> 7 === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    } else if ((flag & 0xfc) === 0xfc) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 24;
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 18;
      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 12;
      unicode |= (utf8Bytes[pos + 4] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 5] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 6;
    } else if ((flag & 0xf8) === 0xf8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 18;
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 12;
      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 4] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 5;
    } else if ((flag & 0xf0) === 0xf0) {
      unicode = (utf8Bytes[pos] & 0xf) << 18;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 12;
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 3] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 4;
    } else if ((flag & 0xe0) === 0xe0) {
      unicode = (utf8Bytes[pos] & 0x1f) << 12;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 2] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 3;
    } else if ((flag & 0xc0) === 0xc0) {
      //110
      unicode = (utf8Bytes[pos] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 1] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 2;
    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    }
  }
  return unicodeStr;
}
export const bin2String = (array: Array<number>): string => {
  // return decodeURIComponent(escape(String.fromCharCode!.apply(String, array)));
  // const decoder = new TextDecoder('utf-8');
  // return decoder.decode(new Uint8Array(array));
  return utf8ByteToUnicodeStr(array);
  // return iconvLite.decode(array, 'utf-8');
};
//两个时分相差分钟
export const timeHHMMbetween = (
  timeArr: { begin: string; end: string }[],
  value: number,
): boolean => {
  let flag = false;
  timeArr.forEach(({ begin, end }) => {
    const [sstart, send] = begin.split(':');
    const stotal = ~~sstart * 60 + ~~send;
    const [estart, eend] = end.split(':');
    const etotal = ~~estart * 60 + ~~eend;
    if (Math.abs(etotal - stotal) < value) {
      flag = true;
    }
  });
  // if (timeArr.length > 2) {
  //   return true;
  // }
  return flag;
};
//两个时分重合
export const timeHHMMRepeat = (timeArr: { begin: string; end: string }[]): boolean => {
  if (timeArr.length !== 2 || timeHHMMbetween(timeArr, 30)) {
    return true;
  } else {
    const { begin: fbegin, end: fend } = timeArr[0];
    const { begin: tbegin, end: tend } = timeArr[1];

    const [fbstart, fbend] = fbegin.split(':');
    const [festart, feend] = fend.split(':');
    const fbtotal = ~~fbstart * 60 + ~~fbend;
    const fetotal = ~~festart * 60 + ~~feend;

    const [tbstart, tbend] = tbegin.split(':');
    const [testart, teend] = tend.split(':');
    const tbtotal = ~~tbstart * 60 + ~~tbend;
    const tetotal = ~~testart * 60 + ~~teend;

    if (fetotal > tetotal) {
      if (fbtotal >= tetotal) {
        return true;
      } else {
        return false;
      }
    } else if (tetotal > fetotal) {
      if (tbtotal >= fetotal) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};
export const formatSeconds = (second: number) => {
  //  分
  let minute = 0;
  //  小时
  let hour = 0;
  //  天
  let day = 0;
  //  如果秒数大于60，将秒数转换成整数
  if (second > 60) {
    //  获取分钟，除以60取整数，得到整数分钟
    minute = Math.floor(second / 60);
    //  获取秒数，秒数取佘，得到整数秒数
    second = Math.floor(second % 60);
    //  如果分钟大于60，将分钟转换成小时
    if (minute > 60) {
      //  获取小时，获取分钟除以60，得到整数小时
      hour = Math.floor(minute / 60);
      //  获取小时后取佘的分，获取分钟除以60取佘的分
      minute = Math.floor(minute % 60);
      //  如果小时大于24，将小时转换成天
      if (hour > 23) {
        //  获取天数，获取小时除以24，得到整天数
        day = Math.floor(hour / 24);
        //  获取天数后取余的小时，获取小时除以24取余的小时
        hour = Math.floor(hour % 24);
      }
    }
  }

  let result = '' + Math.floor(second) + 's';
  if (minute > 0) {
    result = '' + Math.floor(minute) + 'm' + result;
  }
  if (hour > 0) {
    result = '' + Math.floor(hour) + 'h' + result;
  }
  if (day > 0) {
    result = '' + Math.floor(day) + 'd' + result;
  }
  return result;
};
export function timestampToTime(timestamp) {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return Y + '-' + M + '-' + D;
  }
  return '';
}
export const filter = <T>(arr, func): T[] => {
  const result: T[] = [];
  arr.forEach((ele) => {
    if (func(ele)) {
      result.push(ele);
    }
  });
  return result;
};

export const findLastIndex = (arr, func) => {
  let index = -1;
  arr.forEach((ele, ind) => {
    if (func(ele)) {
      index = ind;
    }
  });
  return index;
};
export function countCharOccurrences(str: string, char: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

export function deleteNode(tree, name: string) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.name === name) {
      tree.splice(i, 1);
      return tree;
    }
    if (node.children) {
      deleteNode(node.children, name);
      if (node.children.length === 0) {
        delete node.children;
      }
    }
  }
  return tree;
}
export function getContainerWidth(container: Element): number {
  const styles = window.getComputedStyle(container);
  const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
  const border = parseFloat(styles.borderLeftWidth) + parseFloat(styles.borderRightWidth);
  const width = container.clientWidth - padding - border;
  return width;
}

//改写find
export const customFind = (sourceArr, targetValue): boolean => {
  let flag = false;
  if (sourceArr.length) {
    sourceArr.forEach((ele) => {
      if (ele.value === targetValue) {
        flag = true;
      }
    });
  }
  return flag;
};
export const customSome = <T>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => boolean,
): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};

export function ipInRange(ip: string, startIP: string, endIP: string): boolean {
  function ipToInt(ipAddress: string): number {
    const parts = ipAddress.split('.');
    return parts.reduce((acc, part) => (acc << 8) + parseInt(part, 10), 0);
  }

  const ipNum = ipToInt(ip);
  const startIPNum = ipToInt(startIP);
  const endIPNum = ipToInt(endIP);

  return ipNum >= startIPNum && ipNum <= endIPNum;
}

export function getCIDRRange(cidr) {
  const parts = cidr.split('/');
  const ipAddress = parts[0];
  const subnetMaskBits = parseInt(parts[1], 10);

  // Function to convert IP address to numeric representation
  function ipToNumeric(ipAddress) {
    const parts = ipAddress.split('.');
    return (
      (parseInt(parts[0], 10) << 24) +
      (parseInt(parts[1], 10) << 16) +
      (parseInt(parts[2], 10) << 8) +
      parseInt(parts[3], 10)
    );
  }

  // Function to convert numeric representation back to IP address
  function numericToIP(numericIP) {
    const octet1 = (numericIP >>> 24) & 255;
    const octet2 = (numericIP >>> 16) & 255;
    const octet3 = (numericIP >>> 8) & 255;
    const octet4 = numericIP & 255;
    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  }

  const numericIP = ipToNumeric(ipAddress);
  const subnetMask = 0xffffffff << (32 - subnetMaskBits);
  const networkAddress = numericIP & subnetMask;
  const firstHostAddress = networkAddress + 1;
  const lastHostAddress = networkAddress + ((1 << (32 - subnetMaskBits)) - 3);

  const startIP = numericToIP(firstHostAddress);
  const endIP = numericToIP(lastHostAddress);

  return { startIP, endIP };
}
