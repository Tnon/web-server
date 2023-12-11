/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-06 19:41:42
 * @LastEditTime: 2023-04-27 11:58:45
 */
export const useColumns = (t, flag) => {
  if (flag) {
    return [
      {
        title: t('arcomn.detares'),
        dataIndex: 'engine_name',
      },
      {
        title: t('arcomn.jcjg'),
        dataIndex: 'detect_res',
        customRender: ({ text }) => (text === 1 ? t('arcomn.blacksim') : t('arcomn.wffzss')),
      },

      // {
      //   title: t('arcomn.expmsg'),
      //   dataIndex: 'explain',
      // },
    ];
  }
  return [
    {
      title: t('arcomn.detares'),
      dataIndex: 'engine_name',
    },
    {
      title: t('arcomn.jcjg'),
      dataIndex: 'detect_res',
      customRender: () => t('arcomn.wffzss'),
    },
  ];
};
export const fileDetailColumn = (t) => [
  {
    title: t('arcomn.ruletype'),
    dataIndex: 'rule',
  },
];
