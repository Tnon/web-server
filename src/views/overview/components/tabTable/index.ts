/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-26 17:18:42
 * @LastEditTime: 2023-10-26 20:07:06
 */
import tabTable from './index.vue';
import { batchHandleApi, getTableList } from '@/api/attack_risk';
import { getTableList as getTableListNgav } from '@/api/ngav';
import { getAssetDetail, getOperationDetail } from '@/api/overview';
import { createVNode } from 'vue';
import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
import hostIp from '@/components/host-ip';
import { GROUPENUM } from '@/enums/moveGroup';
import { OSTYPE } from '@/enums/assetsType';
import { E_AssetType, E_OperationType, E_Policy_Type } from './type';
import { getBlAlarmList } from '@/api/reinforce';
import { HandleType } from '@/views/reinforce/file/cmts/tableContent/type';
import { BatchOption } from '@/components/attack-risk-cmts/dataTable/type';
import { AttackHandleRecord } from '@/api/attack_risk/model';
import { useModal } from '@/hooks/use-modal';
import { useBatchMark } from '@/hooks/use-batchmark';
import batchMarks from '@/components/attack-risk-cmts/batchMarks';
import useCreatDraw from '@/hooks/use-click-row';
import attackDrawer from '@/components/attack-risk-cmts/attackDrawer';
import router from '@/router';
export const useColumnsData = (t, reload) => {
  return {
    alarm: {
      api: getTableList,
      agms: {
        handle: HANDLETYPE.UNHANDLE,
        risk_path: MODELTYPE.ATTACKPATH,
      },
      columns: [
        {
          title: t('arcomn.attackType'),
          dataIndex: 'dtypename',
          customRender: ({ record }) =>
            createVNode('span', { class: 'attRskType', title: record.dtypename }, record.dtypename),
        },
        {
          title: t('arcomn.impactHost'),
          dataIndex: 'ip',
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
          title: t('arcomn.attChar'),
          dataIndex: 'description',
        },
        {
          title: t('arcomn.sbsj'),
          dataIndex: 'update_at',
        },
        {
          title: t('arcomn.gjcl'), //告警处理,
          dataIndex: 'action',
          actions: [
            {
              type: 'groups',
              actionList: [
                {
                  text: t('arcomn.ignore'),
                  func: ({ record }) => {
                    const type = BatchOption.Ignore;
                    const sendObj: AttackHandleRecord = {
                      isall: false,
                      riskinfolist: [record.id],
                      set_handle: HANDLETYPE.IGNORE,
                      set_note: '',
                      filter: {
                        handle: HANDLETYPE.UNHANDLE,
                        risk_path: MODELTYPE.ATTACKPATH,
                      },
                    };
                    //填写批注
                    useModal(
                      {
                        title: t('arcomn.title' + type, [t('menu.attack')]),
                        handleOk: async (conRef) => {
                          await conRef.validate();
                          return useBatchMark(batchHandleApi, sendObj, conRef, reload);
                        },
                      },
                      batchMarks,
                    );
                  },
                },
                {
                  text: t('asset.lookOver'),
                  func: ({ record }) => {
                    useCreatDraw(
                      {
                        title: t('attack.detailTitle'),
                        width: 900,
                        contentProps: {
                          title: t('attack.detailTitle'),
                          drawClass: 'attackDraw',
                          refreshTable: reload,
                          record: record,
                        },
                      },
                      attackDrawer,
                    );
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    event: {
      api: getTableListNgav,
      agms: {
        handle: HANDLETYPE.UNHANDLE,
        risk_path: MODELTYPE.NGAVPATH,
      },
      columns: [
        {
          title: t('common.ngavtag'),
          dataIndex: 'dtypename',
          customRender: ({ record }) =>
            createVNode('span', { class: 'attRskType', title: record.dtypename }, record.dtypename),
        },
        {
          title: t('arcomn.impactHost'),
          dataIndex: 'ip',
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
          title: t('arcomn.sbsj'),
          dataIndex: 'next_at',
        },
        {
          title: t('arcomn.gjcl'), //告警处理,
          dataIndex: 'action',
          actions: [
            {
              type: 'groups',
              actionList: [
                {
                  text: t('arcomn.ignore'),
                  func: ({ record }) => {
                    const type = BatchOption.Ignore;
                    const sendObj: AttackHandleRecord = {
                      isall: false,
                      riskinfolist: [record.id],
                      set_handle: HANDLETYPE.IGNORE,
                      set_note: '',
                      filter: {
                        handle: HANDLETYPE.UNHANDLE,
                        risk_path: MODELTYPE.NGAVPATH,
                      },
                    };
                    //填写批注
                    useModal(
                      {
                        title: t('arcomn.title' + type, [t('menu.ngav')]),
                        handleOk: async (conRef) => {
                          await conRef.validate();
                          return useBatchMark(batchHandleApi, sendObj, conRef, reload);
                        },
                      },
                      batchMarks,
                    );
                  },
                },
                {
                  text: t('asset.lookOver'),
                  func: ({ record }) => {
                    router.push({
                      name: 'acdr-detail',
                      query: {
                        id: record!.id,
                        handle: record!.handle,
                        from: 'overview',
                      },
                      params: {
                        act_path_sha256: record!.act_path_sha256,
                      },
                    });
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    asset: {
      api: getAssetDetail,
      agms: {
        group_id: GROUPENUM.ALL,
        osver: OSTYPE.LINUX,
      },
      columns: [
        {
          title: t('asset.detail'),
          dataIndex: 'asset_desc',
        },
        {
          title: t('common.action'),
          dataIndex: 'asset_type',
          actions: [
            {
              type: 'groups',
              actionList: [
                {
                  text: t('asset.lookOver'),
                  func: ({ record }) => {
                    const name =
                      record.asset_type === E_AssetType.Loop
                        ? 'hostAsset-layout-assetRisk-kernelvul'
                        : record.asset_type === E_AssetType.AppPwd
                        ? 'hostAsset-layout-accountRisk-appweakpwd'
                        : record.asset_type === E_AssetType.SysPwd
                        ? 'hostAsset-layout-accountRisk-weakpwd'
                        : record.asset_type === E_AssetType.AppRisk
                        ? 'hostAsset-layout-accountRisk-apprisk'
                        : record.asset_type === E_AssetType.AccRisk
                        ? 'hostAsset-layout-accountRisk-accrisk'
                        : record.asset_type === E_AssetType.SysRisk
                        ? 'hostAsset-layout-accountRisk-sysrisk'
                        : '';
                    name &&
                      router.push({
                        name: name,
                      });
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    reinforce: {
      api: getBlAlarmList,
      agms: {
        handle: HandleType.UNHANDLE,
      },
      columns: [
        {
          title: t('reinforce.jglx'),
          dataIndex: 'risk_type',
          customRender: ({ text }) =>
            createVNode(
              'span',
              null,
              text === E_Policy_Type.File ? t('reinforce.filep') : t('reinforce.baitp'),
            ),
        },
        {
          title: t('reinforce.cfgz'),
          dataIndex: 'policy_name',
        },
        {
          title: t('arcomn.impactHost'),
          dataIndex: 'ip',
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
          title: t('arcomn.file_pathDraw'),
          dataIndex: 'file_path',
        },
        {
          title: t('reinforce.wjcaz'),
          dataIndex: 'op_name',
        },
        {
          title: t('arcomn.sbsj'),
          dataIndex: 'next_at',
        },
        {
          title: t('common.action'),
          dataIndex: 'risk_type',
          actions: [
            {
              type: 'groups',
              actionList: [
                {
                  text: t('asset.lookOver'),
                  func: ({ record }) => {
                    router.push({
                      name:
                        record.risk_type === E_Policy_Type.File
                          ? 'reinforce-layout-file'
                          : 'reinforce-layout-bait',
                    });
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    operation: {
      api: getOperationDetail,
      columns: [
        {
          title: t('asset.detail'),
          dataIndex: 'maintenance_desc',
        },
        {
          title: t('common.action'),
          dataIndex: 'maintenance_type',
          actions: [
            {
              type: 'groups',
              actionList: [
                {
                  text: t('asset.lookOver'),
                  func: ({ record }) => {
                    const props =
                      record.maintenance_type === E_OperationType.Upgrade
                        ? {
                            name: 'operation-layout-upgrade-layout-upgrade-client',
                          }
                        : record.maintenance_type === E_OperationType.Server
                        ? {
                            name: 'operation-layout-run-layout-run-server',
                          }
                        : record.maintenance_type === E_OperationType.Acdr
                        ? {
                            name: 'operation-layout-run-layout-run-client',
                            type: 'collectionPoint',
                          }
                        : record.maintenance_type === E_OperationType.Agent
                        ? {
                            name: 'operation-layout-run-layout-run-client',
                            type: 'agent',
                          }
                        : record.maintenance_type === E_OperationType.Driver
                        ? {
                            name: 'operation-layout-run-layout-run-client',
                            type: 'agent',
                          }
                        : record.maintenance_type === E_OperationType.Rasp
                        ? {
                            name: 'operation-layout-run-layout-run-client',
                            type: 'rasp',
                          }
                        : null;
                    props && router.push(props);
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };
};

export default tabTable;
