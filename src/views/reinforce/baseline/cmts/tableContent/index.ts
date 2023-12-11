/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 11:33:48
 * @LastEditTime: 2023-10-26 20:07:58
 */
import { userInfo } from '@/components/userInfo';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import taskName from './cmts/taskName';
import baselineRule from './cmts/baselineRule';
import passPercent from './cmts/passPercent';
import tableContent from './index.vue';
import effectHost from './cmts/effectHost';
import buttonGroups from '@/components/buttonGroups';
import router from '@/router';
import countModal from '@/components/countModal';
import { E_Host_Range } from './type';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('reinforce.rwmc'), //任务名称
    dataIndex: 'task_name',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(taskName, { name: text, task_id: record.task_id }),
  },
  {
    title: t('reinforce.rwcjs'), //任务创建人
    dataIndex: 'create_user',
    width: 200,
    customRender: ({ text }) =>
      createVNode(userInfo, {
        email: text?.email ?? '',
        avatar: text?.avatar ?? '',
        name: text?.name ?? '',
      }),
  },
  {
    title: t('reinforce.wucjsj'), //任务创建时间
    dataIndex: 'create_time',
    width: 200,
  },
  {
    title: t('reinforce.rule_count'), //基线规则
    dataIndex: 'rules',
    width: 200,
    customRender: ({ text, record }) =>
      text
        ? createVNode(baselineRule, {
            label: text[0]?.rule_name,
            title: text[0]?.rule_name,
            desc: text[0]?.rule_desc,
            session_id: record.session_id,
          })
        : '-',
  },
  {
    title: t('reinforce.jcx'), //检查项
    dataIndex: 'check_num',
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(baselineRule, {
        label: text + '',
        title: record.rules ? record.rules[0]?.rule_name : '-',
        desc: record.rules ? record.rules[0]?.rule_desc : '-',
        session_id: record.session_id,
      }),
  },
  {
    title: t('reinforce.tgl'), //通过率
    dataIndex: 'pass_percent',
    customHead: true,
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(passPercent, {
        percent: text + '',
        rule_code: record.rules ? record.rules[0]?.rule_code : '',
        id: record.session_id,
      }),
  },
  {
    title: t('reinforce.jcfw'), //检查范围
    dataIndex: 'scope',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(countModal, {
        showItems: record.objects ?? [],
        title: t('reinforce.jcfw'),
        label:
          text === E_Host_Range.Group
            ? t('operation.hostgn')
            : text === E_Host_Range.Host
            ? t('operation.hostn')
            : '',
        itemCallback: (ip) => {
          ip &&
            router.push({
              name: 'reinforce-layout-baseline-detail',
              query: Object.assign(
                {
                  id: record.session_id,
                  type: 'ip',
                  rule_code: record.rules ? record.rules[0]?.rule_code : '',
                },
                text === E_Host_Range.All
                  ? {}
                  : { [text === E_Host_Range.Host ? 'ip' : 'group']: ip },
              ),
            });
        },
      }),
  },
  {
    title: t('reinforce.fgzj'), //覆盖主机
    dataIndex: 'exec_host_num',
    width: 100,
    customRender: ({ record }) =>
      createVNode(effectHost, {
        effect: record.exec_host_num,
        total: record.total_host_num,
        id: record.session_id,
        rule_code: record.rules ? record.rules[0]?.rule_code : '',
      }),
  },
  {
    title: t('reinforce.wcsj'), //完成时间
    dataIndex: 'finish_time',
    width: 200,
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            disabled: !record.rules,
            callback: () => {
              record.rules &&
                router.push({
                  name: 'reinforce-layout-baseline-detail',
                  query: {
                    id: record.session_id,
                    type: 'check',
                    rule_code: record.rules ? record.rules[0]?.rule_code : '',
                  },
                });
            },
          },
        ],
      }),
  },
];
export default tableContent;
