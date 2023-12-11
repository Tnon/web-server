/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-11 18:25:18
 * @LastEditTime: 2022-12-20 10:24:05
 */
import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import { TableColumn } from '@/types/tableColumn';
import { vulRiskLevel } from '@/enums/assetsType';
import vulLevel from '@/views/hostAsset/components/vulLevel';
import columnMulData from '@/views/hostAsset/components/columnMulData';
import { Language } from '@/enums/language';

export const getapi_columnsDetail = (type: string, T: any, currentLang: Language) => {
  const api_columnsDetail: {
    [k: string]: TableColumn[];
  } = {
    Pro: [
      {
        title: T('asset.hostIp'), // 主机IP
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },

      {
        title: T('asset.systemVersion'), // 系统、应用版本
        dataIndex: 'app_version',
        width: 200,
        customRender: ({ text }) =>
          text.length === 0 ? '-' : createVNode(columnMulData, { dataList: text }),
      },
      {
        title: T('asset.vulnerabilityName'), // 漏洞名称
        dataIndex: 'title',
        hidden: currentLang === Language.EN, // 英文模式下不展示此字段
        width: 150,
      },
      {
        title: T('asset.vulnerabilityCode'), // 漏洞编号
        dataIndex: 'cve_code',
        width: 150,
      },
      {
        title: T('asset.vulnerabilityType'), // 漏洞类型
        dataIndex: 'vul_type',
        width: 150,
      },
      {
        title: T('asset.affect'), // 影响范围
        dataIndex: 'scope',
        width: 200,
        customRender: ({ text }) =>
          text.length === 0
            ? '-'
            : createVNode(columnMulData, {
                dataList: text,
              }),
      },
      {
        title: T('asset.publishTime'), // 公布时间
        dataIndex: 'public_date',
        width: 150,
      },
      {
        title: T('asset.riskLevel'), // 危险程度
        dataIndex: 'level',
        width: 150,
        customRender: ({ text }) =>
          !text ? '-' : createVNode(vulLevel, { colorList: vulRiskLevel, level: text }),
      },
      {
        title: T('asset.riskScore'), // 风险评分
        dataIndex: 'cvss_score',
        width: 100,
      },
      {
        title: T('asset.discoveryTime'), // 发现时间
        dataIndex: 'created_at',
        width: 150,
      },
      {
        title: T('asset.vulnerabilityDetail'), // 漏洞详情
        dataIndex: 'detail',
        width: 150,
      },
    ],
    Ip: [
      {
        title: T('asset.vulnerabilityName'), // 漏洞名称
        dataIndex: 'title',
        hidden: currentLang === Language.EN, // 英文模式下不展示此字段
        width: 150,
      },
      {
        title: T('asset.vulnerabilityCode'), // 漏洞编号
        dataIndex: 'cve_code',
        width: 150,
      },
      {
        title: T('asset.vulnerabilityType'), // 漏洞类型
        dataIndex: 'vul_type',
        width: 150,
      },
      {
        title: T('asset.affect'), // 影响范围
        dataIndex: 'scope',
        width: 150,
        customRender: ({ text }) =>
          text.length === 0 ? '-' : createVNode(columnMulData, { dataList: text }),
      },
      {
        title: T('asset.publishTime'), // 公布时间
        dataIndex: 'public_date',
        width: 150,
      },
      {
        title: T('asset.riskLevel'), // 危险程度
        dataIndex: 'level',
        width: 150,
        customRender: ({ text }) =>
          !text ? '--' : createVNode(vulLevel, { colorList: vulRiskLevel, level: text }),
      },
      {
        title: T('asset.riskScore'), // 风险评分
        dataIndex: 'cvss_score',
        width: 100,
      },
      {
        title: T('asset.systemVersion'), // 系统、应用版本
        dataIndex: 'app_version',
        width: 150,
        customRender: ({ text }) =>
          text.length === 0 ? '-' : createVNode(columnMulData, { dataList: text }),
      },
      {
        title: T('asset.discoveryTime'), // 发现时间
        dataIndex: 'created_at',
        width: 150,
      },
      {
        title: T('asset.vulnerabilityDetail'), // 漏洞详情
        dataIndex: 'detail',
        width: 150,
      },
    ],
  };
  return api_columnsDetail[type];
};
