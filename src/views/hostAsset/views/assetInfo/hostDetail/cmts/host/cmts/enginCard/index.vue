<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-10-19 10:04:53
 * @LastEditTime: 2022-12-26 16:47:17
-->
<template>
  <div class="container">
    <template v-for="(engin, enginName) in enginConfig" :key="enginName">
      <div class="card" v-if="acdr_enabled || enginName !== 'acdrengine'">
        <!-- 引擎名 start -->
        <div class="enginName">
          {{ t(`operation.${enginName}`) }}
        </div>
        <!-- 引擎名 end -->
        <!-- 版本、更新时间 start -->
        <div class="content">
          <div class="infoItem">
            <div class="label">{{ t('asset.versionInfo') }}</div>
            <div class="value">{{ enginInfo[engin.versionkey] }}</div>
          </div>
          <div class="infoItem">
            <div class="label">{{ t('asset.updDate') }}</div>
            <div class="value">{{ enginInfo[engin.timeKey] }}</div>
          </div>
        </div>
        <!-- 版本、更新时间 end -->
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { useProductLogo } from '@/store/modules/product-logo';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { enginConfig } from './index';
  defineProps({
    enginInfo: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
</script>
<style lang="less" scoped>
  .container {
    display: flex;
    justify-content: space-between;
    .card {
      flex: 1;
      height: 132px;
      padding: 16px 24px;
      margin-right: 16px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.08);

      .enginName {
        font-size: @fz14;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 16px;
      }
      .content {
        display: flex;
        .infoItem {
          flex: 1;
        }
        .label {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
          line-height: 20px;
          margin-bottom: 5px;
        }
        .value {
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 20px;
          min-height: 20px;
          // margin-bottom: 24px;
        }
      }
    }
  }
</style>
