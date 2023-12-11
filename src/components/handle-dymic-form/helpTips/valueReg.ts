/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-10 17:39:13
 * @LastEditTime: 2023-08-01 11:13:56
 */

import { bytesLength, countCharOccurrences, getCIDRRange, ipInRange } from '@/utils/tools';
import { ipReg, portReg, ipDuan, domainReg, pathReg } from '@/utils/reg';
//增加属性需要改动
const attrRegs = {
  //文件md5
  file_md5: {
    equal: (_, value) => {
      if (value) {
        if (/^[0-9A-Za-z]{32}$/.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
      return Promise.resolve();
    },
  },
  //文件目录
  file_dir: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //访问目录
  access_dir: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //进程名
  process_name: {
    equal: (_, value) => {
      if (value) {
        if (
          value.endsWith('bash') ||
          value.endsWith('java') ||
          value.endsWith('python') ||
          value.endsWith('python2') ||
          value.endsWith('python3') ||
          value.endsWith('python2.7') ||
          value.endsWith('php-fpm') ||
          value.endsWith('php')
        ) {
          return Promise.reject();
        }
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //进程全路径
  process_all_path: {
    equal: (_, value) => {
      if (value) {
        if (
          value.endsWith('bash') ||
          value.endsWith('java') ||
          value.endsWith('python') ||
          value.endsWith('python2') ||
          value.endsWith('python3') ||
          value.endsWith('python2.7') ||
          value.endsWith('php-fpm') ||
          value.endsWith('php')
        ) {
          return Promise.reject();
        }
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //主机执行命令
  sys_execute_command: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    prefix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    suffix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //web执行命令
  web_execute_command: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    prefix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    suffix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  // C类：192.168.0.0- 192.168.255.255

  // B类：172.16.0.0- 172.31.255.255

  // A类：10.0.0.0 - 10.255.255.255
  attack_ip: {
    equal: (_, value) => {
      if (value) {
        if (value.includes(':')) {
          const [ip, port] = value.split(':');
          if (ipReg.test(ip) && portReg.test(port)) {
            if (
              ipInRange(ip, '192.168.0.0', '192.168.255.255') ||
              ipInRange(ip, '172.16.0.0', '172.31.255.255') ||
              ipInRange(ip, '10.0.0.0', '10.255.255.255')
            ) {
              return Promise.reject();
            } else {
              return Promise.resolve();
            }
          } else {
            return Promise.reject();
          }
        } else if (ipReg.test(value)) {
          if (
            ipInRange(value, '192.168.0.0', '192.168.255.255') ||
            ipInRange(value, '172.16.0.0', '172.31.255.255') ||
            ipInRange(value, '10.0.0.0', '10.255.255.255')
          ) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    },
    belong: (_, value) => {
      if (value) {
        if (value.includes('-')) {
          const [ip1, ip2] = value.split('-');
          if (ipReg.test(ip1) && ipReg.test(ip2)) {
            if (
              ipInRange(ip1, '192.168.0.0', '192.168.255.255') ||
              ipInRange(ip1, '172.16.0.0', '172.31.255.255') ||
              ipInRange(ip1, '10.0.0.0', '10.255.255.255') ||
              ipInRange(ip2, '192.168.0.0', '192.168.255.255') ||
              ipInRange(ip2, '172.16.0.0', '172.31.255.255') ||
              ipInRange(ip2, '10.0.0.0', '10.255.255.255')
            ) {
              return Promise.reject();
            } else {
              return Promise.resolve();
            }
          } else {
            return Promise.reject();
          }
        } else if (ipDuan.test(value)) {
          const { startIP, endIP } = getCIDRRange(value);
          if (
            ipInRange(startIP, '192.168.0.0', '192.168.255.255') ||
            ipInRange(startIP, '172.16.0.0', '172.31.255.255') ||
            ipInRange(startIP, '10.0.0.0', '10.255.255.255') ||
            ipInRange(endIP, '192.168.0.0', '192.168.255.255') ||
            ipInRange(endIP, '172.16.0.0', '172.31.255.255') ||
            ipInRange(endIP, '10.0.0.0', '10.255.255.255')
          ) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  web_attack_ip: {
    equal: (_, value) => {
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
    },
    belong: (_, value) => {
      if (value) {
        if (value.includes('-')) {
          const [ip1, ip2] = value.split('-');
          if (ipReg.test(ip1) && ipReg.test(ip2)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } else if (ipDuan.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    },
  },

  sys_attack_ip: {
    equal: (_, value) => {
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
    },
    belong: (_, value) => {
      if (value) {
        if (value.includes('-')) {
          const [ip1, ip2] = value.split('-');
          if (ipReg.test(ip1) && ipReg.test(ip2)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } else if (ipDuan.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  extranet_ip: {
    equal: (_, value) => {
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
    },
    belong: (_, value) => {
      if (value) {
        if (value.includes('-')) {
          const [ip1, ip2] = value.split('-');
          if (ipReg.test(ip1) && ipReg.test(ip2)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } else if (ipDuan.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  xff_ip: {
    equal: (_, value) => {
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
    },
    belong: (_, value) => {
      if (value) {
        if (value.includes('-')) {
          const [ip1, ip2] = value.split('-');
          if (ipReg.test(ip1) && ipReg.test(ip2)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        } else if (ipDuan.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //路径包含通用
  pathContain: (_, value) => {
    if (value) {
      if (bytesLength(value) > 2048) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  },
  //url路径
  url_path: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    prefix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    suffix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //Referer
  referer: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    prefix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    suffix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //XML外部实体内容
  xml: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //SSRF请求
  ssrf: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    prefix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    suffix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //访问文件全路径
  access_file_path: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //上传文件名
  upload_file_name: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //请求类名
  request_class_name: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //SO文件全路径
  so_file_path: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //执行文件全路径
  execute_file_path: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (pathReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //内存组件类名
  mem_class: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //计划任务
  contab: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //内核模块名
  kernel_moudle: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
  //DNSLog域名
  dnslog: {
    equal: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          if (domainReg.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
    contain: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    prefix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    suffix: (_, value) => {
      if (value) {
        if (bytesLength(value) > 255) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    },
    reg: (_, value) => {
      if (value) {
        if (bytesLength(value) > 2048) {
          return Promise.reject();
        } else {
          if (countCharOccurrences(value, '*') > 1) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        }
      } else {
        return Promise.resolve();
      }
    },
  },
};
//md5
export const validateAttrbuite = (attr, ruleStr) => {
  return attrRegs[attr][ruleStr];
};
