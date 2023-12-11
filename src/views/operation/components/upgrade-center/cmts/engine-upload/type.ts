/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-11 17:30:12
 * @LastEditTime: 2023-03-09 14:44:27
 */
export interface EngineNodeState {
  package_id: number | undefined;
  version: string;
  size: string;
  created_at: string;
  enable_upgrade: boolean;
  enable_recall: boolean;
  desc: string;
  extra_package_id: number | undefined;
}
export type clientPackage = Record<
  'acdr' | 'hash_featurelib' | 'precheck_baseline' | 'rasp' | 'baseline',
  Partial<EngineNodeState>
>;
export type serverPackage = Record<
  'yara' | 'clamav' | 'avira' | 'vul' | 'baseline',
  Partial<EngineNodeState>
>;

export interface EnginePackageState {
  engine: {
    version: string;
    created_at: string;
  };
  client: clientPackage;
  server: serverPackage;
}
