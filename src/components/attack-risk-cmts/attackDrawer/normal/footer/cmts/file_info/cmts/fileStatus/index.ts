/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 14:37:00
 * @LastEditTime: 2022-10-25 17:33:16
 */
import getFile from './index.vue';

export const getFileStatus = (status: number, t) => {
  let text = '';
  switch (status) {
    case 0: //未获取
      text = t('arcomn.unhq');
      break;
    case 1: //未获取
      text = t('arcomn.unhq');
      break;
    case 2: //获取中
      text = t('arcomn.unhq');
      break;
    case 3: //可下载
      text = t('arcomn.hqwb');
      break;
    case 4: //文件不存在
      text = t('arcomn.wjbcz');
      break;
    case 5: //文件超限
      text = t('arcomn.wjcx');
      break;
    case 6: //上传超时
      text = t('arcomn.sccs');
      break;
    case 7: //主机离线
      text = t('arcomn.zhjl');
      break;
    case 8: //dump失败
      text = t('arcomn.dumpsb');
      break;
    default: //获取失败
      text = t('arcomn.hqfail');
      break;
  }
  return { text };
};
export default getFile;
