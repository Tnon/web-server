/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-12 18:24:28
 * @LastEditTime: 2023-10-30 19:13:36
 */
import ngavPage from './index.vue';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import eventType from '@/views/ngav/cmts/tableColumns/eventType';
import eventInfo from '@/views/ngav/cmts/tableColumns/eventInfo';
import attackPath from '@/views/ngav/cmts/tableColumns/attackPath';
import { HANDLESTATUS, HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
import { userInfo } from '@/components/userInfo';
import peopleResult from '@/components/attack-risk-cmts/dataTable/cmts/peopleResult';
import currentPolicy from '@/components/attack-risk-cmts/dataTable/cmts/currentPolicy';
import handleGroup from '@/components/attack-risk-cmts/dataTable/cmts/handleGroup';
import { getEventList } from '@/components/attack-risk-cmts/dataTable/cmts/handleTBW';

export const useColumns = (
  handleType: HANDLETYPE,
  reload: Function,
  isCheck: any,
  T,
  fromAsset?: boolean,
): TableColumn[] => [
  {
    dataIndex: 'handled',
    width: 80,
    customRender: ({ text }) => createVNode(eventType, { handled: text }),
  },
  {
    dataIndex: 'rule_name',
    width: 250,
    customRender: ({ record }) =>
      createVNode(eventInfo, {
        score: record.score,
        root_name: record.root_name,
        rule_name: record.rule_name,
        event_at: record.event_at,
        level: record.level,
      }),
  },
  {
    dataIndex: 'ip',
    width: 250,
    hidden: fromAsset,
    customRender: ({ record }) =>
      createVNode(hostIp, {
        ip: record.ip,
        host_id: record.host_id,
        os: record.os || record.osver,
        online: record.online,
        hostname: record.hostname,
        //数组最后一项的name
        groupname:
          record.group_kv_path && record.group_kv_path.length
            ? record.group_kv_path[record.group_kv_path.length - 1].name
            : '',
      }),
  },
  {
    dataIndex: 'act_map_list',
    width: 800,
    customRender: ({ text, record }) =>
      createVNode(attackPath, {
        selectOptions: text || [],
        level: record.level,
        record,
      }),
  },

  {
    title: T('arcomn.lastsj'), //最新事件处理
    dataIndex: 'handle_at',
    width: 200,
    hidden: handleType === HANDLETYPE.UNHANDLE,
    customRender: ({ record }) =>
      createVNode(userInfo, {
        email: record.handle_at,
        avatar: record.head_image,
        name: record.handle_user,
        hasHeader: T('arcomn.lastgj'),
      }),
  },
  {
    title: T('arcomn.lastwx'), //最新威胁处置
    dataIndex: 'dispose_at',
    width: 200,
    customRender: ({ record }) =>
      createVNode(userInfo, {
        email: record.dispose_at,
        avatar: record.head_image,
        name: record.dispose_user,
        hasHeader: T('arcomn.lastwx'),
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
        hasHeader: T('arcomn.rhresu'),
      }),
  },
  {
    title: T('arcomn.cuspol'), //当前处置策略
    dataIndex: 'policy_status',
    width: 200,
    customRender: ({ text }) =>
      createVNode(currentPolicy, {
        polices: text,
        hasHeader: T('arcomn.cuspol'),
      }),
  },
  {
    title: T('arcomn.gjcl'), //告警处理
    dataIndex: 'action1',
    fixed: 'right',
    hidden: isCheck,
    customRender: ({ record }) =>
      createVNode(handleGroup, {
        handleType,
        reload,
        id: record.id,
        direction: true,
        selectedKeys: MODELTYPE.NGAVPATH,
        modelType: MODELTYPE.NGAV,
        handled: record.handled,
      }),
    width: 150,
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
        actionList: getEventList(T, MODELTYPE.NGAV),
      },
    ],
  },
];

export default ngavPage;
