/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-20 11:51:24
 * @LastEditTime: 2022-11-28 10:37:59
 */
import recordModal from './index.vue';
import { getClientRevord, getEngineRevord, getServerRevord } from '@/api/operation/upgrade';
import { OSTYPE } from '@/enums/assetsType';
import { createVNode } from 'vue';
import { ServerPkgType } from '@/views/operation/components/upgrade-center/cmts/agent-server-upload/type';

export const useTableConfig = (type, t, tableConfig) => {
  const configData = {
    client: {
      api: getClientRevord,
      columns: [
        {
          title: t('operation.uploadtime'),
          dataIndex: 'updated_at',
          width: 200,
        },
        {
          title: t('operation.uppkgtype'),
          dataIndex: 'osver',
          width: 200,

          customRender: ({ text }) =>
            t('operation.shenjia', [text === OSTYPE.LINUX ? 'Linux' : 'Windows']),
        },
        {
          title: t('operation.agtvs'),
          dataIndex: 'version',
          width: 200,
        },
        {
          title: t('operation.filesize'),
          dataIndex: 'filesize',
          width: 150,
        },
        {
          title: t('common.action'),
          dataIndex: 'op',
          width: 100,
        },
        {
          title: t('operation.actionUser'),
          dataIndex: 'op_user',
          width: 100,
        },
      ],
    },
    server: {
      api: getServerRevord,
      columns: [
        {
          title: t('operation.uploadtime'),
          dataIndex: 'upload_at',
        },
        {
          title: t('operation.uppkgtype'),
          dataIndex: 'package_type',
          customRender: ({ text }) =>
            createVNode(
              'span',
              null,
              text === ServerPkgType.Base ? t('operation.bapkg') : t('operation.upkg'),
            ),
        },
        {
          title: t('operation.agtvs'),
          dataIndex: 'version',
        },
        {
          title: t('operation.filesize'),
          dataIndex: 'size',
        },
        {
          title: t('operation.actionUser'),
          dataIndex: 'op_user',
          width: 100,
        },
      ],
    },
    engine: {
      api: getEngineRevord,
      columns: [
        {
          title: t('operation.uploadtime'),
          dataIndex: 'updated_at',
          width: 200,
        },
        {
          title: t('operation.uppkgtype'),
          dataIndex: 'engine_name',
          width: 200,
        },
        {
          title: t('operation.agtvs'),
          dataIndex: 'version',
          width: 200,
        },
        {
          title: t('operation.filesize'),
          dataIndex: 'filesize',
          width: 150,
        },
        {
          title: t('common.action'),
          dataIndex: 'op',
          width: 100,
        },
        {
          title: t('operation.actionUser'),
          dataIndex: 'op_user',
          width: 100,
        },
      ],
    },
    // clientengine: {
    //   api: getEngineRevord,
    //   columns: [
    //     {
    //       title: t('operation.uploadtime'),
    //       dataIndex: 'updated_at',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.uppkgtype'),
    //       dataIndex: 'type',
    //       width: 200,
    //
    //       customRender: ({ text }) =>
    //         text === UPCLIPKGTYPE.HASH
    //           ? t('operation.hashengine')
    //           : text === UPCLIPKGTYPE.BASELINE
    //           ? t('operation.baselineengine')
    //           : t('operation.acdrengine'),
    //     },
    //     {
    //       title: t('operation.agtvs'),
    //       dataIndex: 'version',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.filesize'),
    //       dataIndex: 'filesize',
    //       width: 150,
    //
    //     },
    //     {
    //       title: t('common.action'),
    //       dataIndex: 'op',
    //       width: 100,
    //     },
    //   ],
    // },
    // serverengine: {
    //   api: getSerEngineRevord,
    //   columns: [
    //     {
    //       title: t('operation.uploadtime'),
    //       dataIndex: 'updated_at',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.uppkgtype'),
    //       dataIndex: 'type',
    //       width: 200,
    //
    //       customRender: ({ text }) =>
    //         text === UPSERPKGTYPE.YARA
    //           ? t('operation.yaraengine')
    //           : text === UPSERPKGTYPE.CLAMAV
    //           ? t('operation.clamavengine')
    //           : t('operation.aviraengine'),
    //     },
    //     {
    //       title: t('operation.agtvs'),
    //       dataIndex: 'version',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.filesize'),
    //       dataIndex: 'filesize',
    //       width: 150,
    //
    //     },
    //     {
    //       title: t('common.action'),
    //       dataIndex: 'op',
    //       width: 100,
    //     },
    //   ],
    // },
    // vultyengine: {
    //   api: getVultyEngineRecord,
    //   columns: [
    //     {
    //       title: t('operation.uploadtime'),
    //       dataIndex: 'updated_at',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.uppkgtype'),
    //       dataIndex: 'engine_name',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.agtvs'),
    //       dataIndex: 'version',
    //       width: 200,
    //
    //     },
    //     {
    //       title: t('operation.filesize'),
    //       dataIndex: 'filesize',
    //       width: 150,
    //
    //     },
    //     {
    //       title: t('common.action'),
    //       dataIndex: 'op',
    //       width: 100,
    //     },
    //   ],
    // },
  };

  Object.assign(tableConfig, configData[type]);
};
export default recordModal;
