/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-17 20:02:08
 * @LastEditTime: 2023-10-26 20:10:03
 */
import { userInfo } from '@/components/userInfo';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import attrRuleValue from '@/views/strategy/common/cmts/tableColumns/attrRuleValue';
import hostGroupTable from '@/views/strategy/common/cmts/tableColumns/hostGroupTable';
import attackAcdr from '@/views/strategy/common/cmts/tableColumns/attackAcdr';
import { E_WB_Enum } from '../common/types';
import { useModal } from '@/hooks/use-modal';
import { delWbPolicy, editWlist, getWbListDetai } from '@/api/strategy/white';
import handleWhite from '@/components/handle-dymic-form/handleWhite';
export const useColumns = (T): TableColumn[] => {
  const colums: TableColumn[] = [
    {
      title: T('strategy.ruleid'), // 规则id
      dataIndex: 'id',
      width: 100,
    },
    {
      title: T('strategy.ruletp'), // 规则类型
      dataIndex: 'rule_type',
      width: 120,
      customRender: ({ text }) => (text === 1 ? T('arcomn.singrule') : T('arcomn.zuhrule')),
    },
    {
      title: T('strategy.attr'), //属性
      dataIndex: 'rules_detail',
      width: 200,
      customRender: ({ text }) =>
        createVNode(attrRuleValue, {
          attrRuleValue: text,
          column: 'attr',
        }),
    },
    {
      title: T('strategy.rule'), // 规则
      dataIndex: 'rules_detail',
      width: 100,
      customRender: ({ text }) =>
        createVNode(attrRuleValue, {
          attrRuleValue: text,
          column: 'rule',
        }),
    },
    {
      title: T('strategy.attrvalue'), //属性值
      dataIndex: 'rules_detail',
      width: 250,
      customRender: ({ text }) =>
        createVNode(attrRuleValue, {
          attrRuleValue: text,
          column: 'value',
        }),
    },
    {
      title: T('strategy.attktpe'), //攻击类型
      dataIndex: 'attack',
      width: 300,
    },
    {
      title: T('strategy.polAppGroup'), //应用分组
      dataIndex: 'groups',
      width: 200,
      customRender: ({ text }) => createVNode(hostGroupTable, { groups: text }),
    },

    {
      title: T('strategy.glgj'), //关联告警
      dataIndex: 'alarm_num',
      width: 100,
      customRender: ({ record, text }) =>
        createVNode(attackAcdr, {
          routerName: 'attack',
          policy_type: E_WB_Enum.White,
          count: text,
          id: record.id,
        }),
    },
    {
      title: T('strategy.glsj'), //关联事件
      dataIndex: 'event_num',
      width: 100,
      customRender: ({ record, text }) =>
        createVNode(attackAcdr, {
          routerName: 'acdr',
          policy_type: E_WB_Enum.White,
          count: text,
          id: record.id,
        }),
    },
    {
      title: T('strategy.cjrsj'), //创建人/时间
      dataIndex: 'create_time',
      width: 200,
      customRender: ({ record }) =>
        createVNode(userInfo, {
          email: record.create_time,
          avatar: record.create_user.avatar,
          name: record.create_user.name,
        }),
    },
    {
      title: T('strategy.rbgesj'), //最新规则内容变更人/时间
      dataIndex: 'update_content_time',
      width: 200,
      customRender: ({ record }) =>
        createVNode(userInfo, {
          email: record.update_content_time,
          avatar: record.update_content_user.avatar,
          name: record.update_content_user.name,
        }),
    },
    {
      title: T('strategy.rujflssh'), //最新应用分组变更人/时间
      dataIndex: 'update_group_time',
      width: 200,
      customRender: ({ record }) =>
        createVNode(userInfo, {
          email: record.update_group_time,
          avatar: record.update_group_user.avatar,
          name: record.update_group_user.name,
        }),
    },
    {
      title: T('strategy.makr'), //备注
      dataIndex: 'remarks',
      width: 200,
    },
    {
      title: T('common.action'), //操作
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      actions: [
        {
          type: 'groups',
          actionList: [
            {
              text: T('common.edit'),
              func: async ({ record }, callback) => {
                const { id, remarks, attack, group, rule_type, rules_detail } =
                  await getWbListDetai({
                    id: record.id!,
                    policy_type: E_WB_Enum.White,
                  });
                useModal(
                  {
                    title: T('common.edit'),
                    width: 800,
                    contentProps: {
                      title: T('common.edit'),
                      record: {},
                      modelType: 0,
                      formStateRes: {
                        id,
                        remarks,
                        attack,
                        group,
                        rule_type,
                        rules_detail: [rules_detail],
                      },
                    },
                    handleOk: async (contRef) => {
                      await contRef.validate();
                      await editWlist(contRef.formState);
                      callback();
                    },
                    wrapClassName: 'noheadModal',
                  },
                  handleWhite,
                );
              },
            },
            {
              text: T('common.delete'),
              func: ({ record }, callback) => {
                useModal(
                  {
                    title: T('strategy.deleteStra'),
                    handleOk: async () => {
                      await delWbPolicy({ id_list: record.id + '', policy_type: E_WB_Enum.White });
                      callback!();
                    },
                  },
                  createVNode('span', null, T('strategy.delwblaps')),
                );
              },
            },
          ],
        },
      ],
    },
  ];
  return colums;
};
