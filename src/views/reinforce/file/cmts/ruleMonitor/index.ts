/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 10:59:01
 * @LastEditTime: 2023-03-07 16:47:42
 */
import countModal from '@/components/countModal';
import hostIp from '@/components/host-ip';
import showState from '@/components/showState';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import ruleMonitor from './index.vue';
import { E_Monitor_Mode } from './type';
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
    title: t('ngav.filepat'), //文件路径
    dataIndex: 'file_path',
    width: 150,
    customRender: ({ text }) =>
      createVNode(countModal, {
        title: t('ngav.filepat'),
        showItems: [text],
      }),
  },
  {
    title: t('reinforce.jkms'), //监控模式
    dataIndex: 'monitor_mode',
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
        text === E_Monitor_Mode.Inject
          ? t('reinforce.qblj')
          : text === E_Monitor_Mode.PartInject
          ? t('reinforce.bflj')
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
];
export default ruleMonitor;
