import { TableColumn } from '@/types/tableColumn';
import { useModal } from '@/hooks';
import { createVNode } from 'vue';
import { bakStatus } from './components';
import { deleteBak, getDiskSpace, recoverDb } from '@/api/operation/storage';
import { Button, message } from 'ant-design-vue';
import { exportDataBak, Logout } from '@/utils/tools';
import { BAKSTATUS } from '@/enums/pstatus';
import dataBackup from './index.vue';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('setting.bakTime'),
    dataIndex: 'create_at',
    width: 200,
  },
  {
    title: t('setting.dbVersion'),
    dataIndex: 'db_version',
    width: 200,
  },
  {
    title: t('setting.bakType'),
    dataIndex: 'type',
    width: 200,
    // customRender: ({ text }) => (text === 1 ? t('setting.manBak') : t('setting.iptBaKC')),
  },
  {
    title: t('setting.fileSize'),
    dataIndex: 'filesize',
    width: 200,
  },
  {
    title: t('setting.bakStatus'),
    dataIndex: 'status',
    width: 200,
    customRender: ({ text: status }) => createVNode(bakStatus, { status }),
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    actions: [
      {
        //导入中 和 备份中  不能操作按钮
        disabled: (record) =>
          record.status === BAKSTATUS.BAKING || record.status === BAKSTATUS.IMPORTING,
        type: 'icon',
        actionList: [
          {
            text: t('setting.restNow'),
            disabled: (record) => !record.can_restore,
            func: async ({ record }) => {
              //备份成功和导入成功 能恢复
              if (
                record.status === BAKSTATUS.BAKSUCCESS ||
                record.status === BAKSTATUS.IMPSUCCESS
              ) {
                const { confirm_message } = await getDiskSpace();
                useModal(
                  {
                    title: t('setting.restTit'),
                    maskClosable: false,
                    handleOk: async () => {
                      //恢复备份
                      const { code: resCode } = await recoverDb(record.id);
                      if (!resCode) {
                        confirmLogout(t);
                      }
                      return Promise.reject('');
                    },
                  },
                  createVNode('div', {}, [
                    createVNode(
                      'div',
                      { style: { color: '#f8a04c', marginBottom: '10px' } },
                      confirm_message,
                    ),
                    createVNode('span', {}, t('setting.restTips')),
                  ]),
                );
              } else {
                message.error(t('setting.cantRest'));
              }
            },
          },
          {
            text: t('common.download'),
            disabled: (record) =>
              !(record.status === BAKSTATUS.BAKSUCCESS || record.status === BAKSTATUS.IMPSUCCESS),
            func: async ({ record }) => {
              if (
                record.status === BAKSTATUS.BAKSUCCESS ||
                record.status === BAKSTATUS.IMPSUCCESS
              ) {
                exportDataBak(record.url, record.filename);
              } else {
                message.error(t('setting.cantDown'));
              }
            },
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, reload) => {
              if (record.status === 1 || record.status === 4) {
                message.error(t('setting.waitCom'));
              } else {
                await deleteBak(record.id + '');
                reload();
              }
            },
          },
        ],
      },
    ],
  },
];

const confirmLogout = (t) => {
  useModal(
    {
      title: t('setting.seeRut'),
      maskClosable: false,
      footer: false,
      width: 350,
    },
    createVNode('div', { style: { textAlign: 'right', padding: '20px 0' } }, [
      createVNode(
        Button,
        { type: 'primary', onClick: () => Logout() },
        {
          default: () => t('common.confirm'),
        },
      ),
    ]),
  );
};
export default dataBackup;
