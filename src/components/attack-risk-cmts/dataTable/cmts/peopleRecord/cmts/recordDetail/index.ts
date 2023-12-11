/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 10:04:04
 * @LastEditTime: 2023-02-03 11:03:45
 */
import hostIp from '@/components/host-ip';
import { userInfo } from '@/components/userInfo';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import recordDetail from './index.vue';
import handleRoute, { E_auto_intercept } from './cmts/handleRoute';
import peopleResult from '../../../peopleResult';

export const useColumns = (T): TableColumn[] => [
  {
    title: T('arcomn.czr'), // 处置人
    width: 200,
    dataIndex: 'dispose_user',
    customRender: ({ record }) =>
      createVNode(userInfo, {
        email: record.create_at,
        avatar: record.head_image,
        name: record.dispose_user,
      }),
  },
  {
    title: T('arcomn.wxlx'), // 威胁类型
    width: 200,
    dataIndex: 'risk_type',
  },
  {
    title: T('common.hostIp'),
    dataIndex: 'ip',
    width: 200,
    sorter: true,
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.mac,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
      }),
  },
  {
    title: T('arcomn.czfs'), // 处置方式
    width: 200,
    dataIndex: 'dispose_type',
  },
  {
    title: T('arcomn.cznr'), // 处置内容
    width: 200,
    dataIndex: 'dispose_content',
  },
  {
    title: T('arcomn.czjg'), // 处置结果
    width: 200,
    dataIndex: 'result',
    customRender: ({ text, record }) =>
      createVNode(peopleResult, {
        result: text ? ~~text : 0,
        proc_fail_reason: record.proc_fail_reason,
      }),
  },
  {
    title: T('arcomn.hxzdcnz'), // 后续自动处置
    width: 200,
    dataIndex: 'auto_intercept',
    customRender: ({ text }) =>
      createVNode('span', null, text === E_auto_intercept.NO ? T('report.no') : T('report.is')),
  },
  {
    title: T('arcomn.disTime'), // 发现时间
    width: 200,
    dataIndex: 'first_at',
  },
  {
    title: T('arcomn.czsj'), // 处置时间
    width: 200,
    dataIndex: 'create_at',
  },

  {
    title: T('arcomn.piz'), // 批注
    width: 200,
    dataIndex: 'note',
  },
  {
    title: T('common.action'),
    width: 200,
    dataIndex: 'action',
    customRender: ({ record }) =>
      createVNode(handleRoute, {
        dispose_content: record.dispose_content,
        auto_intercept: record.auto_intercept,
      }),
  },
];
export default recordDetail;
