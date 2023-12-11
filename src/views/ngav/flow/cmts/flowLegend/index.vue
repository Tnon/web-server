<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-26 21:09:02
 * @LastEditTime: 2022-10-09 17:37:27
-->
<template>
  <div class="container">
    <div v-for="(type, key) in lengendData" :key="key">
      <div class="header">
        {{ t('ngav.legend' + key) }}
      </div>
      <div class="content">
        <div class="item" v-for="item in type" :key="item.font_class">
          <template v-if="item.font_class">
            <custom-icon
              :style="{ color: item.color ?? '#000', opacity: item.opacity ?? 1 }"
              class="icons"
              :type="'#ax-' + item.font_class"
            />
          </template>
          <template v-else>
            <div class="line" :style="{ background: item.color }"></div>
          </template>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useLengendData } from '.';
  const { t } = useI18n();
  const lengendData = useLengendData(t);
</script>

<style scoped lang="less">
  .container {
    padding: 16px;
    .header {
      font-size: @fz12;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 20px;
    }
    .content {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        .icons {
          margin-right: 10px;
          width: 50px;
          height: 50px;
          padding: 10px;
          border-radius: 50%;
          color: #000;
        }
        .line {
          margin-right: 10px;
          width: 40px;
          height: 2px;
          margin: 20px 10px;
        }
        .text {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
</style>
