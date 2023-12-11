/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-11-10 11:18:20
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode, ref, unref } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';
import logAction from './cmts/logAction';
import { selfDete } from './cmts/selfDete';
import { useModal, useValidatePwd } from '@/hooks';
import { pwdConfirm } from '@/components/pwdConfirm';
import pwdConfirmDriver from '@/components/pwdConfirmDriver';

import {
  singlgUninstallAgent,
  singlgClearRecAgent,
  getErrAgentIps,
  setHostCpuMem,
  resetAgentApi,
  driverSwitch,
} from '@/api/operation/run';
import AgentCrash from '../../components/agentCrash';
import { E_Operation_Type, ONLINESTATUS } from '@/enums/assetsType';
import cpuMemFlag from './cmts/cpuMemFlag';
import { DRIVERRUNING } from '@/enums/pstatus';
import { E_CrashType } from '../../components/agentCrash/type';
// import systemInfo from '@/components/systemInfo';
import showIp from './cmts/showIp';
import { E_Show_Ip } from './cmts/showIp/type';
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
    title: t('operation.belGrp'),
    dataIndex: 'group_kv_path',
    sorter: true,
    width: 150,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    title: t('common.agentVersion'),
    dataIndex: 'agent_version',
    sorter: true,
    width: 150,
  },
  {
    title: t('ngav.legendrunstatus'),
    dataIndex: 'agent_status',
    sorter: true,
    width: 100,
    customRender: ({ record, text }) =>
      createVNode(selfDete, {
        host_id: record.host_id,
        self_verify: text,
        run_status: record.agent_show_status,
      }),
  },
  {
    title: t('operation.abnrec'),
    dataIndex: 'crash_status',
    sorter: true,
    width: 150,
    customRender: ({ text }) => createVNode(AgentCrash, { crashStatus: text }),
  },
  {
    title: t('operation.agentRtm'),
    dataIndex: 'online_at',
    sorter: true,
    width: 150,
  },
  {
    dataIndex: 'showip',
    width: 200,
    customRender: ({ record }) =>
      createVNode(showIp, {
        show_ip: { label: '自定义IP', id: E_Show_Ip.Init, c_id: 1 },
        host_id: record.host_id,
      }),
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
    width: 250,
    // customRender: ({ record }) => createVNode(actionBtns, { record, reload }),
    actions: [
      {
        type: 'groups',
        actionList: [
          {
            text: t('setting.resABtn'),
            disabled: (record) => record.online === ONLINESTATUS.OFFLINE,
            tooltip: t('operation.offhostmsg'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.suruinsrst'),
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      resetAgentApi,
                      { host_id: record.host_id },
                      contRef,
                      callback,
                      true,
                    );
                  },
                },
                pwdConfirm,
              );
            },
          },
          {
            text: t('setting.disDri'),
            disabled: (record) => !record.stop_driver_display,
            tooltip: (record) =>
              record.online === ONLINESTATUS.OFFLINE
                ? t('operation.drioff')
                : t('operation.drierr'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.surbatSto'),
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      driverSwitch,
                      {
                        host_id: record.host_id!,
                        status: DRIVERRUNING.STOP,
                        type: contRef.type,
                      },
                      contRef,
                      callback,
                      true,
                    );
                  },
                },
                pwdConfirmDriver,
              );
            },
          },
          {
            text: t('setting.enaDri'),
            disabled: (record) => !record.start_driver_display,
            tooltip: (record) =>
              record.online === ONLINESTATUS.OFFLINE
                ? t('operation.dirsdf')
                : t('operation.drierron'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.surbatStr'),
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      driverSwitch,
                      {
                        host_id: record.host_id!,
                        status: DRIVERRUNING.RUNING,
                        type: contRef.type,
                      },
                      contRef,
                      callback,
                      true,
                    );
                  },
                },
                pwdConfirmDriver,
              );
            },
          },
          {
            text: t('asset.more'),
            type: 'moreActions',
            actionList: [
              //清除异常记录
              {
                text: t('operation.clearer'),
                disabled: (record) => record.crash_status.type === E_CrashType.Normal,
                tooltip: t('operation.cleare'),
                func: ({ record }) => {
                  useModal(
                    {
                      title: t('operation.clearertit'),
                      handleOk: async (contRef) => {
                        await contRef.validate();
                        return useValidatePwd(
                          singlgClearRecAgent,
                          { filter: {}, include: record.host_id, exclude: '' },
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
              //收集日志
              {
                isVnode: true,
                text: (record) =>
                  createVNode(logAction, { online: record.online, host_id: record.host_id }),
              },
              //设置使用上限
              {
                text: t('operation.setcpumemu'),
                disabled: (record) => record.online !== ONLINESTATUS.ONLINE,
                tooltip: t('operation.setcpumsg'),
                func: async ({ record }) => {
                  useModal(
                    {
                      title: t('operation.setcpumemu'),
                      contentProps: {
                        cpu: record.agent_limit.cpu_limit,
                        memory: record.agent_limit.memory_limit,
                      },
                      handleOk: async (contRef) => {
                        await contRef.validate();
                        const { code } = await setHostCpuMem({
                          cpu: contRef.cpu,
                          memory: contRef.memory,
                          include: record.host_id,
                          filter: {},
                          exclude: '',
                        });
                        if (code) {
                          return Promise.reject();
                        } else {
                          reload();
                        }
                      },
                    },
                    cpuMemFlag,
                  );
                },
              },
              //卸载Agent
              {
                text: t('operation.unisagent'),
                tooltip: t('operation.unisgmsg'),
                disabled: (record) => record.online !== ONLINESTATUS.ONLINE,
                func: async ({ record }) => {
                  const errIps = ref([]);
                  const { code, items } = await getErrAgentIps({
                    filter: {},
                    include: record.host_id,
                    exclude: '',
                    type: E_Operation_Type.AGENT,
                  });
                  if (!code) {
                    errIps.value = items ?? [];
                  }
                  useModal(
                    {
                      title: t('operation.unisagenttit'),
                      contentProps: {
                        labelText: unref(errIps).length
                          ? t('operation.unsgtips')
                          : t('operation.agttips'),
                      },
                      handleOk: async (contRef) => {
                        await contRef.validate();
                        return useValidatePwd(
                          singlgUninstallAgent,
                          {
                            filter: {},
                            include: record.host_id,
                            exclude: '',
                          },
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
    ],
  },
];
