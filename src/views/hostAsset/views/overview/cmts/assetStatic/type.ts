/*
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-28 13:51:59
 * @LastEditTime: 2023-07-19 11:27:40
 */
interface Node {
  title: string;
  number: number;
  icon: string;
  router?: string;
}
type Vul = 'kernel' | 'app' | 'web';
type Risk = 'weakpwd' | 'appweakpwd' | 'apprisk' | 'sysrisk' | 'accrisk';
type Asset =
  | 'host'
  | 'process'
  | 'port'
  | 'account'
  | 'service'
  | 'kernel'
  | 'env'
  // | 'share' // 1025去掉共享文件夹
  | 'webservice'
  | 'webframe'
  | 'website'
  | 'webapp'
  | 'app'
  | 'database'
  | 'package'
  | 'jar'
  | 'python'
  | 'npm'
  | 'task'
  | 'xinetd'
  | 'webjs'
  | 'webapi';
type RiskType = Record<Risk, Node>;
type AssetType = Record<Asset, Node>;

export interface StaticType {
  risk: RiskType;
  asset: AssetType;
  vul: Record<Vul, Node>;
}
