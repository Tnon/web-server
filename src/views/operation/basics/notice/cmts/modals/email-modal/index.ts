/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-17 20:36:50
 * @LastEditTime: 2023-07-17 21:02:41
 */
import emailModal from './index.vue';
export const getSslOptions = (t) => {
  return {
    sslOptions: [
      {
        label: 'SSL',
        value: 'ssl',
      },
      {
        label: 'None',
        value: 'none',
      },
      {
        label: 'StartTLS',
        value: 'starttls',
      },
      {
        label: 'StartTLS-Login',
        value: 'starttls-login',
      },
    ],
    skipOptions: [
      {
        label: t('report.is'),
        value: 'true',
      },
      {
        label: t('report.no'),
        value: 'false',
      },
    ],
  };
};
export default emailModal;
