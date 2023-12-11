<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-24 10:21:53
 * @LastEditTime: 2023-08-24 10:24:26
-->
<template>
  <div class="initStatus">
    <div class="title">{{ t('report.ztmb') }}</div>
    <div class="item">
      <div class="add" @click="initData()">
        <PlusOutlined class="addIcon" />
        <span class="cus">{{ t('report.zdymb') }}</span>
      </div>
      <div class="ema">
        <div class="ematitle">{{ t('report.aqxjrb') }}</div>
        <div class="sub">{{ t('report.aqxjrbsub') }}</div>
        <div class="falg">{{ t('report.falg') }}</div>
        <div class="footer">
          <mail-outlined />
          <div class="sim">
            <CheckOutlined />
            <span class="text">{{ isHasXunjian ? t('report.ycj') : t('report.wcj') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PlusOutlined, MailOutlined, CheckOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  defineProps({
    initData: {
      type: Function,
      required: true,
    },
    isHasXunjian: {
      type: Boolean,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .initStatus {
    padding: 24px 40px;
    .title {
      font-size: @fz24;
      font-weight: 600;
      color: #000000;
      margin-bottom: 24px;
    }
    .item {
      display: flex;
      align-items: center;
    }
    .add {
      display: inline-flex;
      cursor: pointer;
      margin-right: 16px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 240px;
      height: 200px;
      border-radius: 8px;
      /* 控件/#000-4 */
      background: rgba(0, 0, 0, 0.04);

      .addIcon {
        font-size: 30px;
        margin-bottom: 8px;
      }
      .cus {
        color: #000000;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .ema {
      display: inline-block;
      width: 240px;
      height: 200px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid rgba(0, 0, 0, 0.08);
      padding: 16px;
      position: relative;
      .ematitle {
        font-size: @fz16;
        font-weight: 600;
        color: #000000;
      }
      .sub {
        font-size: @fz12;
        /* Font/黑0.4 */
        color: rgba(0, 0, 0, 0.4);
        margin: 12px 0;
      }
      .falg {
        color: @danger-color;
      }
      .footer {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 10px;
        justify-content: space-between;
        width: calc(100% - 32px);
        .sim {
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          .text {
            margin-left: 4px;
          }
        }
      }
    }
  }
</style>
