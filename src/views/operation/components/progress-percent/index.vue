<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-08 15:43:14
 * @LastEditTime: 2023-08-11 15:13:57
-->
<template>
  <div>
    <!-- 文案和版本 start -->
    <div class="head">
      <span class="childtitle">{{ node.title }}</span>
      <span class="childversion" v-if="node.version">
        {{ node.version }}
      </span>
    </div>
    <!-- 文案和版本 end -->
    <div :style="{ color: node.color }">
      <!-- 数量和百分比 start -->
      <div class="childstatic">
        <countTo
          class="childnumber"
          :style="{ color: node.number ? node.color : 'rgba(0,0,0,.8)' }"
          :endVal="node.number"
        />
        <span
          :style="{ color: node.number ? node.color : 'rgba(0,0,0,.8)' }"
          class="childpercent"
          >{{ node.percent + '%' }}</span
        >
      </div>
      <!-- 数量和百分比 end -->
      <!-- 进度条 start -->
      <a-progress :strokeColor="node.color" :percent="Number(node.percent)" :show-info="false" />
      <!-- 进度条 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import countTo from '@/components/count-to';
  defineProps({
    node: Object as any,
  });
</script>

<style scoped lang="less">
  .head {
    display: flex;
    word-break: keep-all;
    .childtitle {
      font-size: @fz14;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
    }
    .childversion {
      display: inline-block;
      margin-left: 8px;
      background: rgba(24, 186, 121, 0.15);
      border-radius: 4px;
      font-size: @fz14;
      font-weight: 400;
      color: #18ba79;
      line-height: 24px;
      padding: 0 8px;
    }
  }

  .childstatic {
    margin: 16px 0 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .childnumber {
      font-size: @fz18;
      font-weight: 600;
      line-height: 24px;
    }
    .childpercent {
      font-size: @fz14;
      font-weight: 400;
      line-height: 24px;
    }
  }
</style>
