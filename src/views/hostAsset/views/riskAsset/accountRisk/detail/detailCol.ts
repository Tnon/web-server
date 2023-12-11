/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-11 18:25:18
 * @LastEditTime: 2023-07-25 10:07:07
 */
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import { TableColumn } from '@/types/tableColumn';
import viewPwdDetail from '../cmts/viewPwdDetail';

export const getapi_columnsDetail = (type: string, T: any): TableColumn[] => {
  const api_columnsDetail: {
    [k: string]: TableColumn[];
  } = {
    weakpwdPro: [
      {
        title: T('asset.hostIp'), // 主机IP
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },

      {
        title: T('asset.description'), // 描述
        dataIndex: 'description',
        width: 150,
      },
      {
        title: T('asset.mmz'), // 密码值
        dataIndex: 'password', //待调试
        width: 150,
      },
      {
        title: 'UID', // UID
        dataIndex: 'user_id',
        width: 150,
      },
      {
        title: 'GID', // GID
        dataIndex: 'group_id',
        width: 150,
      },
      {
        title: T('asset.accStatus'), // 账号状态
        dataIndex: 'state',
        width: 150,
      },
      {
        title: T('asset.rootPower'), // 角色
        dataIndex: 'is_root',
        width: 150,
      },
      {
        title: 'Shell', // Shell
        dataIndex: 'shell',
        width: 150,
      },
      {
        title: T('asset.hitRule'), // 命中规则
        dataIndex: 'regex',
        width: 150,
      },
      {
        title: T('asset.lastedLoginTime'), // 最近登录时间
        dataIndex: 'last_login',
        width: 150,
      },
    ],
    weakpwdIp: [
      {
        title: T('asset.accountName'), // 账户名
        dataIndex: 'username',
        width: 150,
      },
      {
        title: T('asset.description'), // 描述
        dataIndex: 'description',
        width: 150,
      },
      {
        title: T('asset.mmz'), // 密码值
        dataIndex: 'password', //待调试
        width: 150,
      },
      {
        title: 'UID', // UID
        dataIndex: 'user_id',
        width: 150,
      },
      {
        title: 'GID', // GID
        dataIndex: 'group_id',
        width: 150,
      },
      {
        title: T('asset.accStatus'), // 账号状态
        dataIndex: 'state',
        width: 150,
      },
      {
        title: T('asset.rootPower'), // 角色
        dataIndex: 'is_root',
        width: 150,
      },
      {
        title: 'Shell', // Shell
        dataIndex: 'shell',
        width: 150,
      },
      {
        title: T('asset.hitRule'), // 命中规则
        dataIndex: 'hit_regex',
        width: 150,
      },
      {
        title: T('asset.lastedLoginTime'), // 最近登录时间
        dataIndex: 'last_login',
        width: 150,
      },
      // 对话框
      {
        title: T('asset.loginDetail'), // 登录历史详情
        dataIndex: 'ipDetail',
        width: 150,
        customRender: ({ record }) => createVNode(viewPwdDetail, { record }),
      },
    ],

    appweakpwdPro: [
      {
        title: T('asset.hostIp'), // 主机IP
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.accountname'), // 账号名
        dataIndex: 'user_name',
        width: 150,
      },
      {
        title: T('asset.mmz'), // 密码值
        dataIndex: 'password', //待调试
        width: 150,
      },
      {
        title: T('asset.hitRule'), // 命中规则
        dataIndex: 'weak_pwd_type',
        width: 150,
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 150,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'weak_pwd_scan_time',
        width: 150,
      },
    ],
    appweakpwdIp: [
      {
        title: T('asset.yingyong'), // 应用
        dataIndex: 'app_name',
        width: 150,
      },
      {
        title: T('asset.accountname'), // 账号名
        dataIndex: 'user_name',
        width: 150,
      },
      {
        title: T('asset.mmz'), // 密码值
        dataIndex: 'password', //待调试
        width: 150,
      },
      {
        title: T('asset.hitRule'), // 命中规则
        dataIndex: 'weak_pwd_type',
        width: 150,
      },
      {
        title: T('asset.fcfxsh'), // 首次发现时间
        dataIndex: 'initial_scan_time',
        width: 150,
      },
      {
        title: T('asset.zhfxsj'), // 最后更新时间
        dataIndex: 'weak_pwd_scan_time',
        width: 150,
      },
    ],
  };
  return api_columnsDetail[type];
};
