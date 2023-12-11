/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-26 20:08:20
 */
import { batchHandleFile } from '@/api/reinforce';
import buttonGroups from '@/components/buttonGroups';
import hostIp from '@/components/host-ip';
import { useModal } from '@/hooks';
import useCreatDraw from '@/hooks/use-click-row';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import ruleDrawer from '../ruleDrawer';
import fileAction from './cmts/fileAction';
import ruleModal from './cmts/ruleModal';
import tableContent from './index.vue';
import { E_Reinforce_Type, HandleType } from './type';

export const useColumns = (t: any, refreshTable, handle_type): TableColumn[] => [
  {
    title: t('arcomn.impactHost'),
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
    title: t('operation.hostg'), //主机组
    dataIndex: 'group_name',
    width: 150,
  },
  {
    title: t('ngav.filepat'), //文件路径
    dataIndex: 'file_path',
    width: 150,
  },
  {
    title: t('reinforce.wjcaz'), //文件操作
    dataIndex: 'op_type',
    width: 150,
    customRender: ({ text }) => createVNode(fileAction, { type: text }),
  },
  {
    title: t('reinforce.zxjc'), //执行进程
    dataIndex: 'process_name',
    width: 150,
  },
  {
    title: t('reinforce.cfgz'), //触发规则
    dataIndex: 'policy_name',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(ruleModal, {
        rule_name: text,
        policy_id: record.policy_id,
        policy_del: record.policy_del,
      }),
  },
  {
    title: t('reinforce.cfcs'), //触发次数
    dataIndex: 'reccount',
    width: 150,
  },
  {
    title: t('arcomn.event_atDraw'), //客户端发现时间
    dataIndex: 'event_at',
    width: 200,
  },
  {
    title: t('arcomn.repoTime'), //服务端发现时间
    dataIndex: 'next_at',
    width: 200,
  },
  {
    title: t('common.action'), //
    dataIndex: 'action',
    width: 200,
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            callback: () => {
              useCreatDraw(
                {
                  title: t('attack.detailTitle'),
                  contentProps: {
                    refreshTable,
                    // record: reactive({
                    //   id: '62853',
                    //   handle: 1,
                    //   handled: 5,
                    //   level: '2',
                    //   description: '告警特征内容',
                    // }),
                    record: {
                      id: record.id,
                      handle: handle_type,
                      level: record.level,
                      desc: record.desc,
                      handled: record.risk_status,
                    },
                  }, // content即drawDetail组件接收的props
                },
                ruleDrawer,
              );
            },
          },
          {
            text: handle_type === HandleType.HANDLED ? t('reinforce.handrw') : t('reinforce.handr'),
            callback: () => {
              useModal(
                {
                  title:
                    handle_type === HandleType.HANDLED
                      ? t('reinforce.handrw')
                      : t('reinforce.handr'),
                  wrapClassName: 'noheadModal',
                  handleOk: async () => {
                    await batchHandleFile({
                      filter: { handle: handle_type, risk_type: E_Reinforce_Type.File },
                      isall: false,
                      riskinfolist: [record.id],
                      set_handle:
                        handle_type === HandleType.HANDLED
                          ? HandleType.UNHANDLE
                          : HandleType.HANDLED,
                    });
                    refreshTable();
                  },
                },
                createVNode(
                  'div',
                  {
                    style: {
                      fontSize: '16px',
                      color: 'rgba(0, 0, 0, 0.8)',
                      fontWeight: 600,
                      padding: '24px',
                    },
                  },
                  handle_type === HandleType.HANDLED
                    ? t('reinforce.handrgg')
                    : t('reinforce.handrwgg'),
                ),
              );
            },
          },
        ],
      }),
  },
];

export const FTypes = [
  {
    type: HandleType.UNHANDLE,
    title: 'common.attrisUnhandle',
  },
  {
    type: HandleType.HANDLED,
    title: 'common.attrisHandled',
  },
];
export default tableContent;
