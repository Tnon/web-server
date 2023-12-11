/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-11-01 13:47:25
 */
import { batchHandlePatch } from '@/api/reinforce';
import buttonGroups from '@/components/buttonGroups';
import hostIp from '@/components/host-ip';
import { useModal } from '@/hooks';
import useCreatDraw from '@/hooks/use-click-row';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import ruleDrawer from '../ruleDrawer';
import tableContent from './index.vue';
import { E_Handle_Status, HandleType } from './type';
import loopCodeDetail from './cmts/loopCodeDetail';

export const useColumns = (t: any, refreshTable, handle_type): TableColumn[] => [
  {
    title: t('arcomn.protStatus'),
    dataIndex: 'risk_status',
    sorter: true,
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        {
          style: {
            color: '#fff',
            background: '#18BA79',
            padding: '2px 8px',
          },
        },
        text === E_Handle_Status.SBao ? t('arcomn.SBAOStatus') : t('arcomn.LANJIEStatus'),
      ),
  },
  {
    title: t('reinforce.virpatch'),
    dataIndex: 'sid',
    width: 150,
  },
  {
    title: t('reinforce.lyld'),
    dataIndex: 'cve_code',
    width: 150,
    customRender: ({ record }) =>
      createVNode(loopCodeDetail, {
        showTitle: record.cve_code,
        drawTitle: record.vul_name,
        record: {
          vul_id: record.vul_id,
        },
      }),
  },
  {
    title: t('reinforce.ldyx'),
    dataIndex: 'vul_desc',
    width: 150,
  },
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
    title: t('arcomn.attackSrc'), //
    dataIndex: 'attack_src',
    width: 150,
  },

  {
    title: t('arcomn.attackCount'), //
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
                    record: {
                      id: record.id,
                      handle: handle_type,
                      level: record.risk_level,
                      desc: record.desc,
                      handled: record.risk_status,
                      vul_name: record.vul_name,
                      vul_desc: record.vul_desc,
                      vul_id: record.vul_id,
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
                    await batchHandlePatch({
                      filter: { handle: handle_type },
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
