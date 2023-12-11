<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-28 16:04:02
 * @LastEditTime: 2023-07-13 10:29:58
-->
<template>
  <div class="timeBar">
    <div class="node attackCI">
      <slot></slot>
    </div>
    <div class="line" v-if="viewIsFlow"></div>
    <template v-if="viewIsFlow">
      <template v-for="(item, key) in state" :key="key">
        <div
          class="node"
          :style="{ backgroundColor: getbackColor(item.level) }"
          :ref="
            (el) => {
              nodeRefs[key] = el;
            }
          "
        >
          <div class="label">{{ item.action }}</div>
          <div class="time">{{ item.node_start_time }}</div>
        </div>
        <div class="line"></div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { getAttackTimeLine } from '@/api/ngav';
  import { PathCi } from '@/views/ngav/flow/type';
  import { ref, onMounted, onUnmounted, watchEffect, PropType, nextTick } from 'vue';
  import { NodeLevel } from '../antFlow/tools/type';
  import { I_Attack_TimeLine } from './type';
  const props = defineProps({
    roadWidth: {
      type: Number,
      required: true,
    },
    containerWidth: {
      type: Number,
      required: true,
    },
    selectedCiInfo: {
      type: Object as PropType<PathCi>,
      required: true,
    },
    viewIsFlow: {
      type: Boolean,
      required: true,
    },
  });
  //所有阶段的ref
  const nodeRefs = ref<any>([]);
  const emit = defineEmits(['update:roadWidth', 'update:containerWidth']);
  //攻击阶段数组
  const state = ref<I_Attack_TimeLine[]>([]);
  //获取时间轴
  const getTimeLine = async (detail_id) => {
    const { title_detail_list } = await getAttackTimeLine({ detail_id });
    state.value = title_detail_list ?? [];
    nextTick(() => {
      setRoadWidth();
    });
  };
  //获取宽度的方法
  const setRoadWidth = () => {
    if (nodeRefs.value.length) {
      // 每个涌到的宽度
      // const value = Math.floor(getContainerWidth(nodeRefs.value[0])) + 20;
      //最小320px
      emit('update:roadWidth', props.roadWidth);
      //计算最小总宽度
      emit('update:containerWidth', state.value.length * props.roadWidth + 200);
    }
  };
  watchEffect(() => {
    //根据攻击变化，获取
    props.selectedCiInfo.detail_id !== -1 &&
      props.viewIsFlow &&
      getTimeLine(props.selectedCiInfo.detail_id);
  });

  const getbackColor = (level) => {
    let backColor = '';
    switch (level) {
      case NodeLevel.Host: //主机色
        backColor = 'rgba(0,0,0,.2)';
        break;
      case NodeLevel.Ip: //IP颜色
        backColor = 'rgba(88,123,245,.2)';
        break;
      case NodeLevel.High: //进程 高危红色
        backColor = 'rgba(247,85,85,.2)';
        break;
      case NodeLevel.Middle: //进程 中危橙色
        backColor = 'rgba(248,165,86,.2)';
        break;
      case NodeLevel.Low: //进程 低危黄色
        backColor = 'rgba(246,200,77,.2)';
        break;
      case NodeLevel.NotDetection: //未检测到
        backColor = 'rgba(136,136,136,.2)';
        break;
      case NodeLevel.Safe: //进程 已处理绿色
        backColor = 'rgba(24,186,121,.2)';
        break;
      case NodeLevel.DunP: //盾牌 绿色
        backColor = 'rgba(24,186,121,.2)';
        break;
    }
    return backColor;
  };
  onMounted(() => {
    //第一次获取 需要减去 菜单宽度
    // getWidth();
    window.addEventListener('resize', setRoadWidth);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', setRoadWidth);
  });
</script>

<style scoped lang="less">
  .timeBar {
    // padding: 12px 0;
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    height: 66px;

    .node {
      flex: 320px 0 0;
      padding-left: 24px;
      min-width: 320px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .label {
        font-size: @fz12;
        font-weight: 600;
        /* 文字/黑0.85 */
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 4px;
      }
      .time {
        font-size: @fz12;
        font-weight: normal;
        /* 文字/黑0.55 */
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .level1 {
      background: rgba(246, 200, 77, 0.1);
    }
    .level2 {
      background: rgba(251, 126, 82, 0.1);
    }
    .level3 {
      background: rgba(247, 85, 85, 0.1);
    }
    .level4 {
      background: rgba(247, 85, 85, 0.1);
    }
    .line {
      width: 1px;
      // position: relative;
      // height: 66px;
      &::after {
        content: ' ';
        position: absolute;
        // right: 0;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
    .attackCI {
      align-self: center;
      flex: 200px 0 0;
      width: 200px;
      min-width: unset;
    }
  }
</style>
