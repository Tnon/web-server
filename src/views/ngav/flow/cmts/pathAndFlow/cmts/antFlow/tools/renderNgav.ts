/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-24 14:01:47
 * @LastEditTime: 2023-02-22 20:08:52
 */
import G6, { ModelConfig, IGroup, GraphOptions } from '@antv/g6';
import type { Node, EdgeType } from './type';
import { judgeNode, judgeBehavior, matchEdge, useJudgePathPoint } from '.';
import useCreatDraw from '@/hooks/use-click-row';
import flowNodeDrawer from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/cmts/processDraw';
import { PathCi } from '@/views/ngav/flow/type';

//最外层节点的大小（矩形）
const ProcessInfo = {
  width: 200,
  height: 200,
};
//圆形图标的大小和位置
const MainIconInfo = {
  width: 38,
  height: 38,
  top: 10,
  left: 10,
  imgSize: {
    width: 24,
    height: 24,
  },
};
//label的位置
const LabelTextInfo = {
  top: 32,
  left: 52,
};
// 小节点容器的位置
const BehaviorContainer = {
  top: 54,
  left: 54,
};
//小节点大小
const BehaviorInfo = {
  width: 22,
  height: 22,
  marginRight: 8,
  imgSize: {
    width: 14,
    height: 14,
  },
};
//基础配置项
export const baseOption: GraphOptions = {
  container: '',
  fitCenter: true,
  renderer: 'svg',
  linkCenter: true,
  // 'drag-node',
  modes: {
    default: ['drag-canvas', 'zoom-canvas'],
  },
  layout: {
    type: 'dagre',
    rankdir: 'LR', //左到右
    align: 'UL',
    nodesep: 50, //竖直方向距路
    ranksep: 80, //水平方向
    controlPoints: true,
  },
  defaultNode: {
    type: 'icon-node',
    // size: [1, 400],
  },
  defaultEdge: {
    type: 'node-edge',
  },
};

//自定义节点
const { registerNode, registerEdge } = G6;
//主机节点
registerNode('icon-node', {
  draw(cfg: Node & ModelConfig, group: IGroup) {
    //外部样式
    const {
      iconContainerStyle,
      nodeStyle,
      labelStyle,
      behavitorContainerStyle,
      loadingStyle,
      loadingType,
      backStyle,
      backType,
      iconStyle,
      iconType,
    } = judgeNode(
      cfg.icon,
      cfg.level,
      cfg.status,
      cfg.flag,
      ProcessInfo,
      MainIconInfo,
      LabelTextInfo,
      BehaviorContainer,
    );
    const children = cfg.children;
    let behaviorStr = '';
    children?.forEach((ele) => {
      const {
        behaviorContainerStyle,
        behaviorBackStyle,
        behaviorBackType,
        behaviorIconStyle,
        behaviorIconType,
      } = judgeBehavior(
        ele.icon,
        ele.level,
        cfg.status, // 运行状态，决定透明度
        BehaviorInfo,
      );
      behaviorStr =
        behaviorStr +
        `
        <div style="${behaviorContainerStyle}">
          <svg class='icon' aria-hidden="true" style="${behaviorBackStyle}">
            <use xlink:href="${behaviorBackType}" />
          </svg>
          <svg class='icon' aria-hidden="true" style="${behaviorIconStyle}">
            <use xlink:href="${behaviorIconType}" />
          </svg>
        </div>
        `;
    });
    const shapNode = group.addShape('dom', {
      attrs: {
        width: ProcessInfo.width,
        height: ProcessInfo.height,
        html: `
        <div style="${nodeStyle}">
          <div style="${iconContainerStyle}">
            <svg class='icon' aria-hidden="true" style="${loadingStyle}">
              <use xlink:href="${loadingType}" />
            </svg>
            <svg class='icon' aria-hidden="true" style="${backStyle}">
              <use xlink:href="${backType}" />
            </svg>
            <svg class='icon' aria-hidden="true" style="${iconStyle}">
              <use xlink:href="${iconType}" />
            </svg>
          </div>
          <span title="${cfg.label}" style="${labelStyle}">
            ${cfg.label}
          </span>
          <div style="${behavitorContainerStyle}">
            ${behaviorStr}
          </div>
        </div>
              `,
        // html: `
        //       <div style="${nodeStyle}">
        //         <div style="${imgContainerStyle}">
        //           <img style="${extraimgStyle}" src='${extraImgSrc}'/>
        //           <img style="${imgStyle}" src='${src}'/>
        // <svg class="svg-icon icon" aria-hidden="true">
        //   <use xlink:href="#ax-icon_weihu-weihu" />
        // </svg>
        //         </div>
        //         <span title="${cfg.label}" style="${labelStyle}">
        //           ${cfg.label}
        //         </span>
        //         <div style="${behavitorContainerStyle}">
        //           ${behaviorStr}
        //         </div>
        //       </div>
        //             `,
      },
      name: 'dom-main',
    });

    // 绘制节点里面的小圆。点击使用
    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: ProcessInfo.width,
        height: ProcessInfo.height,
        fill: '#fff',
        opacity: 0,
        cursor: 'pointer',
      },
      name: 'rect-shape',
    });
    return shapNode;
  },
});

//自定义边
registerEdge('node-edge', {
  draw(cfg: ModelConfig, group: IGroup) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    // 匹配边类型，确定边颜色和箭头样式
    const { color, startArrowShape, endArrowShape } = matchEdge(cfg.edgeType as EdgeType);
    const { startX, startY, endX, endY } = useJudgePathPoint(
      startPoint,
      endPoint,
      ProcessInfo,
      MainIconInfo,
    );
    const shape = group.addShape('path', {
      attrs: {
        stroke: color,
        // fill: color,
        lineWidth: 1.5,
        startArrow: startArrowShape
          ? {
              path: G6.Arrow[startArrowShape](4, 4, -4),
              d: -4,
            }
          : false,

        endArrow: endArrowShape
          ? {
              path: G6.Arrow[endArrowShape](4, -4, 0),
              d: 0,
            }
          : false,
        path: [
          ['M', startX, startY],
          // ['L', startX, endY],
          ['L', endX, endY],
        ],
      },
      name: 'path-shape',
    });
    return shape;
  },
  afterDraw(cfg, group: IGroup) {
    // get the first shape in the group, it is the edge's path here=
    const shape = group.get('children')[0];
    // the start position of the edge's path
    const startPoint = shape.getPoint(0);

    // add red circle shape
    const circle = group.addShape('circle', {
      attrs: {
        x: startPoint.x,
        y: startPoint.y,
        fill: '#000',
        r: 1.8,
      },
      name: 'circle-shape',
    });

    // animation for the red circle
    circle.animate(
      (ratio) => {
        // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
        // get the position on the edge according to the ratio
        const tmpPoint = shape.getPoint(ratio);
        // returns the modified configurations here, x and y here
        return {
          x: tmpPoint.x,
          y: tmpPoint.y,
        };
      },
      {
        repeat: true, // Whether executes the animation repeatly
        duration: 3000, // the duration for executing once
      },
    );
  },
});

export const renderNGAV = (data, selectedCiInfo: PathCi) => {
  const graph = new G6.Graph(
    Object.assign({}, baseOption, { container: document.getElementById('mountNode')! }),
  );
  graph.data(data); // 读取 Step 2 中的数据源到图上
  graph.render(); // 渲染图
  graph.on('rect-shape:click', (eve) => {
    useCreatDraw(
      {
        title: 'viewNodeDetailDrawInstance',
        contentProps: {
          node_id: eve.item?._cfg?.model?.id,
          detail_id: selectedCiInfo.detail_id,
          node_status: eve.item?._cfg?.model?.status,
          drawClass: 'noHeader',
        },
      },
      flowNodeDrawer,
    );
  });
  // if (typeof window !== 'undefined')
  //   window.onresize = () => {
  //     if (!graph || graph.get('destroyed')) return;
  //     const container = document.getElementById('mountNode');
  //     if (!container) return;
  //     graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
  //   };
  return graph;
};
