<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-12-26 20:19:40
 * @LastEditTime: 2022-12-29 12:48:57
-->
<template>
  <div class="cardDetail">
    <div class="modalHeader">
      <div class="cardTitle">{{ `${t('asset.netCard')}: ${cardInfo.eth_mac}` }}</div>
      <div class="selectButton" @click="selectCard(cardInfo.eth_mac)">
        {{ t('asset.viewFlowMonitor') }}
      </div>
    </div>
    <div class="modalContent">
      <template v-for="item in cardConfig" :key="item.key">
        <div class="itemBox">
          <div class="title">{{ item.label }}</div>
          <div class="value" v-if="item.key === 'eth_link_state'">
            {{ t(`${NetardStatusList[cardInfo.eth_link_state]}`) }}
          </div>
          <div class="value" v-else>
            {{
              Array.isArray(cardInfo[item.key])
                ? cardInfo[item.key].join('、') || '-'
                : cardInfo[item.key] || '-'
            }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { configData } from './index';
  import { NetardStatusList } from '@/enums/assetsType';

  const props = defineProps({
    cardInfo: {
      type: Object,
      required: true,
    },
    selectCard: Function,
    closeModal: Function,
  });
  const { t } = useI18n();
  const { cardConfig } = configData(t);

  // 查看流量监测即选择网卡
  const selectCard = (cardMac) => {
    props.selectCard!(cardMac);
    props.closeModal!();
  };
</script>
<style lang="less" scoped>
  .cardDetail {
    padding: 12px 24px;
  }
  .modalHeader {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cardTitle {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }
    .selectButton {
      margin-right: 24px;
      font-size: 13px;
      font-weight: 400;
      color: #18ba79;
      cursor: pointer;
    }
  }
  .modalContent {
    display: flex;
    flex-wrap: wrap;

    .itemBox {
      width: 50%;
      padding-right: 32px;
      margin-bottom: 24px;

      .title {
        width: 368px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 8px;
      }
      .value {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        white-space: normal; // 显式设置自己的white-space
        word-break: break-word;
      }
    }
  }
</style>
