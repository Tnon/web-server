import { useI18n } from '@/plugins/setupGlobalLocalLang';
import G6, { GraphOptions, IG6GraphEvent, IGroup, ModelConfig } from '@antv/g6';
const t = useI18n();
const tooltip = new G6.Tooltip({
  offsetX: 20,
  offsetY: 30,
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node'],
  // 自定义 tooltip 内容
  getContent: (e: IG6GraphEvent) => {
    const outDiv = document.createElement('div');
    //outDiv.style.padding = '0px 0px 20px 0px';
    const host_group_num = e.item?.getModel().host_group_num,
      host_num = e.item?.getModel().host_num,
      create_at = e.item?.getModel().create_at;
    outDiv.innerHTML = `
    <div>
    <span>${t('operation.hostgn')}</span>
    <span>${host_group_num ?? '-'}</span>
    </div>
    <div>
    <span>${t('operation.hostn')}</span>
    <span>${host_num ?? '-'}</span>
    </div>
    <div>
    <span>${t('operation.creatim')}</span>
    <span>${create_at ?? '-'}</span>
    </div>
    `;
    return outDiv;
  },
  shouldBegin: (e: IG6GraphEvent) => {
    if (e.target.get('name') === 'rect-main') return true;
    return false;
  },
});
export const baseOption: GraphOptions = {
  container: '',
  renderer: 'svg',
  maxZoom: 1,
  modes: {
    default: ['zoom-canvas', 'drag-canvas'],
  },
  defaultNode: {
    type: 'card-node',
    size: [240, 32],
  },
  defaultEdge: {
    type: 'step-line',
  },
  plugins: [tooltip],
  layout: {
    type: 'indented',
    direction: 'LR',
    dropCap: false,
    indent: 300,
    getHeight: () => {
      return 10;
    },
  },
};

G6.registerNode('card-node', {
  draw: function drawShape(cfg: ModelConfig, group: IGroup) {
    const r = 12;
    const w = 240;
    const h = 32;
    const shape = group.addShape('rect', {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w,
        height: h,
        radius: r,
        fill: '#eee',
      },
      name: 'main-box',
    });
    group.addShape('dom', {
      attrs: {
        width: w,
        height: h,
        x: -w / 2,
        y: -h / 2,
        html: `
          <div style="padding:0 16px;width:${w}px;height:${h}px;display:flex;justify-content:space-between;align-items:center">
           <span>${cfg.name}</span>
           <span>${cfg.host_group_num ?? '-'}</span>
          </div>
                `,
      },
      name: 'dom-main',
    });
    group.addShape('rect', {
      attrs: {
        width: w,
        height: h,
        x: -w / 2,
        fill: '#fff',
        opacity: 0,
        y: -h / 2,
      },
      name: 'rect-main',
    });
    return shape;
  },
});
G6.registerEdge(
  'step-line',
  {
    getControlPoints: function getControlPoints(cfg: any) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      return [
        startPoint,
        {
          x: startPoint.x,
          y: endPoint.y,
        },
        endPoint,
      ];
    },
  },
  'polyline',
);
export const renderTree = (data) => {
  G6.Util.traverseTree(data, function (item) {
    item.id = String(item.id);
    if (item.items) {
      item.children = item.items;
    }
  });
  const graph = new G6.TreeGraph(
    Object.assign({}, baseOption, { container: document.getElementById('mountNodeTree')! }),
  );
  graph.data(data); // 读取 Step 2 中的数据源到图上
  graph.render(); // 渲染图
  graph.fitView();
  // if (typeof window !== 'undefined')
  //   window.onresize = () => {
  //     if (!graph || graph.get('destroyed')) return;
  //     const container = document.getElementById('mountNodeTree');
  //     if (!container) return;
  //     graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
  //   };
  return graph;
};
