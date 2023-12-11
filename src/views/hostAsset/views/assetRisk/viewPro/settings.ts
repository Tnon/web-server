/*
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2022-09-28 09:52:55
 */
import api from '@/api/asset';
import { vulRiskLevel } from '@/enums/assetsType';
import { createVNode } from 'vue';
import vulLevel from '@/views/hostAsset/components/vulLevel';
import { Language } from '@/enums/language';
import { vulType } from '@/enums/assetsType';

export const useOptions = (state: any, type: vulType, t: any, currentLang: Language): void => {
  state.columns = [
    {
      title: t(`asset.vulnerabilityName`), // 漏洞名称
      dataIndex: 'title',
      hidden: currentLang === Language.EN, // 英文模式下不展示此字段
      width: 300,
    },
    {
      title: t(`asset.vulnerabilityCode`), // 漏洞编号
      dataIndex: 'cve_code',
      width: 200,
    },
    {
      title: t(`asset.vulnerabilityType`), // 漏洞类型
      dataIndex: 'vul_type',
      width: 200,
      customRender: ({ text }) => (text ? text : '-'),
    },
    {
      title: t(`asset.publishTime`), // 公布时间
      dataIndex: 'public_date',
      width: 200,
    },
    {
      title: t(`asset.riskLevel`), // 危险程度
      dataIndex: 'level',
      width: 100,
      customRender: ({ text }) =>
        !text ? '-' : createVNode(vulLevel, { colorList: vulRiskLevel, level: text }),
    },
    {
      title: t('asset.affectHostNum'), // 影响主机数
      dataIndex: 'affected_entity_count',
      // dataIndex: 'host_count',
      width: 100,
    },
    {
      title: t('asset.vulnerabilityDetail'), // 详情
      dataIndex: 'detail',
      width: 100,
    },
  ];
  // state.placeholder = t('asset.pInput', [t(`asset.${type}NameOrAccount`)]);
  state.placeholder = t('asset.pInput', [t(`asset.vultyNameOrAccount`)]);
  state.title = t(`asset.${type}Num`);
  state.api = api['api_' + type]['getAssetView'];
  state.type = type;
  state.assetTypeApi = '/api/report/' + type + '/assetview';
};
