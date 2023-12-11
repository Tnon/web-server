/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 15:22:23
 * @LastEditTime: 2023-08-01 11:13:49
 */
import { findLastIndex } from '@/utils/tools';
import { E_WB_Enum } from '@/views/strategy/common/types';
import helpTips from './index.vue';
import { E_Rules } from './type';
import { validateAttrbuite } from './valueReg';

export const useStaticConfigs = (type: E_WB_Enum) => {
  //增加属性需要改动
  return {
    rule:
      type === E_WB_Enum.Black
        ? ['equl', 'cont', 'blong', 'repm']
        : ['equl', 'cont', 'blong', 'repm', 'hzpp', 'regpp'],
    attr:
      type === E_WB_Enum.Black
        ? ['file_md5', 'process_name', 'process_all_path', 'attack_ip', 'url_path']
        : [
            'file_md5',
            'file_dir',
            'access_dir',
            'process_name',
            'process_all_path',
            'sys_execute_command',
            'web_execute_command',
            'web_attack_ip',
            'sys_attack_ip',
            'extranet_ip',
            'url_path',
            'xff_ip',
            'referer',
            'xml',
            'ssrf',
            'access_file_path',
            'upload_file_name',
            'request_class_name',
            'so_file_path',
            'execute_file_path',
            'mem_class',
            'contab',
            'kernel_moudle',
            'dnslog',
          ],
  };
};

//动态获取属性值的placeholder
export const getDymicAttrPlaceholder = (t, attribute, rules?) => {
  return t('arcomn.plipt', [
    attribute?.includes('_ip')
      ? rules === E_Rules.Belong
        ? t('arcomn.' + (attribute ?? 'attr') + '_plac_ip')
        : rules === E_Rules.Equal
        ? t('arcomn.' + (attribute ?? 'attr') + '_plac')
        : t('arcomn.attr_plac')
      : t('arcomn.' + (attribute ?? 'attr') + '_plac'),
  ]);
};
//动态获取属性值的正则
export const getDymicAttrRegs = (attribute, rules) => {
  // Equal = 1, //等于
  // Contain, //包含
  // Belong, //属于
  // Prefix, //前缀匹配
  // Suffix, //后缀匹配
  // Reg, //通配匹配
  let ruleStr = '';
  if (rules === E_Rules.Equal) {
    ruleStr = 'equal';
  } else if (rules === E_Rules.Contain) {
    ruleStr = 'contain';
  } else if (rules === E_Rules.Belong) {
    ruleStr = 'belong';
  } else if (rules === E_Rules.Prefix) {
    ruleStr = 'prefix';
  } else if (rules === E_Rules.Suffix) {
    ruleStr = 'suffix';
  } else if (rules === E_Rules.Reg) {
    ruleStr = 'reg';
  }

  return validateAttrbuite(attribute, ruleStr);
};
//查看是否具有相同的属性值
export const isHaveSameValue = (attr_values) => {
  const validator = (_, value) => {
    if (value) {
      if (
        attr_values.findIndex((ele) => ele.value === value) ===
        findLastIndex(attr_values, (ele) => ele.value === value)
      ) {
        return Promise.resolve();
      }
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  };
  return validator;
};

export default helpTips;
