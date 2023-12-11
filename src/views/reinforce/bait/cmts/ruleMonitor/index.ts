/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 10:59:01
 * @LastEditTime: 2023-08-07 10:30:52
 */
import countModal from '@/components/countModal';
import hostIp from '@/components/host-ip';
import showState from '@/components/showState';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import ruleMonitor from './index.vue';
import { E_Bait_Mode } from '../../views/rule/type';
import pathDetail from '../pathDetail';
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('arcomn.impactHost'),
    dataIndex: 'ip',
    width: 200,
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
    title: t('strategy.hostg'), //主机组
    dataIndex: 'host_group_name',
    width: 150,
  },
  {
    title: t('arcomn.file_dir'), //文件路径
    dataIndex: 'file_path',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        title: t('arcomn.file_dir'),
        showItems: [text],
      }),
  },
  {
    title: t('reinforce.jkms'), //监控模式
    dataIndex: 'monitor_mod',
    width: 150,
    customRender: ({ text }) =>
      createVNode(
        'span',
        {
          style: {
            background: 'rgba(24, 186, 121, 0.1)',
            padding: '4px 8px',
            color: '#18BA79',
            borderRadius: '6px',
          },
        },
        text === E_Bait_Mode.JSB
          ? t('reinforce.jsb')
          : text === E_Bait_Mode.AUTO
          ? t('arcomn.autohandle')
          : t('reinforce.jsb'),
      ),
  },
  {
    title: t('reinforce.jkzt'), //监控状态
    dataIndex: 'monitor_state',
    width: 200,
    customRender: ({ text, record }) =>
      createVNode(showState, {
        type: text,
        reason: record.monitor_exception,
      }),
  },
  {
    title: t('asset.detail'),
    dataIndex: 'exception_list',
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(pathDetail, { exception_list: text, file_path: record.file_path }),
  },
];
export default ruleMonitor;
