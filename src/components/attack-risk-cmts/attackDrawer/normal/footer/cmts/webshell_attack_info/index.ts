export const useColumns = (t) => ({
  engineColumns: [
    {
      title: t('arcomn.detname'),
      dataIndex: 'detect_res',
      customRender: () => t('arcomn.blacksim'),
    },
    {
      title: t('arcomn.detares'),
      dataIndex: 'engine_name',
    },
    {
      title: t('arcomn.expmsg'),
      dataIndex: 'explain',
    },
  ],
  ruleColumns: [
    {
      title: t('arcomn.ruletype'),
      dataIndex: 'rule',
    },
    // {
    //   title: t('arcomn.expmin'),
    //   dataIndex: 'tags',
    // },
  ],
});
