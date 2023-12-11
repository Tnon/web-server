/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-26 15:05:32
 * @LastEditTime: 2023-03-01 18:52:38
 */
//数据结构体
export interface FlowData {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

//流程图连接线结构体
export interface Edge {
  source: string | number; //源id
  target: string | number; //目标id
  edgeType: EdgeType; //线类型
}

//大图标类型
export const enum NodeIcon {
  Host = 1, //主机
  Ip, //IP
  Single, //进程单个
  PM, //权限维持
  PO, //权限获取
  PR, //内网探测
  CE, //控制执行
  SV, //窃取破坏
}
//大图标颜色
export const enum NodeLevel {
  Host = 1, //主机色
  Ip, //IP颜色
  High, //进程 高危红色
  Middle, //进程 中危橙色
  Low, //进程 低危黄色
  NotDetection, //未检测到
  Safe, //进程 已处理绿色
  DunP, //盾牌绿色
}
//图标状态
export const enum NodeStatus {
  Loading, //未知 转圈
  Exist, //存在 外部什么也没有
  NoExist, //不存在 主机：灰色 网络：未知 进程：未知
  ExistQ, //查询失败 主机：未知 网络：未知 进程：未知
  NoExistQ,
}

//行为小图标
export const enum BehaviorIcon {
  CredentialsAccess = 1, // 凭证访问1
  PrivilegeElevation, // 权限提升2
  Persistence, //持久化3
  DetectBypass, //检测绕过4
  IntranetProbe, // 内网探测5
  CommandControl, // 命令控制6
  AttackExecuted, //攻击执行7
  DataTheft, //数据盗窃8
  FileOperations, // 文件操作9
  NetworkOperations, // 网络操作10
  ProcessOperations, // 进程操作11
  MemoryOperations, // 内存操作12
}
//行为颜色，boolean
export const enum Node_BehaviorBack {
  Lan = 1,
  UnLan,
}

//行为图标结构体
export interface Behavior {
  icon: BehaviorIcon; //行为的图标
  level: Node_BehaviorBack; //行为图标的颜色
  action: string; //行为名称
  trigger_time: string; //行为触发事件
  action_detail: string[]; //行为描述，多个基础行为
  action_content: string; //??
  base_action: string; //基础行为名称
  file_content: string[]; //文件路径
  file_name: string[]; //文件名称路径
}
//流程图节点结构体
export interface Node {
  id: string; //节点id
  label: string; // 节点名
  icon: NodeIcon; //节点图标类型
  level: NodeLevel; //节点颜色
  status: NodeStatus; //节点状态
  flag: Node_BehaviorBack; //节点是否已拦截
  start_time: string; //进程开始时间
  exit_time: string; //进程退出时间
  children?: Behavior[]; //节点子图标
  host_info?: any; //主机信息
  pid_detail_info?: { [k: string]: any }; //进程信息
  network_info?: { [k: string]: any }; //网络信息
  file_detail_info?: { [k: string]: any }; //文件信息
  mac: string;
}

//边的类型
export const enum EdgeType {
  Normal = 1, //正常
  Inject, //注入
  Host, //主机
  Ip, //IP
  BB,
  BG,
  BR,
  GG,
  GR,
  GB,
  RB,
  RG,
  RR,
}
//文件落盘情况
export const enum FileStatus {
  Exist = 1,
  NotExist,
  Error,
}
