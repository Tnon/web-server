/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-13 14:20:24
 */
import { reactive } from 'vue';

export const useInstallDesc = (t) =>
  reactive({
    //屏蔽windows
    // Windows: [
    //   {
    //     step: 'winOne',
    //   },
    //   {
    //     step: 'winTwo',
    //   },
    //   {
    //     step: 'winThree',
    //   },
    // ],
    Linux: [
      {
        step: 'linOne',
        children: [
          {
            label: 'method',
            value: t('download.lxmone'),
            //  '',
          },
          {
            label: 'method',
            value: t('download.lxmtwo'),
            // '',
          },
        ],
      },
      {
        step: 'linTwo',
        children: [
          {
            value: t('download.lxmthree'),
            // value:
            //   '',
          },
        ],
      },
      {
        step: 'linThree',
      },
    ],
  });
