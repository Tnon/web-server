/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-03 14:42:24
 * @LastEditTime: 2022-12-24 13:22:02
 */
import { UpgradeServer } from '@/api/operation/upgrade';
import { pwdConfirm } from '@/components/pwdConfirm';
import { useModal, useValidatePwd } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import upgradeProgress from './cmts/upgradeProgress';
import upgradeStatus from './cmts/upgradeStatus';
import { CANUPGRADEENUM } from './type';
export const useColumns = (t, reload): TableColumn[] => [
  {
    title: t('operation.module'),
    dataIndex: 'module',
  },
  {
    title: t('operation.moduledes'),
    dataIndex: 'description',
  },
  {
    title: t('operation.currver'),
    dataIndex: 'old_version',
  },
  {
    title: t('operation.upgStau'),
    dataIndex: 'update_status',
    customRender: ({ text }) =>
      createVNode(upgradeStatus, {
        type: text,
      }),
  },
  {
    title: t('operation.upgStautime'),
    dataIndex: 'last_update_at',
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
            text: t('operation.upgraserv'),
            disabled: (record) => record.can_update === CANUPGRADEENUM.NOTUPDATE,
            func: () => {
              useModal(
                {
                  title: t('operation.upgraservs'),
                  contentProps: {
                    labelText: t('operation.upgcfnmg', [2]),
                  },
                  handleOk: async (contRef) => {
                    await contRef.validate();
                    try {
                      const { code } = await useValidatePwd(
                        UpgradeServer,
                        {},
                        contRef,
                        reload,
                        true,
                      );
                      if (!code) {
                        monitorUpgradeStatus(t);
                      }
                    } catch {
                      return Promise.reject('');
                    }
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
export const monitorUpgradeStatus = (t) => {
  useModal(
    {
      title: t('setting.seeRut'),
      maskClosable: false,
      footer: false,
      width: 600,
      closable: false,
      keyboard: false,
      wrapClassName: 'noheadModal',
    },
    createVNode(upgradeProgress),
  );
};
