/*
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2022-11-10 14:50:30
 * @LastEditTime: 2023-09-05 16:37:08
 */
import engineList from './index.vue';
import { rebkFeaLibVer, rebkSerLibVer } from '@/api/operation/upgrade';
import { UPCLIPKGTYPE, UPSERPKGTYPE } from '@/enums/assetsType';
export type EngineState = {
  icon: string;
  flag: Array<string>;
  title: string;
  recallVerApi: (params: {
    package_id: number;
    type: UPCLIPKGTYPE | UPSERPKGTYPE | undefined;
  }) => any;
  pkgType: UPCLIPKGTYPE | UPSERPKGTYPE | undefined; // pkgType为undefined时说明此接口是独立接口，不用传type
  keyName: string;
};
type EngineType = 'clientEngineConfigs' | 'serverEngineConfigs';
export const getEngineConfigs = (t): Record<EngineType, EngineState[]> => ({
  clientEngineConfigs: [
    //NGAV/ACDR
    {
      icon: '#ax-S-ACDR',
      flag: [t('operation.unknownThreat')], // 右上标签
      title: t('operation.acdrengine'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPCLIPKGTYPE.ACDR,
      keyName: 'acdr',
    },
    //hash
    {
      icon: '#ax-engine-hash',
      flag: [t('operation.virusmm')],
      title: t('operation.hashengine'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPCLIPKGTYPE.HASH,
      keyName: 'hash_featurelib',
    },
    //基线库
    {
      icon: '#ax-S-yujiancejixian',
      flag: [t('operation.virusmm')],
      title: t('operation.baselineengine'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPCLIPKGTYPE.BASELINE,
      keyName: 'precheck_baseline',
    },
    //RASP规则引擎
    {
      icon: '#ax-icon_yinqing-RASP',
      flag: ['RASP'],
      title: t('operation.raspengine'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPCLIPKGTYPE.RASP,
      keyName: 'rasp',
    },
    // 基线规则引擎
    {
      icon: '#ax-icon_yinqing-baseline',
      flag: [t('operation.jxjc')],
      title: t('operation.baselineenginerule'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPCLIPKGTYPE.BASELINERULE,
      keyName: 'baseline',
    },
    // 风险检查规则引擎
    {
      icon: '#ax-icon_yinqing-riskdetection',
      flag: [t('operation.fxjc')],
      title: t('operation.fxjcgzyq'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPCLIPKGTYPE.RISKCHECK,
      keyName: 'riskinspect',
    },
  ],
  serverEngineConfigs: [
    //yara
    {
      icon: '#ax-engine-Yara',
      flag: ['webshell'],
      title: t('operation.yaraengine'),
      recallVerApi: rebkSerLibVer,
      pkgType: UPSERPKGTYPE.YARA,
      keyName: 'yara',
    },
    //ClamAV
    {
      icon: '#ax-engine-ClamAV',
      flag: ['webshell', t('operation.virusmm')],
      title: t('operation.clamavengine'),
      recallVerApi: rebkSerLibVer,
      pkgType: UPSERPKGTYPE.CLAMAV,
      keyName: 'clamav',
    },
    //webshell
    // {
    //   icon: '#ax-engine-Webshell',
    //   flag: ['webshell'],
    //   title: t('operation.webshellengine'),
    //   getInfoApi: getFeatureInfo,
    //   recallVerApi: rebkFeaLibVer,
    // },
    //avira
    {
      icon: '#ax-S-Aviraxiaohongsan',
      flag: [t('operation.virusmm')],
      title: t('operation.aviraengine'),
      recallVerApi: rebkSerLibVer,
      pkgType: UPSERPKGTYPE.AVIRA,
      keyName: 'avira',
    },
    // 漏洞扫描，
    {
      icon: '#ax-S-ziyanloudongyinqing',
      flag: [t('operation.vultyScan')],
      title: t('operation.vultyScanengine'),
      recallVerApi: rebkSerLibVer, // 单独接口
      pkgType: UPSERPKGTYPE.VULNERABILITY, // 单独接口
      keyName: 'vul',
    },
    // 基线规则引擎
    {
      icon: '#ax-icon_yinqing-baseline',
      flag: [t('operation.jxjc')],
      title: t('operation.baselineenginerule'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPSERPKGTYPE.BASELINERULE,
      keyName: 'baseline',
    },
    //安全补丁引擎
    {
      icon: '#ax-icon_yinqing-S-anquanbudingyinqing',
      flag: [t('reinforce.secpatch')],
      title: t('operation.secpatcheng'),
      recallVerApi: rebkSerLibVer,
      pkgType: UPSERPKGTYPE.SECPATCH,
      keyName: 'patch',
    },
    // 虚拟补丁规则引擎
    // {
    //   icon: '#ax-icon_yinqing-C-xunibudingguizeyinqing',
    //   flag: [t('reinforce.virpatch')],
    //   title: t('operation.xnbdgzyq'),
    //   recallVerApi: rebkSerLibVer,
    //   pkgType: UPSERPKGTYPE.VRLPATCH,
    //   keyName: 'virpatch',
    // },
    // 风险检查规则引擎
    {
      icon: '#ax-icon_yinqing-riskdetection',
      flag: [t('operation.fxjc')],
      title: t('operation.fxjcgzyq'),
      recallVerApi: rebkFeaLibVer,
      pkgType: UPSERPKGTYPE.RISKCHECK,
      keyName: 'riskinspect',
    },
  ],
});
export default engineList;
