<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-13 10:50:21
 * @LastEditTime: 2023-03-22 19:58:50
-->
<template>
  <div class="node" :class="{ normal }" @click="jumpPage">
    <span class="iconP">
      <custom-icon :type="icon" class="topicon" size="24" />
    </span>
    <div>
      <div class="label">{{ title }}</div>
      <div class="number">
        <!-- {{ number }} -->
        <countTo :endVal="number" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const props = defineProps({
    icon: String,
    title: String,
    number: Number,
    normal: Boolean,
    router: {
      type: String,
      required: false,
    },
    itemKey: String,
  });

  const router = useRouter();
  const jumpPage = () => {
    // 如果是漏洞和风险，需要根据router字段进行跳转
    // 如果是资产相关的模块，根据itemKey字段进行跳转
    router.push({
      name: props.router
        ? `hostAsset-layout-${props.router}`
        : `hostAsset-layout-assetInfo-${props.itemKey}-viewPro`,
    });
  };
</script>

<style scoped lang="less">
  .node {
    padding: 8px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .iconP {
      margin-right: 8px;
      padding: 6px;
      border-radius: 6px;
      .topicon {
        font-size: @fz16 !important;
      }
    }

    .label {
      font-size: @fz13;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
    }
    .number {
      line-height: 24px;
    }
  }
</style>
