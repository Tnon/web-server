/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-10-30 19:12:33
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import protectStatus from '@/components/attack-risk-cmts/protect-status';
import { comLevel } from '@/components/attack-risk-cmts/com-level';
import hostIp from '@/components/host-ip';
import { HANDLESTATUS, HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
import { userInfo } from '@/components/userInfo';
import peopleResult from './cmts/peopleResult';
import currentPolicy from './cmts/currentPolicy';
import handleGroup from './cmts/handleGroup';
import { getEventList } from './cmts/handleTBW';

export const useColumns = (
  handleType: HANDLETYPE,
  reload: Function,
  isCheck: any,
  T,
  fromAsset?: boolean,
): TableColumn[] => {
  const colums: TableColumn[] = [
    {
      title: T('arcomn.protStatus'),
      dataIndex: 'handled',
      sorter: true,
      width: 150,
      customRender: ({ record }) => createVNode(protectStatus, { type: record.handled }),
    },
    {
      title: T('arcomn.level'),
      dataIndex: 'level',
      sorter: true,
      width: 100,
      customRender: ({ record }) => createVNode(comLevel, { level: record.level }),
    },
    {
      title: T('arcomn.attackType'),
      dataIndex: 'dtype',
      width: 180,
      sorter: true,
      customRender: ({ record }) =>
        createVNode('span', { class: 'attRskType', title: record.dtypename }, record.dtypename),
    },

    {
      title: T('arcomn.impactHost'),
      dataIndex: 'ip',
      width: 200,
      sorter: true,
      hidden: fromAsset,
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
      title: T('common.group'), // 分组
      dataIndex: 'group_name',
      hidden: fromAsset,
      width: 200,
    },
    {
      title: T('arcomn.attackSrc'), //攻击源
      dataIndex: 'risksrc',
      width: 150,
      sorter: true,
    },
    {
      title: T('arcomn.attChar'), //攻击特征
      dataIndex: 'description',
      width: 500,
    },
    {
      title: T('arcomn.attackCount'), // 攻击次数
      dataIndex: 'reccount',
      width: 150,
    },
    {
      title: T('arcomn.disTimeCus'), //客户端发现时间
      dataIndex: 'event_at',
      width: 200,
      sorter: true,
    },
    {
      title: T('arcomn.repoTime'), //服务端上报时间
      dataIndex: 'update_at',
      width: 200,
      sorter: true,
    },
    {
      title: T('arcomn.lastgj'), //最新告警处理
      dataIndex: 'handle_user',
      width: 200,
      hidden: handleType === HANDLETYPE.UNHANDLE,
      customRender: ({ record }) =>
        createVNode(userInfo, {
          email: record.handle_at,
          avatar: record.head_image,
          name: record.handle_user,
        }),
    },
    {
      title: T('arcomn.lastwx'), //最新威胁处置
      dataIndex: 'dispose_user',
      width: 200,
      customRender: ({ record }) =>
        createVNode(userInfo, {
          email: record.dispose_at,
          avatar: record.head_image,
          name: record.dispose_user,
        }),
    },
    {
      title: T('arcomn.rhresu'), //人工处置结果
      dataIndex: 'dispose_result',
      width: 200,
      customRender: ({ text, record }) =>
        createVNode(peopleResult, {
          result: text ? ~~text : 0,
          proc_fail_reason: record.proc_fail_reason ?? {},
        }),
    },
    {
      title: T('arcomn.cuspol'), //当前处置策略
      dataIndex: 'policy_status',
      width: 200,
      customRender: ({ text }) =>
        text
          ? createVNode(currentPolicy, {
              polices: text,
            })
          : '-',
    },
    {
      title: T('arcomn.gjcl'), //告警处理
      dataIndex: 'action1',
      fixed: 'right',
      width: 300,
      hidden: isCheck,
      customRender: ({ record }) =>
        createVNode(handleGroup, {
          handleType,
          reload,
          id: record.id,
          selectedKeys: MODELTYPE.ATTACKPATH,
          modelType: MODELTYPE.ATTACK,
          handled: record.handled,
        }),
    },
    {
      title: T('arcomn.wxcz'), //威胁处置
      dataIndex: 'action2',
      fixed: 'right',
      width: 100,
      actions: [
        {
          type: 'icon',
          disabled: (record) => record.handled === HANDLESTATUS.GUIDANG,
          actionList: getEventList(T, MODELTYPE.ATTACK),
        },
      ],
    },
  ];
  return colums;
};
