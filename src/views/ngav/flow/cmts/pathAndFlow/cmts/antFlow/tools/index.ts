/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-24 17:30:57
 * @LastEditTime: 2022-10-11 17:32:46
 */
import { EdgeType, NodeIcon, NodeLevel, NodeStatus, BehaviorIcon, Node_BehaviorBack } from './type';
//判断进程图标的函数
export const commonJudgeProcessIcon = (
  icon: NodeIcon,
  level: NodeLevel,
  status: NodeStatus,
  flag: Node_BehaviorBack,
) => {
  //是否显示外部loading
  let showLoading = 'none';
  //loading的颜色
  let loadingColor = '#000';
  //loading图标（1）
  let loadingType = '#ax-n-nodeloading';
  //透明度
  let outerOpacity = 1;

  //节点的颜色
  let backColor = '#000';
  //节点的图标（2）
  let backType = '#ax-n-nodeprocess';

  //内部小图标（3）
  let iconType = '#ax-process';
  //内部小图标的颜色
  const iconColor = '#fff';
  //判断大饼和盾牌的颜色
  switch (level) {
    case NodeLevel.Host: //主机色
      backColor = '#000';
      break;
    case NodeLevel.Ip: //IP颜色
      backColor = '#587BF5';
      break;
    case NodeLevel.High: //进程 高危红色
      backColor = '#F75555';
      break;
    case NodeLevel.Middle: //进程 中危橙色
      backColor = '#F8A556';
      break;
    case NodeLevel.Low: //进程 低危黄色
      backColor = '#F6C84D';
      break;
    case NodeLevel.NotDetection: //未检测到
      backColor = '#888888';
      break;
    case NodeLevel.Safe: //进程 已处理绿色
      backColor = '#18BA79';
      break;
    case NodeLevel.DunP: //盾牌 绿色
      backColor = '#18BA79';
      break;
  }

  //判断转圈/大圈/没圈/透明度
  switch (status) {
    case NodeStatus.Loading:
      showLoading = 'block';
      loadingColor = backColor;
      loadingType = '#ax-n-nodeloading'; //icon用转圈的
      outerOpacity = 1;
      break;
    case NodeStatus.Exist:
      showLoading = 'none';
      loadingColor = '';
      loadingType = ''; //icon用空
      outerOpacity = 1;
      break;
    case NodeStatus.NoExist:
      showLoading = 'none';
      loadingColor = '';
      loadingType = ''; //icon用空
      outerOpacity = 0.3;
      break;
    case NodeStatus.ExistQ:
      showLoading = 'block';
      loadingColor = backColor;
      loadingType = '#ax-n-nodeabnormal'; //icon用大圈
      outerOpacity = 1;
      break;
    case NodeStatus.NoExistQ:
      showLoading = 'block';
      loadingColor = backColor;
      loadingType = '#ax-n-nodeabnormal'; //icon用大圈
      outerOpacity = 0.3;
      break;
  }
  //判断大饼还是盾牌
  switch (flag) {
    case Node_BehaviorBack.Lan:
      backType = '#ax-n-nodeprotect'; //icon用盾牌
      break;
    case Node_BehaviorBack.UnLan:
      backType = '#ax-n-nodeprocess'; //icon用大饼
      break;
  }

  switch (icon) {
    case NodeIcon.Host: //主机
      iconType = '#ax-host'; //icon用主机
      break;
    case NodeIcon.Ip: //ip
      iconType = '#ax-icon_gongji-IP'; //icon用Ip
      break;
    case NodeIcon.Single: //进程单个
      iconType = '#ax-process'; //icon用单个进程
      break;
    case NodeIcon.PM: //权限维持
      iconType = '#ax-n-maintenanceauthority'; //icon用权限维持
      break;
    case NodeIcon.PO: //权限获取
      iconType = '#ax-limitsauthority'; //icon用权限获取
      break;
    case NodeIcon.PR: //内网探测
      iconType = '#ax-n-intranetdetection'; //icon用内网探测
      break;
    case NodeIcon.CE: //控制执行
      iconType = '#ax-n-executivecontrol'; //icon用控制执行
      break;
    case NodeIcon.SV: //窃取破坏
      iconType = '#ax-n-stealdestroy'; //icon用窃取破坏
      break;
  }
  return {
    showLoading,
    loadingColor,
    loadingType,
    backColor,
    backType,
    iconColor,
    iconType,
    outerOpacity,
  };
};
//判断行为图标的函数
export const commonJudgeBehaviorIcon = (
  icon: BehaviorIcon,
  level: Node_BehaviorBack,
  status: NodeStatus,
) => {
  let outerOpacity = 1;

  // 节点外部类型（4）
  let behaviorBackType = '#ax-n-nodeprocess';
  // 节点外部颜色
  let behaviorBackColor = 'rgba(247, 85, 85, .3)';

  //节点图标的颜色
  const behaviorIconColor = '#fff';
  //节点的图标（5）
  let behaviorIconType = '#ax-n-attackimplement';
  //透明度 根据大节点的
  switch (status) {
    case NodeStatus.Loading:
      outerOpacity = 1;
      break;
    case NodeStatus.Exist:
      outerOpacity = 1;
      break;
    case NodeStatus.NoExist:
      outerOpacity = 0.3;
      break;
    case NodeStatus.ExistQ:
      outerOpacity = 1;
      break;
    case NodeStatus.NoExistQ:
      outerOpacity = 0.3;
      break;
  }
  //盾牌还是大饼
  switch (level) {
    case Node_BehaviorBack.Lan:
      behaviorBackType = '#ax-n-nodeprotect'; //icon用盾牌
      behaviorBackColor = '#18BA79'; //盾牌绿色
      break;
    case Node_BehaviorBack.UnLan:
      behaviorBackType = '#ax-n-nodeprocess'; //icon用大饼
      behaviorBackColor = 'rgba(247,85,85,0.3)'; //大饼透明色
      break;
  }
  //小图标类型
  switch (icon) {
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-credentialAccess'; //icon用凭证访问
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-permissionpromotion'; //icon用权限提升
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-persistence'; //icon用持久化
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-detectionbypass'; //icon用检测绕过
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-intranetdetection'; //icon用内网探测
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-commandcontrol'; //icon用命令控制
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-attackimplement'; //icon用攻击执行
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-datainterception'; //icon用数据盗窃
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-fileimplement'; //icon用文件操作
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-networkoperation'; //icon用网络操作
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-processoperation'; //icon用进程操作
      break;
    case BehaviorIcon.CredentialsAccess:
      behaviorIconType = '#ax-n-memoryoperation'; //icon用内存操作
      break;
  }
  return {
    behaviorBackType,
    behaviorBackColor,
    behaviorIconColor,
    behaviorIconType,
    outerOpacity,
  };
};
//生成图标的样式
export const judgeNode = (
  icon: NodeIcon,
  level: NodeLevel,
  status: NodeStatus,
  flag: Node_BehaviorBack,
  ProcessInfo,
  MainIconInfo,
  LabelTextInfo,
  BehaviorContainer,
) => {
  const {
    showLoading,
    loadingColor,
    loadingType,
    backColor,
    backType,
    iconColor,
    iconType,
    outerOpacity,
  } = commonJudgeProcessIcon(icon, level, status, flag);
  return {
    //最外层矩形
    nodeStyle: `
    width: ${ProcessInfo.width}px;
    height: ${ProcessInfo.height}px;
    border-radius: 8px;
    position: relative;
    `,
    //节点容器
    iconContainerStyle: `
    width: ${MainIconInfo.width}px;
    height: ${MainIconInfo.height}px;
    position: absolute;
    top: ${MainIconInfo.top}px;
    left: ${MainIconInfo.left}px;
    opacity:${outerOpacity};
    transform: ${icon === 1 ? 'scale(1.5)' : 'none'};
    z-index:10
    `,
    //外层loading
    loadingStyle: `
    width: ${MainIconInfo.width + 6}px;
    height: ${MainIconInfo.height + 6}px;
    color:${loadingColor};
    position: absolute;
    animation: rotate ${loadingType === '#ax-n-nodeloading' ? 2 : 0}s linear infinite;
    top: -3px;
    left: -3px;
    display:${showLoading}
    `,
    loadingType: loadingType,
    //背景图标
    backStyle: `
    width: ${MainIconInfo.width}px;
    height: ${MainIconInfo.height}px;
    color:${backColor};
    position: absolute;
    top: 0px;
    left: 0px;
    z-index:1;
    `,
    backType: backType,
    //最小图标
    iconStyle: `
    width: ${MainIconInfo.imgSize.width}px;
    height: ${MainIconInfo.imgSize.height}px;
    color:${iconColor};
    position: absolute;
    top:${(MainIconInfo.width - MainIconInfo.imgSize.width) / 2}px;
    left: ${(MainIconInfo.height - MainIconInfo.imgSize.height) / 2}px;
    z-index:2;
    `,
    iconType: iconType,
    labelStyle: `
      position: absolute;
      top: ${LabelTextInfo.top}px;
      left: ${LabelTextInfo.left}px;
      font-size: @fz14;
      font-weight: 600;
      background:#fff;
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    behavitorContainerStyle: `
    position: absolute;
    top: ${BehaviorContainer.top}px;
    left: ${BehaviorContainer.left}px;
    background:#fff;
    `,
  };
};
//生成行为的样式
export const judgeBehavior = (
  icon: BehaviorIcon,
  level: Node_BehaviorBack,
  status: NodeStatus,
  BehaviorInfo,
) => {
  const { behaviorBackType, behaviorBackColor, behaviorIconColor, behaviorIconType } =
    commonJudgeBehaviorIcon(icon, level, status);

  return {
    behaviorContainerStyle: `
            width: ${BehaviorInfo.width}px;
            height: ${BehaviorInfo.height}px;
            margin-right:${BehaviorInfo.marginRight}px;
            position:relative;
            display:inline-block
        `,
    behaviorBackStyle: `
        width: ${BehaviorInfo.width}px;
        height: ${BehaviorInfo.height}px;
        color:${behaviorBackColor};
        position:absolute;
        top:0px;
        left:0px;
    `,
    behaviorBackType: behaviorBackType,
    behaviorIconStyle: `
        width: ${BehaviorInfo.imgSize.width}px;
        height: ${BehaviorInfo.imgSize.height}px;
        color:${behaviorIconColor};
        position:absolute;
        top:${(BehaviorInfo.width - BehaviorInfo.imgSize.width) / 2}px;
        left:${(BehaviorInfo.height - BehaviorInfo.imgSize.height) / 2}px;
    `,
    behaviorIconType: behaviorIconType,
  };
};

//判断使用边的类型（1常规；2注入；3主机；4IP）
export const matchEdge = (edgetype: EdgeType) => {
  let color, startArrowShape, endArrowShape;
  switch (edgetype) {
    case EdgeType.Normal:
      color = 'rgba(0,0,0,.5)';
      break;
    case EdgeType.Inject:
      color = '#D066EA';
      startArrowShape = 'rect';
      endArrowShape = 'triangle';
      break;
    case EdgeType.Host:
      color = 'rgba(0,0,0,.5)';
      break;
    case EdgeType.Ip:
      color = '#587BF5';
      endArrowShape = 'triangle';
      break;
  }
  return { color, startArrowShape, endArrowShape };
};

//判断连接点位置的函数
export const useJudgePathPoint = (startPoint, endPoint, ProcessInfo, MainIconInfo) => {
  const pointObj = { startX: 0, startY: 0, endX: 0, endY: 0 };
  const { x: Sx, y: Sy } = startPoint;
  const { x: Ex, y: Ey } = endPoint;
  pointObj.startX = Sx - (ProcessInfo.width / 2 - MainIconInfo.width - MainIconInfo.left * 2);
  pointObj.startY = Sy - (ProcessInfo.height / 2 - MainIconInfo.height / 2 - MainIconInfo.top);

  pointObj.endX = Ex - ProcessInfo.width / 2;
  pointObj.endY = Ey - (ProcessInfo.height / 2 - MainIconInfo.height / 2 - MainIconInfo.top);
  return pointObj;
};
