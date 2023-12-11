/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 18:01:25
 * @LastEditTime: 2023-10-31 15:18:14
 */
export interface cvssType {
  score: string;
  version: number;
  [k: string]: any;
}

export interface detailType {
  cve_code: string;
  description: string;
  level: number;
  platforms: string;
  proposal: string;
  refs: string[];
  scope: string[];
  title: string;
  vul_category: string;
  verify_type: number;
  current_version: string[];
  related_info: string[];
}

export type VersionType = 2 | 3; // CVSS的版本（取整）

export interface IndicatorType {
  text: string;
  max?: number;
  min?: number;
}
export interface RadarItemType {
  indicatorItem: IndicatorType;
  descriptions: { [k: string]: string };
}

type CVSSTWO = 'AV' | 'A' | 'I' | 'C' | 'Au' | 'AC';
type CVSSTHREE = 'AV' | 'A' | 'I' | 'C' | 'UI' | 'PR' | 'AC';

export type CVSSTWOType = Record<CVSSTWO, RadarItemType>;
export type CVSSTHREEType = Record<CVSSTHREE, RadarItemType>;
