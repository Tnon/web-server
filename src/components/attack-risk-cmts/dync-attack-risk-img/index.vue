<!--
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-08-18 20:07:36
 * @LastEditTime: 2022-09-24 14:05:26
-->
<template>
  <div class="ImgCon" :class="[size === 'large' ? 'large' : 'small']">
    <!-- 原攻击改为告警 -->
    <template v-if="imgType === 'alarm'">
      <template v-if="danger">
        <svg-icon class="content" name="ax-attck-rad" />
        <svg-icon class="cycle" name="ax-cycle-rad" />
      </template>
      <template v-else>
        <svg-icon class="content" name="ax-attck-green" />
        <svg-icon class="cycle" name="ax-cycle-green" />
      </template>
    </template>
    <!-- 原风险改为事件 -->
    <template v-else-if="imgType === 'event'">
      <template v-if="danger">
        <svg-icon class="content" name="ax-risk-orange" />
        <svg-icon class="cycle" name="ax-cycle-orange" />
      </template>
      <template v-else>
        <svg-icon class="content" name="ax-risk-green" />
        <svg-icon class="cycle" name="/ax-cycle-green" />
      </template>
    </template>
    <template v-else>
      <svg-icon class="content" name="ax-operation-green" />
      <svg-icon class="cycle" name="ax-cycle-green" />
    </template>
  </div>
</template>
<script lang="ts" setup>
  import svgIcon from '@/components/svg-icon/index.vue';
  defineProps({
    imgType: String,
    danger: Boolean,
    size: {
      type: String,
      default: 'large',
    },
  });
</script>
<style lang="less" scoped>
  .large {
    margin-right: 16px;
    width: 48px;
    height: 48px;
    .content {
      width: 44px;
      height: 44px;
    }
  }
  .small {
    margin-right: 10px;
    width: 32px;
    height: 32px;
    .content {
      width: 28px;
      height: 28px;
    }
  }
  .ImgCon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .cycle {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      animation: rotate 2s linear infinite;
    }
  }
  // @keyframes rotate {
  //   from {
  //     transform: rotate(0deg);
  //   }

  //   to {
  //     transform: rotate(360deg);
  //   }
  // }
</style>
