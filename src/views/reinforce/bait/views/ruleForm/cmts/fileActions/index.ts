/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 16:39:00
 * @LastEditTime: 2023-07-14 16:59:08
 */
import { E_File_Action, E_File_Mode } from '../form/type';
import fileActions from './index.vue';

export const getFileConfigs = (t) => {
  return [
    {
      label: t('reinforce.file_xr'),
      value: E_File_Action.Write,
      mode: E_File_Mode.NoMonitor,
    },

    {
      label: t('reinforce.file_cmm'),
      value: E_File_Action.Rename,
      mode: E_File_Mode.NoMonitor,
    },
    {
      label: t('reinforce.file_sc'),
      value: E_File_Action.Delete,
      mode: E_File_Mode.NoMonitor,
    },
  ];
};
export const getFileActionName = (type, t) => {
  let labelName = '';
  const allActions = getFileConfigs(t);
  allActions.forEach((ele) => {
    if (ele.value === type) {
      labelName = ele.label;
    }
  });
  return labelName;
};
export default fileActions;
