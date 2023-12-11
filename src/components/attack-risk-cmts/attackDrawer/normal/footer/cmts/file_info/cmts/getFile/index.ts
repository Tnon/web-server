/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-23 14:37:00
 * @LastEditTime: 2022-10-08 16:34:13
 */
import getFile from './index.vue';
// unhq: '未获取',
// hqing: '获取中',
// hqwb: '可下载',
// hqfail: '获取失败',
// export const getFileStatus = (status: number, t) => {
//   let text = '';
//   switch (status) {
//     case 0: //未获取
//       text = t('arcomn.unhq');
//       break;
//     case 1: //获取中
//       text = t('arcomn.hqing');
//       break;
//     case 2: //获取中
//       text = t('arcomn.hqing');
//       break;
//     case 3: //可下载
//       text = t('arcomn.hqwb');
//       break;
//     case 4: //文件不存在
//       text = t('arcomn.wjbcz');
//       break;
//     case 5: //文件超限
//       text = t('arcomn.wjcx');
//       break;
//     case 6: //上传超时
//       text = t('arcomn.sccs');
//       break;
//     case 7: //主机离线
//       text = t('arcomn.zhjl');
//       break;
//     case 8: //dump失败
//       text = t('arcomn.dumpsb');
//       break;
//     default: //获取失败
//       text = t('arcomn.hqfail');
//       break;
//   }
//   return { text };
// };
export const getFileStatus = (status: number | undefined, t) => {
  let text = '',
    canDownload = true,
    downloadFile = true;
  switch (status) {
    case 0: //未获取=>获取
      text = t('arcomn.hqfile');
      canDownload = true;
      downloadFile = false;
      break;
    case 1: //获取中
      text = t('arcomn.hqing');
      canDownload = false;
      downloadFile = false;
      break;
    case 2: //获取中
      text = t('arcomn.hqing');
      canDownload = false;
      downloadFile = false;
      break;
    case 3: //可下载=>下载到本地
      text = t('arcomn.dobend');
      canDownload = true;
      downloadFile = true;
      break;
    case 4: //文件不存在=>重新获取
      text = t('arcomn.rehuoqu');
      canDownload = true;
      downloadFile = false;
      break;
    case 5: //文件超限>重新获取
      text = t('arcomn.rehuoqu');
      canDownload = true;
      downloadFile = false;
      break;
    case 6: //上传超时>重新获取
      text = t('arcomn.rehuoqu');
      canDownload = true;
      downloadFile = false;
      break;
    case 7: //主机离线>重新获取
      text = t('arcomn.rehuoqu');
      canDownload = true;
      downloadFile = false;
      break;
    case 8: //dump失败>重新获取
      text = t('arcomn.rehuoqu');
      canDownload = true;
      downloadFile = false;
      break;
    default: //获取失败>下载到本地
      text = t('arcomn.dobend');
      canDownload = true;
      downloadFile = true;
      break;
  }
  return { text, canDownload, downloadFile };
};
// 0:未上传 1:待上传 2:上传中 3:上传完毕 4:文件不存在 5.文件超限 6.上传超时 7.主机离线 8.dump失败

export default getFile;
