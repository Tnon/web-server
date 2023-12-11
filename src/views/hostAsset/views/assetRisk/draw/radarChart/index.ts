/*
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-07 19:26:07
 * @LastEditTime: 2022-09-28 16:11:09
 */
import radarChart from './index.vue';
import { VersionType, CVSSTWOType, CVSSTHREEType } from '../type';

export const getRadarConfig = (t: any, version: VersionType): CVSSTWOType | CVSSTHREEType => {
  const allConfigData: { 2: CVSSTWOType; 3: CVSSTHREEType } = {
    // 版本二（CVSS2.0）评分指标
    2: {
      // AV '攻击途径'
      AV: {
        indicatorItem: { text: t('asset.cvssVector'), max: 1, min: 0.395 },
        descriptions: {
          N: t(`asset.cvssNetwork`), // '远程攻击'
          A: t(`asset.cvssAdjacent`), // '近源攻击'
          L: t(`asset.cvssLocal`), // '本地攻击'
        },
      },
      // A '可用性'
      A: {
        indicatorItem: { text: t(`asset.cvssAvailability`), max: 0.66, min: 0 },
        descriptions: {
          C: t(`asset.cvssComplete`), // '高'
          P: t(`asset.cvssPartial`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // I '完整性
      I: {
        indicatorItem: { text: t(`asset.cvssIntegrity`), max: 0.66, min: 0 },
        descriptions: {
          C: t(`asset.cvssComplete`), // '高'
          P: t(`asset.cvssPartial`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // C '机密性'
      C: {
        indicatorItem: { text: t(`asset.cvssConfidentiality`), max: 0.66, min: 0 },
        descriptions: {
          C: t(`asset.cvssComplete`), // '高'
          P: t(`asset.cvssPartial`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // Au '认证'
      Au: {
        indicatorItem: { text: t(`asset.cvssAuthentication`), max: 0.704, min: 0.45 },
        descriptions: {
          N: t(`asset.cvssNo`), // '无需认证'
          S: t(`asset.cvssSingle`), // '单实例认证'
          M: t(`asset.cvssMultiple`), // '多实例认证'
        },
      },
      // AC '攻击复杂度'
      AC: {
        indicatorItem: { text: t(`asset.cvssComplexity`), max: 0.71, min: 0.35 },
        descriptions: {
          L: t(`asset.cvssLow`), // '低'
          M: t(`asset.cvssMedium`), // '中'
          H: t(`asset.cvssHigh`), // '高'
        },
      },
    },
    // 版本3（CVSS3）评分指标
    3: {
      // AV '攻击途径'
      AV: {
        indicatorItem: { text: t(`asset.cvssVector`), max: 0.85, min: 0.2 }, // '攻击途径',
        descriptions: {
          N: t(`asset.cvssNetwork`), // '远程攻击'
          A: t(`asset.cvssAdjacent`), // '近源攻击'
          L: t(`asset.cvssLocal`), // '本地攻击'
          P: t(`asset.cvssPhysical`), // '物理攻击'
        },
      },
      // 可用性
      A: {
        indicatorItem: { text: t(`asset.cvssAvailability`), max: 0.56, min: 0 },
        descriptions: {
          H: t(`asset.cvssHigh`), // '高'
          L: t(`asset.cvssLow`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // I '完整性
      I: {
        indicatorItem: { text: t(`asset.cvssIntegrity`), max: 0.56, min: 0 },
        descriptions: {
          H: t(`asset.cvssHigh`), // '高'
          L: t(`asset.cvssLow`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // C '机密性'
      C: {
        indicatorItem: { text: t(`asset.cvssConfidentiality`), max: 0.56, min: 0 },
        descriptions: {
          H: t(`asset.cvssHigh`), // '高'
          L: t(`asset.cvssLow`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // UI:'用户交互'
      UI: {
        indicatorItem: { text: t(`asset.cvssInteraction`), max: 0.85, min: 0.62 }, // '用户交互'
        descriptions: {
          R: t(`asset.cvssRequired`), // 需要
          N: t(`asset.cvssNoneRequired`), // 无需
        },
      },

      // PR '权限要求'
      PR: {
        indicatorItem: { text: t(`asset.cvssPrivileges`), max: 0.85, min: 0.27 }, // '权限要求',
        descriptions: {
          H: t(`asset.cvssHigh`), // '高'
          L: t(`asset.cvssLow`), // '低'
          N: t(`asset.cvssNone`), // '无'
        },
      },
      // AC '攻击复杂度'
      AC: {
        indicatorItem: { text: t(`asset.cvssComplexity`), max: 0.77, min: 0.44 },
        descriptions: {
          L: t(`asset.cvssLow`), // '低'
          H: t(`asset.cvssHigh`), // '高'
        },
      },
    },
  };

  return allConfigData[version];
};
export default radarChart;
