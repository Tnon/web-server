/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 17:12:05
 * @LastEditTime: 2023-07-24 13:52:16
 */
export interface PackageState {
  //包版本
  package_version: string;
  // agent版本
  agent_version: string;
  //驱动库版本
  driver_version: string;
  //更新时间
  created_at: string;
  //包大小
  package_size: string;
  //适用系统
  supports: string;
  //是否可以撤回
  enable_recall: boolean;
  //是否正在合并
  is_merge: Boolean;
}
export interface SwiSta {
  actived: 'agent' | 'driver';
  showDetail: boolean;
}
export const enum ServerPkgType {
  Base = 1,
  Upgrade,
}
export interface ServerPackageState {
  //包版本
  version: string;
  //基础包版本
  base_pkg_version: string;
  //升级包版本
  upgrade_pkg_version: string;
  //更新时间
  release_at: string;
  //包类型
  package_type: ServerPkgType;
  //是否正在合并
  is_merge: Boolean;
}
export type PackageMsg = {
  linux: Partial<PackageState>;
  server: Partial<ServerPackageState>;
};
