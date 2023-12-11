/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-03-17 17:19:47
 */
import buttonGroups from '@/components/buttonGroups';
import countModal from '@/components/countModal';
import { pwdConfirm } from '@/components/pwdConfirm';
import { userInfo } from '@/components/userInfo';
import { useModal, useValidatePwd } from '@/hooks';

import { TableColumn } from '@/types/tableColumn';
import { computed, createVNode } from 'vue';
import { E_Host_Range } from '../../cmts/tableContent/type';
import { E_Task_State } from './type';
import { batchDeleteTask, batchHandleTask, editNewTask } from '@/api/reinforce';
import taskForm from './cmts/taskForm';
import { E_Task_Type } from './cmts/taskForm/type';
import { useUserToken } from '@/store/modules/user';

const userTokenStore = useUserToken();
//获取管理员
const userID = computed(() => userTokenStore.user_info.id);
export const useColumns = (t: any, refreshTable, isCheck): TableColumn[] => [
  {
    title: t('reinforce.rwmc'), //任务名称
    dataIndex: 'name',
    width: 150,
  },
  {
    title: t('reinforce.rwuzi'), //任务周期
    dataIndex: 'exec_time',
    width: 200,
  },
  {
    title: t('reinforce.rule_count'), //基线规则
    dataIndex: 'rules',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        showItems: text && text.length ? text.map((ele) => ele.rule_name) : [],
        title: t('reinforce.rule_count'),
      }),
  },
  {
    title: t('reinforce.rwzt'), //任务状态
    dataIndex: 'task_status',
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        {
          style: {
            color:
              text === E_Task_State.Complete
                ? '#18BA79'
                : text === E_Task_State.Parse
                ? '#f8a454'
                : '#18BA79',
          },
        },
        text === E_Task_State.Complete
          ? t('reinforce.ywc')
          : text === E_Task_State.Parse
          ? t('reinforce.yzt')
          : t('reinforce.zxz'),
      ),
  },
  {
    title: t('reinforce.jcx'), //检查项
    dataIndex: 'check_num',
    width: 100,
  },

  {
    title: t('reinforce.jcfw'), //检查范围
    dataIndex: 'scope',
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
    title: t('reinforce.rwcjs'), //任务创建人
    dataIndex: 'create_user',
    width: 200,
    customRender: ({ text }) =>
      createVNode(userInfo, {
        email: text?.email ?? '',
        avatar: text?.avatar ?? '',
        name: text?.name ?? '',
      }),
  },
  {
    title: t('reinforce.wucjsj'), //任务创建时间
    dataIndex: 'create_at',
    width: 200,
  },
  {
    title: t('common.action'), //操作
    dataIndex: 'task_status',
    width: 200,
    hidden: isCheck,
    customRender: ({ text, record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('common.edit'),
            disabled: userID.value !== record.create_user?.id,
            callback: async () => {
              useModal(
                {
                  title: t('reinforce.bjjskf'),
                  width: 800,
                  contentProps: {
                    id: record.id,
                  },
                  handleOk: async ({ modelRef, validate }) => {
                    await validate();
                    await editNewTask(Object.assign({}, modelRef, { id: record.id }));
                    refreshTable(true);
                  },
                },
                createVNode(taskForm),
              );
            },
          },
          {
            disabled: text === E_Task_State.Complete || record.exec_type === E_Task_Type.Now,
            text: text === E_Task_State.Parse ? t('reinforce.zxs') : t('reinforce.zt'),
            callback: async () => {
              const sendObj = {
                filter: {},
                is_all: false,
                task_id_list: [record.id],
                status: text === E_Task_State.Parse ? E_Task_State.Runing : E_Task_State.Parse,
              };
              await batchHandleTask(sendObj);
              refreshTable(true);
            },
          },
          {
            text: t('common.delete'),
            callback: () => {
              //删除确认
              useModal(
                {
                  title: t('reinforce.delrww'),
                  contentProps: {
                    labelText: t('reinforce.delrwwsub'),
                  },
                  handleOk: async (conRef) => {
                    await conRef.validate();
                    return useValidatePwd(
                      batchDeleteTask,
                      {
                        is_all: false,
                        filter: {},
                        task_id_list: [record.id],
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
