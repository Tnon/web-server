/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-06-29 14:28:39
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode, ref, unref } from 'vue';
import hostIp from '@/components/host-ip';
import treeGroup from '@/components/treeGroupNp';
import agentVersion from './cmts/agentVersion';
import driverVersion from './cmts/driverVersion';
import { useModal } from '@/hooks';
import { pwdConfirm } from '@/components/pwdConfirm';
import { useValidatePwd } from '@/hooks/use-validatepwd';
import { singleUpgradeAgent, singleUpgradeDriver } from '@/api/operation/upgrade';
import { E_Operation_Type, OSTYPE } from '@/enums/assetsType';
import systemInfo from '@/components/systemInfo';
import { getErrAgentIps } from '@/api/operation/run';
export const useColumns = (t, reload, type): TableColumn[] => [
  {
    title: t('operation.host'),
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
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    title: t('operation.agentVersion'),
    dataIndex: 'agent_version',
    sorter: true,
    width: 150,
  },
  {
    title: t('operation.agentupgrade'),
    dataIndex: 'agent_upgrade_status',
    sorter: true,
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(agentVersion, {
        type: text,
        agent_upgrade_failure_reason: record.agent_upgrade_failure_reason,
        agent_version: record.agent_version,
      }),
  },
  {
    title: t('operation.dirverupgrade'),
    dataIndex: 'driver_upgrade_status',
    sorter: true,
    width: 150,
    hidden: type === OSTYPE.WINDOWS,
    customRender: ({ text, record }) =>
      createVNode(driverVersion, {
        type: text,
        driver_upgrade_failure_reason: record.driver_upgrade_failure_reason,
        driver_version: record.driver_version,
      }),
  },
  {
    title: t('operation.sysMsg'),
    dataIndex: 'os',
    sorter: true,
    width: 300,
    customRender: ({ record, text }) =>
      createVNode(systemInfo, { kernel_version: record.kernel_version, os: text }),
  },
  {
    title: t('operation.agentupdatetime'),
    dataIndex: 'agent_last_upgrade_at',
    sorter: true,
    width: 200,
  },
  {
    title: t('operation.dirverupdatetime'),
    dataIndex: 'driver_last_upgrade_at',
    sorter: true,
    width: 200,
    hidden: type === OSTYPE.WINDOWS,
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
            text: t('operation.upgraagt'),
            disabled: (record) => !record.agent_enable_upgrade,
            func: ({ record }) => {
              useModal(
                {
                  title: t('operation.cfmupgagt'),
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      singleUpgradeAgent,
                      { host_id: record.host_id },
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
            text: t('operation.adagradri'),
            disabled: (record) => !record.driver_enable_upgrade,
            func: async ({ record }) => {
              const errIps = ref([]);
              const { code, items } = await getErrAgentIps({
                filter: {},
                include: record.host_id,
                exclude: '',
                type: E_Operation_Type.DRIVER,
              });
              if (!code) {
                errIps.value = items ?? [];
              }
              useModal(
                {
                  title: t('operation.cfmadadiver'),
                  contentProps: {
                    labelText: unref(errIps).length ? t('operation.drvtips') : '',
                  },
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    return useValidatePwd(
                      singleUpgradeDriver,
                      { host_id: record.host_id },
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
