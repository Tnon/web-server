/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-26 20:07:53
 */
import { comLevel } from '@/components/attack-risk-cmts/com-level';
import buttonGroups from '@/components/buttonGroups';
import countModal from '@/components/countModal';
import { useModal, useValidatePwd } from '@/hooks';
// import router from '@/router';
import { USERTOKEN } from '@/store/modules/user/type';
import { TableColumn } from '@/types/tableColumn';
import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
import { computed, createVNode } from 'vue';
import ruleMonitor from '../../cmts/ruleMonitor';
import { getFileActionName } from '../ruleForm/cmts/fileActions';
import { E_File_Action, E_File_Mode } from '../ruleForm/cmts/form/type';
import { E_Bait_Mode, E_Enabled, E_Rule_Type } from './type';
import { delBlRuleDf, switchRuleDf } from '@/api/reinforce';
import { useUserToken } from '@/store/modules/user';
import { pwdConfirm } from '@/components/pwdConfirm';
import router from '@/router';
const userTokenStore = useUserToken();
const userType = computed(() => userTokenStore.userInfo.u_type!);
const getProbesResult = (t, probes: { type: E_File_Action; value: E_File_Mode }[]) => {
  return probes?.map((ele) => {
    let preStr = '',
      sufStr = '';
    if (ele.value === E_File_Mode.Monitor) {
      preStr = t('reinforce.jk');
    } else {
      preStr = t('reinforce.bjk');
    }

    sufStr = getFileActionName(ele.type, t);
    return preStr + sufStr;
  });
};

export const useColumns = (t: any, refreshTable): TableColumn[] => [
  {
    title: t('reinforce.tqy'), //停用 启用
    dataIndex: 'enabled',
    width: 100,
    actions: [
      {
        type: 'switch',
        checked: (record) => record.enabled === 1,
        disabled: () =>
          userType.value !== (USERTOKEN.admin as any) &&
          userType.value !== (USERTOKEN.super as any),
        func: async ({ record }, callback) => {
          useModal(
            {
              title:
                record.enabled === E_Enabled.Open ? t('reinforce.stoRu') : t('reinforce.staRu'),
              handleOk: async () => {
                await switchRuleDf({
                  filter: {},
                  is_all: false,
                  id_list: [record.id],
                  switch: record.enabled === E_Enabled.Open ? E_Enabled.Close : E_Enabled.Open,
                });
                callback(true);
              },
            },
            createVNode('span'),
          );
        },
      },
    ],
  },
  {
    title: t('reinforce.jgrna'), //规则名称
    dataIndex: 'rule_name',
    width: 150,
  },
  {
    title: t('strategy.ruletp'), //规则类型
    dataIndex: 'rule_type',
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        null,
        text === E_Rule_Type.Preset ? t('reinforce.rzgz') : t('reinforce.csurule'),
      ),
  },
  {
    title: t('reinforce.gjdj'), //告警等级
    dataIndex: 'alarm_level',
    width: 100,
    customRender: ({ text }) => createVNode(comLevel, { level: text }),
  },

  {
    title: t('arcomn.file_dir'), //文件目录
    dataIndex: 'file_path',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(countModal, {
        title: t('arcomn.file_dir'),
        showItems: [...(text ?? []), ...(record.dir_path ?? [])],
      }),
  },
  {
    title: t('reinforce.wjcaz'), //文件操作
    dataIndex: 'probes',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        title: t('reinforce.wjcaz'),
        showItems: getProbesResult(t, text),
      }),
  },

  {
    title: t('reinforce.zjfw'), //主机范围
    dataIndex: 'apply_type',
    width: 200,
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
      }),
  },
  {
    title: t('reinforce.jkms'), //监控模式
    dataIndex: 'monitor_mod',
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        {
          style: {
            background: 'rgba(24, 186, 121, 0.1)',
            padding: '4px 8px',
            color: '#18BA79',
            borderRadius: '6px',
          },
        },
        text === E_Bait_Mode.JSB
          ? t('reinforce.jsb')
          : text === E_Bait_Mode.AUTO
          ? t('arcomn.autohandle')
          : t('reinforce.jsb'),
      ),
  },
  {
    title: t('reinforce.jkzt'), //监控状态
    dataIndex: 'rule_name',
    width: 200,
    customRender: ({ text, record }) =>
      createVNode(
        'span',
        {
          style: { color: '#18BA79', cursor: 'pointer' },
          onClick: () => {
            useModal(
              {
                title: t('reinforce.gzjkqkaa', [text]),
                wrapClassName: 'noheadModal',
                contentProps: {
                  title: t('reinforce.gzjkqkaa', [text]),
                  rule_id: record.id,
                },
                width: 1100,
                footer: false,
              },
              ruleMonitor,
            );
          },
        },
        record.monitor_count + ' / ' + record.monitor_total,
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
              router.push({
                name: 'reinforce-layout-bait-form',
                query: { id: record.id, rule_type: record.rule_type },
              });
            },
          },

          {
            text: t('common.delete'),
            disabled: record.rule_type === E_Rule_Type.Preset,
            permission: {
              name: 'baseLineRuleAdd',
              showUsers: [USERTOKEN.admin, USERTOKEN.super],
            },
            callback: async () => {
              //删除确认
              useModal(
                {
                  title: t('reinforce.actiondelete'),
                  contentProps: {
                    labelText: t('reinforce.delrwwsuba'),
                  },
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    return useValidatePwd(
                      delBlRuleDf,
                      {
                        is_all: false,
                        filter: {},
                        id_list: [record.id],
                      },
                      conRef,
                      refreshTable,
                    );
                  },
                },
                pwdConfirm,
              );
            },
          },
        ],
      }),
  },
];
