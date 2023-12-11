<template>
  <div class="all">
    <div id="container"> </div>
    <TeleportContainer />
  </div>
</template>

<script setup lang="ts">
  import { Graph, Path } from '@antv/x6';
  import { onMounted, PropType, ref, watchEffect, onUnmounted } from 'vue';
  import { register, getTeleport } from '@antv/x6-vue-shape';
  import flowNode from './nodes';
  import { NgavType, PathCi } from '@/views/ngav/flow/type';
  import { getNgavGraghData, getNgavGraghTimelineDataStatus } from '@/api/ngav';
  import { getContainerWidth } from '@/utils/tools';
  import { NodeIcon } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { getEdgeColor } from '.';

  const props = defineProps({
    selectedCiInfo: {
      type: Object as PropType<PathCi>,
      required: true,
    },
    roadWidth: {
      type: Number,
      required: true,
    },
    flowLoading: {
      type: Boolean,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
    getRecord: {
      type: Function,
      required: true,
    },
  });

  register({
    shape: 'custom-vue-node',
    component: flowNode,
  });

  Graph.registerConnector(
    'algo-connector',
    (s, e) => {
      const offset = 12;
      const deltaX = Math.abs(e.x - s.x);
      const control = Math.floor((deltaX / 4) * 3);
      const v1 = { x: s.x + offset + control, y: s.y };
      const v2 = { x: e.x - offset - control, y: e.y };
      return Path.normalize(
        `M ${s.x} ${s.y}
       L ${s.x} ${s.y}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y}
       L ${e.x} ${e.y}
      `,
      );
    },
    true,
  );
  const emit = defineEmits(['update:flowLoading']);
  const TeleportContainer = getTeleport();
  //实例
  const graphInstance = ref<Graph>();

  const containerWidth = ref<number>(0);

  const getNgavData = async (detail_id) => {
    emit('update:flowLoading', true);
    const { nodes, edges } = await getNgavGraghData({
      detail_id,
    });
    emit('update:flowLoading', false); //手动ip和进程节点loading
    //先清空节点
    graphInstance.value!.clearCells();
    let maxY = 0;
    nodes.forEach((ele, index) => {
      if (index) {
        ele.status = 0;
      }
      graphInstance.value!.addNode({
        shape: 'custom-vue-node',
        id: ele.id,
        x:
          ele.icon === NodeIcon.Host || ele.icon === NodeIcon.Ip
            ? 24
            : (ele.tuple.x - 1) * props.roadWidth + 224,
        y: ele.tuple.y * 250 + 16,
        data: Object.assign({}, ele, {
          record: props.record,
          getRecord: props.getRecord,
          detail_id,
        }),
        width: ele.icon === NodeIcon.Host || ele.icon === NodeIcon.Ip ? 152 : 272,
        height: 200,
        ports: {
          groups: {
            // 输入链接桩群组定义
            leftPort: {
              position: [0, 36],
              attrs: {
                circle: {
                  r: 1,
                  fill: '#fff',
                  stroke: 0,
                },
              },
            },
            //输出连接桩定义
            rightPort: {
              position: [ele.icon === NodeIcon.Host || ele.icon === NodeIcon.Ip ? 152 : 272, 36],
              attrs: {
                circle: {
                  r: 1,
                  fill: '#fff',
                  stroke: 0,
                },
              },
            },
          },
          items: [
            {
              id: 'left',
              group: 'leftPort',
            },
            {
              id: 'right',
              group: 'rightPort',
            },
          ],
        },
      });
      if (ele.tuple.y > maxY) {
        maxY = ele.tuple.y;
      }
    });
    edges.forEach((ele) => {
      const [startColor, endColor] = getEdgeColor(ele.edgeType);
      graphInstance.value!.addEdge({
        source: {
          cell: ele.source,
          port: 'right',
        },
        target: { cell: ele.target, port: 'left' },
        attrs: {
          fill: {
            connection: true,
            strokeWidth: 12,
            fill: 'none',
            stroke: {
              type: 'linearGradient',
              stops: [
                { offset: '0%', color: startColor },
                { offset: '100%', color: endColor },
              ],
            },
            id: 'patha',
          },
        },
        markup: [
          {
            tagName: 'path',
            selector: 'fill',
          },
        ],
      });
    });

    graphInstance.value?.resize(undefined, (maxY + 1) * 250 + 32);

    //请求状态的接口
    const { status_type } = await getNgavGraghTimelineDataStatus({
      detail_id,
      flag: NgavType.Flow,
    });
    if (status_type && status_type.length) {
      //从第二个开始更新
      nodes.forEach((ele, index) => {
        if (index) {
          const currentCell = graphInstance.value?.getCellById(ele.id);
          currentCell?.setData({
            status: status_type[index - 1],
          });
        }
      });
    }
  };
  //次数的id改变，重绘
  watchEffect(() => {
    props.selectedCiInfo.detail_id !== -1 && getNgavData(props.selectedCiInfo.detail_id);
  });
  onMounted(() => {
    //第一次计算宽度
    containerWidth.value = getContainerWidth(document.getElementById('container')!) - 80;
    window.onresize = () => {
      containerWidth.value = getContainerWidth(document.getElementById('container')!);
    };
    graphInstance.value = new Graph({
      container: document.getElementById('container')!,
      autoResize: true,
      interacting: {
        nodeMovable: false,
      },
      connecting: {
        connector: 'algo-connector',
        connectionPoint: 'anchor',
      },
    });
  });
  onUnmounted(() => {
    Graph.unregisterConnector('algo-connector');
  });
</script>
<style lang="less" scoped>
  #container {
    min-height: calc(100vh - 190px);
  }
</style>
