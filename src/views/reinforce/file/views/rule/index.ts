/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-26 20:08:28
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
import { E_File_Action, E_File_Protect } from '../ruleForm/cmts/form/type';
import { E_Enabled, E_Rule_Type } from './type';
import { delBlRule, switchRule } from '@/api/reinforce';
import ruleDetail from '../../cmts/ruleDetail';
import { useUserToken } from '@/store/modules/user';
import { pwdConfirm } from '@/components/pwdConfirm';
const userTokenStore = useUserToken();
const userType = computed(() => userTokenStore.userInfo.u_type!);
const getProbesResult = (t, probes: { type: E_File_Action; value: E_File_Protect }[]) => {
  return probes.map((ele) => {
    let preStr = '',
      sufStr = '';
    if (ele.value === E_File_Protect.Inject) {
      preStr = t('reinforce.lj');
    } else if (ele.value === E_File_Protect.Report) {
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
    width: 150,
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
                await switchRule({
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
    title: t('reinforce.jkwjcz'), //监控文件操作
    dataIndex: 'probes',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        title: t('reinforce.jkwjcz'),
        showItems: getProbesResult(t, text),
      }),
  },
  {
    title: t('ngav.filepat'), //文件路径
    dataIndex: 'file_path',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(countModal, {
        title: t('ngav.filepat'),
        showItems: [...(text ?? []), ...(record.dir_path ?? [])],
      }),
  },
  {
    title: t('reinforce.hljc'), //忽略进程
    dataIndex: 'proc_exclude',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        title: t('reinforce.hljc'),
        showItems: text,
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
                title: t('reinforce.gzjkqk', [text]),
                wrapClassName: 'noheadModal',
                contentProps: {
                  title: t('reinforce.gzjkqk', [text]),
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
              useModal(
                {
                  title: t('reinforce.rulede'),
                  wrapClassName: 'noheadModal',
                  footer: false,
                  width: 800,
                  contentProps: {
                    id: record.id,
                    rule_type: record.rule_type,
                  },
                },
                ruleDetail,
              );
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
                      delBlRule,
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
