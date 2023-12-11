/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 13:56:45
 * @LastEditTime: 2022-08-31 11:35:05
 */
export const useColumns = (t) => ({
  engineColumns: [
    {
      title: t('arcomn.detname'),
      dataIndex: 'detect_res',
      customRender: () => t('arcomn.virusmn'),
    },
    {
      title: t('arcomn.detares'),
      dataIndex: 'engine_name',
    },
    {
      title: t('arcomn.virusname'),
      dataIndex: 'explain',
    },
  ],
});
