<template>
  <div>
    <div @click="selectAll">
      <slot name="header"></slot>
    </div>
    <div class="line"></div>
    <!-- 分组树 start -->
    <a-tree
      :show-line="true"
      blockNode
      :fieldNames="fieldNames"
      :treeData="treeData"
      v-model:selectedKeys="selectedKeysCmp"
      @select="selectType"
    >
      <!-- 自定义图标 start -->
      <template #switcherIcon="{ expanded }">
        <RightOutlined :class="{ rot: expanded }" class="arrowIcon" />
      </template>
      <!-- 自定义图标 end -->
      <!-- 组信息 start -->
      <template #title="{ name, num }">
        <div
          class="node"
          :class="[num ? (handleType === HANDLETYPE.IGNORE ? 'health' : 'danger') : '']"
        >
          <span class="label" :title="name">{{ name }}</span>
          <span class="number" v-if="num" :title="num">{{ num }}</span>
        </div>
      </template>
      <!-- 组信息 end -->
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import { fieldNames } from './index';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { MODELTYPE, HANDLETYPE } from '@/enums/attack_risk';
  const props = defineProps({
    handleType: Number as PropType<HANDLETYPE>,
    //后期改
    treeData: Array,
    selectedKeys: String as PropType<MODELTYPE>,
  });
  const emit = defineEmits(['update:selectedKeys']);
  //选择树的节点
  const selectedKeysCmp = computed({
    get: () => [props.selectedKeys],
    set: (val) => {
      if (!val.length) {
        return;
      }
      emit('update:selectedKeys', val[0]);
    },
  });
  //选择全部
  const selectAll = () => {
    selectedKeysCmp.value = [MODELTYPE.ATTACKPATH];
  };
  //选择树的节点
  const selectType = (_, { selectedNodes }) => {
    if (!selectedNodes.length) {
      return;
    }
  };
</script>
<style lang="less" scoped>
  .line {
    margin: 16px 0;
    height: 1px;
    background: #eeeeee;
  }
  .node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-radius: 8px;
    .label,
    .number {
      height: 40px;
      // flex: 1;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      padding-left: 10px;
      // flex: 8;
    }
    .number {
      text-align: right;
      padding-right: 16px;
      // flex: 2;
    }
  }
  .arrowIcon {
    transition: all 0.3s;
    font-size: 10px;
    color: #666;
  }
  .rot {
    transform: rotate(90deg);
  }
</style>
