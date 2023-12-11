<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-09 17:26:49
-->
<template>
  <div class="contrInfo">
    <div class="title">{{ t('setting.conMsg') }}</div>
    <a-row class="infoItem">
      <template v-for="(item, key) in contrInfo" :key="key">
        <a-col :span="6">
          <div class="infoTitle">{{ item.title }}</div>
          <div class="infoValue">{{ item.value }}</div>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { useContrInfo } from './index';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const contrInfo = useContrInfo(t);
</script>

<style lang="less" scoped>
  .contrInfo {
    width: 100%;
    height: 214px;
    padding: 16px 24px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 8px;
    margin: 16px 0;
    .infoItem {
      padding: 0 24px;
    }
    .infoTitle,
    .infoValue {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      line-height: 20px;
      margin: 8px 0;
    }
    .infoValue {
      color: rgba(0, 0, 0, 0.8);
    }
    .title {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
      margin-bottom: 40px;
    }
  }
</style>
