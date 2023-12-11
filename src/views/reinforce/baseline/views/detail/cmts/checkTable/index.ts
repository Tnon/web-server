/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 17:31:54
 * @LastEditTime: 2023-10-26 20:08:02
 */
import buttonGroups from '@/components/buttonGroups';
import useCreatDraw from '@/hooks/use-click-row';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import checkDraw from './checkDraw';
import checkTable from './index.vue';
export const useColumns = (t: any, session_id): TableColumn[] => [
  {
    title: t('reinforce.jcxmc'), //检查项名称
    dataIndex: 'name',
    width: 200,
  },
  {
    title: t('reinforce.sgsdf'), //检查项类别
    dataIndex: 'type',
    width: 200,
  },
  {
    title: t('reinforce.fgzj'), //覆盖主机
    dataIndex: 'cover_num',
    width: 200,
    customRender: ({ record }) =>
      createVNode('span', null, record.success_num + ' / ' + record.cover_num),
  },
  {
    title: t('reinforce.thzj'), //通过主机
    dataIndex: 'pass_num',
    width: 200,
    customRender: ({ text }) => createVNode('span', null, text),
  },
  {
    title: t('reinforce.tgl'), //通过率
    dataIndex: 'pass_percent',
    customHead: true,
    width: 200,
    customRender: ({ text }) => createVNode('span', null, text),
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    customRender: ({ record }) =>
      createVNode(buttonGroups, {
        actions: [
          {
            text: t('asset.lookOver'),
            callback: () => {
              useCreatDraw(
                {
                  title: record.name,
                  contentProps: {
                    check_code: record.check_code,
                    session_id,
                  },
                  width: 800,
                },
                checkDraw,
              );
            },
          },
        ],
      }),
  },
];
export default checkTable;
