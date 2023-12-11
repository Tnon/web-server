/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-10-26 20:06:43
 */
import { useProductLogo } from '@/store/modules/product-logo';
import { TableColumn } from '@/types/tableColumn';
import { computed, createVNode } from 'vue';
import jumpCount from './jumpCount';

export const useColumns = (t): TableColumn[] => {
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  //acdr根据后端接口
  if (acdr_enabled.value) {
    return [
      {
        title: t('overview.perType'),
        dataIndex: 'day',
        customRender: ({ text }) =>
          createVNode(
            'span',
            {},
            text === 1 ? t('overview.day') : text === 7 ? t('overview.week') : t('overview.month'),
          ),
      },
      {
        title: t('overview.disAlarm'),
        dataIndex: 'unhandle_alarm_num',
        customRender: ({ text, record }) =>
          createVNode(jumpCount, {
            type: 'attack',
            count: text,
            handled: false,
            begintime: record.begintime,
            endtime: record.endtime,
          }),
      },
      // {
      //   title: t('overview.handledAlarm'),
      //   dataIndex: 'handle_alarm_num',
      //   // customRender: ({ text }) => createVNode('span', { style: { color: '#18BA79' } }, text),
      //   customRender: ({ text, record }) =>
      //     createVNode(jumpCount, {
      //       type: 'attack',
      //       count: text,
      //       handled: true,
      //       begintime: record.begintime,
      //       endtime: record.endtime,
      //     }),
      // },

      {
        title: t('overview.disEvent'),
        dataIndex: 'unhandle_event_num',
        // customRender: ({ text }) => createVNode('span', { style: { color: '#F8A454' } }, text),
        customRender: ({ text, record }) =>
          createVNode(jumpCount, {
            type: 'acdr',
            count: text,
            handled: false,
            begintime: record.begintime,
            endtime: record.endtime,
          }),
      },
      // {
      //   title: t('overview.handledEvent'),
      //   dataIndex: 'handle_event_num',
      //   // customRender: ({ text }) => createVNode('span', { style: { color: '#18BA79' } }, text),
      //   customRender: ({ text, record }) =>
      //     createVNode(jumpCount, {
      //       type: 'acdr',
      //       count: text,
      //       handled: true,
      //       begintime: record.begintime,
      //       endtime: record.endtime,
      //     }),
      // },
      {
        title: t('overview.perTime'),
        dataIndex: 'begintime',
        customRender: ({ record }) =>
          createVNode('span', {}, record.begintime + ' ～ ' + record.endtime),
      },
    ];
  } else {
    return [
      {
        title: t('overview.perType'),
        dataIndex: 'day',
        customRender: ({ text }) =>
          createVNode(
            'span',
            {},
            text === 1 ? t('overview.day') : text === 7 ? t('overview.week') : t('overview.month'),
          ),
      },
      {
        title: t('overview.disAlarm'),
        dataIndex: 'unhandle_alarm_num',
        // customRender: ({ text }) => createVNode('span', { style: { color: '#F05064' } }, text),
        customRender: ({ text, record }) =>
          createVNode(jumpCount, {
            type: 'attack',
            count: text,
            handled: false,
            begintime: record.begintime,
            endtime: record.endtime,
          }),
      },
      // {
      //   title: t('overview.handledAlarm'),
      //   dataIndex: 'handle_alarm_num',
      //   customRender: ({ text }) => createVNode('span', { style: { color: '#18BA79' } }, text),
      // },
      {
        title: t('overview.perTime'),
        dataIndex: 'endtime',
        customRender: ({ record }) =>
          createVNode('span', {}, record.begintime + ' ～ ' + record.endtime),
      },
    ];
  }
};
