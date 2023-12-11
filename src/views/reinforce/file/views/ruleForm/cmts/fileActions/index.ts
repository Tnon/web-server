/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 16:39:00
 * @LastEditTime: 2023-03-07 12:01:05
 */
import { E_File_Action, E_File_Protect } from '../form/type';
import fileActions from './index.vue';

export const getFileConfigs = (t) => {
  return [
    {
      label: t('reinforce.file_dq'),
      value: E_File_Action.Read,
      mode: E_File_Protect.None,
    },
    {
      label: t('reinforce.file_xr'),
      value: E_File_Action.Write,
      mode: E_File_Protect.None,
    },
    // {
    //   label: t('reinforce.file_zx'),
    //   value: E_File_Action.Exec,
    //   mode: E_File_Protect.None,
    // },
    {
      label: t('reinforce.file_cmm'),
      value: E_File_Action.Rename,
      mode: E_File_Protect.None,
    },
    {
      label: t('reinforce.file_yc'),
      value: E_File_Action.Hide,
      mode: E_File_Protect.None,
    },
    {
      label: t('reinforce.file_sc'),
      value: E_File_Action.Delete,
      mode: E_File_Protect.None,
    },
    {
      label: t('reinforce.file_cj'),
      value: E_File_Action.Create,
      mode: E_File_Protect.None,
    },
    {
      label: t('reinforce.file_lj'),
      value: E_File_Action.Link,
      mode: E_File_Protect.None,
    },
    // {
    //   label: t('reinforce.file_sxbg'),
    //   value: E_File_Action.ChAttr,
    //   mode: E_File_Protect.None,
    // },
    {
      label: t('reinforce.file_qxbg'),
      value: E_File_Action.ChPerm,
      mode: E_File_Protect.None,
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
