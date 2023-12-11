<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-28 17:10:05
 * @LastEditTime: 2022-10-31 11:09:10
-->
<template>
  <div>
    <!-- collapse头 start -->
    <div class="collapseHeader">
      <div>
        <slot name="header"></slot>
      </div>
      <div class="iconBox" @click="expendChange(collapseKey)">
        <RightOutlined class="expandIcon" :class="{ expanding: activeKey.includes(collapseKey) }" />
      </div>
    </div>
    <!-- collapse头 end -->
    <!-- collapse内容 start -->

    <slot name="content" v-if="activeKey.includes(collapseKey)"></slot>
    <!-- collapse内容 end -->
  </div>
</template>
<script lang="ts" setup>
  import { RightOutlined } from '@ant-design/icons-vue';

  defineProps({
    collapseKey: {
      type: String,
      required: true,
    },
    activeKey: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['expendChange']);
  // 折叠面板展开切换
  const expendChange = (key) => {
    emit('expendChange', key);
  };
</script>
<style lang="less" scoped>
  .collapseHeader {
    height: 48px; // 占位,折叠面板头,保证头部大部分区域都能点击
    line-height: 48px;
    font-size: @fz14;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .iconBox {
      flex: 1; // 占满剩余空间
      height: 100%; // 高度占满
      cursor: pointer;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .expandIcon {
        font-size: @fz12;
        color: #666;
        transition: all 0.2s;
      }
      .expanding {
        transform: rotateZ(90deg);
      }
    }
  }
</style>
