/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 17:31:54
 * @LastEditTime: 2023-10-26 20:08:13
 */
import buttonGroups from '@/components/buttonGroups';
import { useModal } from '@/hooks';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import checkResultModal from '../../../checkResultModal';
import checkResult from '../../../checkTable/checkDraw/tableContent/checkResult';
import checkTable from './index.vue';
export const useColumns = (t: any, session_id, mac): TableColumn[] => [
  {
    title: t('reinforce.jcxmc'), //检查项名称
    dataIndex: 'check_name',
    width: 200,
  },
  {
    title: t('reinforce.sgsdf'), //检查项类别
    dataIndex: 'check_type',
    width: 200,
  },
  {
    title: t('reinforce.jcjg'), //检查结果
    dataIndex: 'check_result',
    width: 200,
    customRender: ({ text, record }) =>
      createVNode(checkResult, { type: text, reason: record.failure_reason }),
  },
  {
    title: t('common.action'),
    width: 100,
    dataIndex: 'action',
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            callback: () => {
              useModal(
                {
                  title: 'name+type',
                  width: 800,
                  footer: false,
                  wrapClassName: 'noheadModal',
                  contentProps: {
                    session_id,
                    check_code: record.check_code,
                    mac,
                  },
                },
                createVNode(checkResultModal),
              );
            },
          },
        ],
      }),
  },
];
export default checkTable;
