<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-08 15:24:32
 * @LastEditTime: 2023-11-08 16:43:00
-->
<template>
  <div class="staticOverview">
    <!-- 全部主机 start -->
    <div class="allhost c_node">
      <custom-icon class="c_icon" type="#ax-host" />
      <div class="label">{{ t('common.allHost') }}</div>
      <count-to class="value" :endVal="123423452" />
      <img class="line first" src="../../imgs/Topline.svg" alt="" />
    </div>
    <!-- 全部主机 end -->

    <!-- 保护天数 start -->
    <div class="days c_node">
      <custom-icon class="c_icon" type="#ax-host" />
      <div class="label">{{ t('overview.tish') }}</div>
      <count-to class="value" :endVal="200" />
      <img class="line second" src="../../imgs/Topline.svg" alt="" />
    </div>
    <!-- 保护天数 end -->

    <!-- 在线主机 start -->
    <div class="online c_node">
      <custom-icon class="c_icon" type="#ax-host" />
      <div class="label">{{ t('overview.zdfl') }}</div>
      <count-to class="value" :endVal="200" />
    </div>
    <!-- 在线主机 end -->
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style scoped lang="less">
  .staticOverview {
    display: flex;
    align-items: center;
    margin-top: 80px;
    justify-content: center;
    .c_node {
      height: 120px;
      width: 240px;
      padding: 16px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-repeat: no-repeat;
      position: relative;
      background-position: center;
      .c_icon {
        width: 22px;
        height: 22px;
        color: @primary-color;
      }
      .label {
        margin-top: 8px;
        font-size: @fz14;
        font-weight: normal;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.6);
      }
      .value {
        font-family: D-DIN;
        font-size: @fz24;
        font-weight: bold;
        line-height: 32px;
        color: @primary-color;
      }
    }
    .line {
      height: 80px;
      position: absolute;
      z-index: 10;
    }
    .first {
      right: -4px;
    }
    .second {
      right: -4px;
    }
    .allhost,
    .online {
      width: 220px;
    }
    .allhost {
      background-image: url(../../imgs/TopCbox02.svg);
      background-size: 100%;
    }
    .days {
      background-image: url(../../imgs/TopCbox01.svg);
      background-size: 100%;
    }
    .online {
      .c_icon,
      .label,
      .value {
        z-index: 20;
      }
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(../../imgs/TopCbox02.svg);
        background-size: 100%;
        transform: rotateY(180deg);
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
  }
</style>
