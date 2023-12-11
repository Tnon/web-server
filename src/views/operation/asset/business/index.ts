/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-01-10 16:09:46
 */
import { useModal } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { createVNode, reactive, unref } from 'vue';
import hostGroupDetail from './cmts/hostGroupDetail';
import hostNumber from './cmts/hostNumber';
import slotsForm from '@/components/slots-form';
import {
  updateBusGroupApi,
  deleteBusGroup,
  moveBusToBusGroup,
  addBusinessGroup,
} from '@/api/operation/asset';
import { GROUPENUM } from '@/enums/moveGroup';
import { bytesLength } from '@/utils/tools';
import businessGroupForm from './cmts/businessGroupForm';
//名字长度校验
const validateName = async (_, value: string) => {
  if (bytesLength(value) > 40) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};
//根据主机组返回名字树组
const getHostNameArr = (host_group) => {
  const nameArr: string[] = [];
  if (host_group && host_group.length) {
    host_group.forEach((ele) => {
      nameArr.push(ele.name);
    });
  }
  return nameArr;
};
//新增子分组
const useAddColumns = (t: any): TableColumn[] => [
  {
    title: t('operation.yewname'),
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: t('operation.yewnameerm'),
      rules: [
        { required: true, message: t('operation.yewnameerm') },
        { validator: validateName, message: t('operation.newGPlacNext') },
      ],
    },
  },
  {
    title: t('operation.busg'),
    dataIndex: 'parentGroupName',
    formProps: {
      type: 'input',
      // rules: [{ required: true }],
    },
  },
  {
    title: t('operation.mark'),
    dataIndex: 'desc_info',
    formProps: {
      type: 'input',
      placeholder: t('operation.pinmat'),
    },
  },
];
//编辑分组信息
const useEditColumns = (t: any): TableColumn[] => [
  {
    title: t('operation.yewname'),
    dataIndex: 'name',
    formProps: {
      type: 'input',
      placeholder: t('operation.yewnameerm'),
      rules: [
        { required: true, message: t('operation.yewnameerm') },
        { validator: validateName, message: t('operation.newGPlacNext') },
      ],
    },
  },
  {
    title: t('operation.busg'),
    dataIndex: 'parentGroupName',
    formProps: {
      type: 'input',
      placeholder: t('operation.qxlgjh'),
      // rules: [{ required: true }],
    },
  },
  {
    title: t('operation.cjtime'),
    dataIndex: 'create_at',
    formProps: {
      type: 'input',
    },
  },
  {
    title: t('operation.gldzjz'),
    dataIndex: 'hostGroupArr',
    formProps: {
      type: 'textarea',
      placeholder: t('operation.qxlgjh'),
    },
  },
  {
    title: t('operation.mark'),
    dataIndex: 'desc_info',
    formProps: {
      type: 'input',
      placeholder: t('operation.pinmat'),
    },
  },
];
//表格的列
export const useColumns = (t: any, refreshTable: Function): TableColumn[] => [
  {
    title: t('operation.binsgg'),
    dataIndex: 'name',
    width: 300,
  },
  {
    title: t('operation.cbusine'),
    dataIndex: 'sub_child_num',
    width: 200,
  },
  {
    title: t('operation.hostg'),
    dataIndex: 'host_group_num',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(hostGroupDetail, {
        hostGroupNumber: text,
        business_group_id: record.id,
      }),
  },
  {
    title: t('operation.hosfb'),
    dataIndex: 'host_num',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(hostNumber, {
        hostNumber: text,
        groupName: record.name,
        groups: record.sub_host_group_ids,
        refreshTable,
      }),
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    fixed: 'right',
    actions: [
      {
        type: 'icon',
        disabled: (record) => record.id === GROUPENUM.UNGROUP || record.id === GROUPENUM.ALL,
        actionList: [
          {
            text: t('operation.edit'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.edbgn'),
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    const { code } = await updateBusGroupApi({
                      // data: conRef.fields,
                      id: record.id,
                      new_group_name: unref(conRef).fields.name,
                      new_group_desc: unref(conRef).fields.desc_info,
                    });
                    !code && callback(true);
                  },
                  contentProps: {
                    disKeys: {
                      parentGroupName: true,
                      create_at: true,
                      hostGroupArr: true,
                    },
                    fields: reactive({
                      name: record.name,
                      parentGroupName:
                        JSON.parse(record.kv_path).length && JSON.parse(record.kv_path).length > 1
                          ? JSON.parse(record.kv_path)[JSON.parse(record.kv_path).length - 2][
                              'name'
                            ]
                          : '-',
                      create_at: record.create_at,

                      hostGroupArr: getHostNameArr(record.sub_host_group).join('\n'),
                      desc_info: record.desc_info,
                    }),
                    colsMap: useEditColumns(t),
                  },
                },
                slotsForm,
              );
            },
          },
          {
            text: t('operation.delete'),
            disabled: (record) => !!(record.items && record.items.length),
            func: async ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.deletebg'),
                  handleOk: async () => {
                    const { code } = await deleteBusGroup({ id: record.id });
                    !code && callback();
                  },
                },
                createVNode(
                  'span',
                  { style: { color: 'rgba(0, 0, 0, 0.6)' } },
                  t('operation.deletetips'),
                ),
              );
            },
          },
          {
            text: t('operation.move'),
            func: ({ record }, callback) => {
              useModal(
                {
                  contentProps: {
                    business_group_idState: reactive({ business_group_id: undefined }),
                    business_group_id: record.id,
                    placeholder: t('asset.selectGroup'),
                    warning: true,
                  },

                  title: t('asset.moveGroupTitle'),
                  handleOk: async (conRef) => {
                    await unref(conRef).validate();
                    const {
                      business_group_idState: { business_group_id },
                    } = conRef;
                    // 非未分组
                    const { code } = await moveBusToBusGroup({
                      current_id: record.id,
                      target_id: business_group_id,
                      flag: 0, //移动到分组内部
                    });

                    !code && callback(true);
                  },
                },
                businessGroupForm,
              );
            },
          },
          {
            text: t('operation.addbgnc'),
            func: ({ record }, callback) => {
              useModal(
                {
                  title: t('operation.addbgn'),
                  contentProps: {
                    disKeys: {
                      parentGroupName: true,
                    },
                    fields: reactive({
                      name: '',
                      parentGroupName: JSON.parse(record.kv_path).length
                        ? JSON.parse(record.kv_path)[JSON.parse(record.kv_path).length - 1]['name']
                        : '-',
                      desc_info: '',
                    }),
                    colsMap: useAddColumns(t),
                  },
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    const { code } = await addBusinessGroup({
                      parent_id: record.id,
                      group_name: unref(conRef).fields.name,
                      desc_info: unref(conRef).fields.desc_info,
                    });
                    !code && callback(true);
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
