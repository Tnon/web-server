/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 18:59:52
 * @LastEditTime: 2022-12-06 10:20:30
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode, reactive } from 'vue';
import treeGroup from './cmts/treeGroup';
import hostIp from '@/components/host-ip';
import customTag from '@/components/custom-tag';
import systemInfo from '@/components/systemInfo';
import { ValidateHostInfo, ValidateRemarkInfo } from '@/utils/reg';
import { useModal } from '@/hooks';
import { modifyHostInfo } from '@/api/asset/hostInfo/host';
import slotsForm from '@/components/slots-form';
export const useColumns = (T, reload?: Function): TableColumn[] => [
  {
    title: T('common.hostIp'),
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
    title: T('operation.group'), // 分组
    dataIndex: 'group_kv_path',
    width: 200,
    customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path }),
  },
  {
    dataIndex: 'os', // 系统信息
    title: T('asset.systemInfo'),
    width: 200,
    customRender: ({ record, text }) =>
      createVNode(systemInfo, { kernel_version: record.kernel_version, os: text }),
  },
  {
    title: T('common.tag'), // 主机标签
    width: 150,
    dataIndex: 'tag',
    customRender: ({ record }) =>
      createVNode(customTag, {
        tag: record.tag,
        host_id: record.host_id,
        reload,
      }),
  },
  {
    title: T('operation.busg'), // 所属业务组
    width: 150,
    dataIndex: 'dept',
  },
  {
    title: T('asset.perLi'), // 责任人
    width: 150,
    dataIndex: 'responsible_person',
    formProps: {
      type: 'input',
      placeholder: T('asset.piptPer'),
      rules: [
        {
          message: T('asset.last20Ch'),
          validator: ValidateHostInfo,
        },
      ],
    },
  },
  {
    title: T('asset.macRoom'), // 机房位置
    width: 150,
    dataIndex: 'host_location',
    formProps: {
      type: 'input',
      placeholder: T('asset.pipRlo'),
      rules: [
        {
          message: T('asset.last20Ch'),
          validator: ValidateHostInfo,
        },
      ],
    },
  },
  {
    title: T('asset.assetClass'), // 资产等级
    width: 150,
    dataIndex: 'asset_level',
    formProps: {
      type: 'input',
      placeholder: T('asset.piptAssLe'),
      rules: [
        {
          message: T('asset.last20Ch'),
          validator: ValidateHostInfo,
        },
      ],
    },
  },

  {
    title: T('asset.assetNum'), // 资产编号
    width: 150,
    dataIndex: 'asset_number',
    formProps: {
      type: 'input',
      placeholder: T('asset.pipAssNum'),
      rules: [
        {
          message: T('asset.last20Ch'),
          validator: ValidateHostInfo,
        },
      ],
    },
  },
  {
    title: T('common.remarks'), // 备注
    width: 150,
    dataIndex: 'description',
    formProps: {
      type: 'textarea',
      rules: [
        {
          message: T('asset.last100Ch'),
          validator: ValidateRemarkInfo,
        },
      ],
    },
  },
  {
    title: T('common.action'),
    width: 100,
    dataIndex: 'action',
    fixed: 'right',
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: T('user.editMsg'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: T('user.editMsg'),
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    await modifyHostInfo(
                      Object.assign({}, { ...conRef.fields }, { mac: record.host_id }),
                    );
                    callback();
                  },
                  contentProps: {
                    fields: reactive({
                      asset_level: record.asset_level,
                      responsible_person: record.responsible_person,
                      dept: record.dept,
                      asset_number: record.asset_number,
                      description: record.description,
                      host_location: record.host_location,
                    }),
                    colsMap: useColumns(T),
                  },
                },
                slotsForm,
              );
            },
          },
        ],
      },
    ],
  },
];
