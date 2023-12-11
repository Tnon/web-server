<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-06 16:10:07
 * @LastEditTime: 2023-11-09 17:41:10
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <div class="head">
      <current-time />
    </div>
    <!-- 头部 end -->
    <div class="main">
      <div class="left">
        <!-- 威胁告警分布 start -->
        <attack />
        <!-- 威胁告警分布 end -->

        <!-- 高风险主机top5 start -->
        <high-risk-top5 />
        <!-- 高风险主机top5 end -->

        <!-- 资产总览 start -->
        <asset-overview />
        <!-- 资产总览 end -->
      </div>
      <div class="center">
        <!-- 统计 start -->
        <static-overview />
        <!-- 统计 end -->

        <!-- 雷达 start -->
        <radar-group />
        <!-- 雷达 end -->

        <div class="footimg">
          <img src="./imgs/BottonPic.svg" alt="" />
        </div>
        <!-- 分组 start -->
        <group-list />
        <!-- 分组 end -->
      </div>
      <div class="right">
        <!-- 最新威胁消息 start -->
        <attack-table />
        <!-- 最新威胁消息 end -->

        <!-- cpu 内存 硬盘 start -->
        <cpu-mem-disk />
        <!-- cpu 内存 硬盘 end -->
      </div>
    </div>
    <!-- foot start -->
    <div class="foot">
      <img src="./imgs/Bottonbox.svg" alt="" />
    </div>
    <!-- foot end -->
  </div>
</template>

<script setup lang="ts">
  import currentTime from './cmts/currentTime';
  import attack from './cmts/attack';
  import highRiskTop5 from './cmts/highRiskTop5';
  import assetOverview from './cmts/assetOverview';
  import staticOverview from './cmts/staticOverview';
  import radarGroup from './cmts/radarGroup';
  import groupList from './cmts/groupList';
  import attackTable from './cmts/attackTable';
  import cpuMemDisk from './cmts/cpuMemDisk';
</script>

<style scoped lang="less">
  .container {
    background-image: url(./imgs/BG.png);
    height: 100vh;
    width: 100vw;
    min-width: 1920px;
    min-height: 1080px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #000;
    .head {
      display: flex;
      height: 64px;
      align-items: center;
      padding: 0 24px;
      justify-content: end;
      background-image: url(./imgs/NavTItle.svg), url(./imgs/Topbox.png);
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      width: 100vw;
      z-index: 1;
      background-size: auto, 100% 100%;
    }
    .main {
      padding: 0 16px;
      display: flex;
      // align-items: center;
      .left {
        width: 25.625vw;
        height: 100vh;
        min-width: 492px;
        min-height: 1080px;
        max-width: 45.555vh;
        max-height: 56.25vw;
        padding-top: 62px;
        background-image: url(./imgs/Leftbox.png);
        background-size: 100% 100%;
      }
      .center {
        flex: 904;
        .footimg {
          display: flex;
          justify-content: center;
          margin-top: -50px;
        }
      }
      .right {
        width: 25.625vw;
        height: 100vh;
        min-width: 492px;
        min-height: 1080px;
        max-width: 45.555vh;
        max-height: 56.25vw;
        padding-top: 62px;
        padding-left: 60px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: end;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-image: url(./imgs/Leftbox.png);
          background-size: 100% 100%;
          transform: rotateZ(180deg);
        }
      }
    }
    .foot {
      width: 100%;
      height: 32px;
      position: absolute;
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
