/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-26 20:08:17
 */
import { getRuleChecks } from '@/api/reinforce';
import buttonGroups from '@/components/buttonGroups';
import { useModal } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import baseDetail from '../../cmts/tableContent/cmts/baseDetail';

export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('reinforce.rule_count'), //基线规则
    dataIndex: 'name',
    width: 150,
  },
  {
    title: t('reinforce.lcjr'), //来源创建人
    dataIndex: 'admin_id',
    width: 200,
    customRender: ({ text }) => createVNode('span', null, text?.name),
    // createVNode(userInfo, {
    //   email: text?.email ?? '',
    //   avatar: text?.avatar ?? '',
    //   name: text?.name ?? '',
    // }),
  },
  {
    title: t('asset.updDate'), //更新时间
    dataIndex: 'update_time',
    width: 150,
  },
  {
    title: t('strategy.ruletp'), //规则类型
    dataIndex: 'type',
    width: 150,
  },
  {
    title: t('reinforce.jcx'), //检查项
    dataIndex: 'check_num',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(
        'span',
        {
          style: {
            color: '#18BA79',
            cursor: 'pointer',
          },
          onClick: () => {
            useModal(
              {
                title: 'reinforce.jxtitle',
                footer: false,
                wrapClassName: 'noheadModal',
                width: 800,
                contentProps: {
                  title: record.name,
                  desc: record.rule_desc,
                  rule_code: record.rule_code,
                  tableApi: getRuleChecks,
                },
              },
              createVNode(baseDetail),
            );
          },
        },
        text,
      ),
  },

  {
    title: t('common.action'), //操作
    dataIndex: 'action',
    width: 200,
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            callback: () => {
              useModal(
                {
                  title: 'reinforce.jxtitle',
                  footer: false,
                  wrapClassName: 'noheadModal',
                  width: 800,
                  contentProps: {
                    title: record.name,
                    desc: record.rule_desc,
                    rule_code: record.rule_code,
                    tableApi: getRuleChecks,
                  },
                },
                createVNode(baseDetail),
              );
            },
          },
        ],
      }),
  },
];
