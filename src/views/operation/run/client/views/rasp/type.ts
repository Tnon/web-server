/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-08-05 19:32:48
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';
import injectStatus from './cmts/injectStatus';
import viewPPidDetail from './cmts/ppidDetail';
import { useModal, useValidatePwd } from '@/hooks';
import { pwdConfirm } from '@/components/pwdConfirm';
import { singlgInjectRasp, singlgUninstallRasp } from '@/api/operation/run';
import progressCmd from './cmts/progressCmd';
export const useColumns = (t, reload): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'ip',
    width: 200,
    sorter: true,
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
    title: t('operation.ijtStu'),
    dataIndex: 'show_status',
    sorter: true,
    customRender: ({ text, record }) =>
      createVNode(injectStatus, { type: text, failure_reason: record.failure_reason }),
  },
  {
    title: t('operation.belGrp'),
    dataIndex: 'group_kv_path',
    sorter: true,
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    title: t('operation.midwver'),
    dataIndex: 'middleware_version',
    sorter: true,
  },
  {
    title: t('operation.jdkphpver'),
    dataIndex: 'application_version',
    sorter: true,
  },
  {
    title: t('operation.pprtype'),
    dataIndex: 'process_name',
    sorter: true,
    customRender: ({ text }) =>
      createVNode(progressCmd, {
        text,
      }),
  },

  {
    title: 'PID',
    dataIndex: 'pid',
    sorter: true,
  },
  {
    title: t('operation.ppid'),
    dataIndex: 'pids_prefix',
    sorter: true,
    customRender: ({ text, record }) => createVNode(viewPPidDetail, { ppidArr: text, record }),
  },
  {
    title: t('operation.injtime'),
    dataIndex: 'injection_time',
    sorter: true,
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: t('operation.reinjec'),
            disabled: (record) => !record.enable_injection,
            func: ({ record }) => {
              useModal(
                {
                  title: t('operation.reinjtit'),
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      singlgInjectRasp,
                      { id: record.id },
                      contRef,
                      reload,
                      true,
                    );
                  },
                },
                pwdConfirm,
              );
            },
          },
          {
            text: t('operation.unirej'),
            disabled: (record) => !record.enable_uninstall,
            func: ({ record }) => {
              useModal(
                {
                  title: t('operation.runnjtit'),
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      singlgUninstallRasp,
                      { id: record.id },
                      contRef,
                      reload,
                      true,
                    );
                  },
                },
                pwdConfirm,
              );
            },
          },
        ],
      },
    ],
  },
];
