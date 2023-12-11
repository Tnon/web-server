<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-27 10:30:04
 * @LastEditTime: 2023-08-29 19:04:28
-->
<template>
  <div class="cardList">
    <div
      class="card"
      v-for="card in netcardList"
      :key="card.eth_mac"
      :class="{ selectedCard: selectedCardMac === card.eth_mac }"
      @click="selectCard(card.eth_mac)"
    >
      <div class="cardTitle">
        <div class="cardName">{{ t('asset.netCard') }} {{ card.eth_name }}</div>
        <span class="detailButton" @click.stop="showCardDetail(card)">
          {{ t('asset.detail') }}
        </span>
      </div>
      <div class="columnOne">
        <div class="label">{{ t('asset.macAdress') }}</div>
        <div class="macValue">{{ card.eth_mac }}</div>
      </div>
      <div class="columnTwo">
        <div class="halfBox">
          <div class="label">{{ t('asset.ipv4') }}</div>
          <template v-if="card.eth_ipv4_list">
            <div class="value" :title="card.eth_ipv4_list.join('、')">
              {{ card.eth_ipv4_list.join('、') }}
            </div>
          </template>
          <template v-else>
            <div class="value">-</div>
          </template>
        </div>
        <div class="halfBox">
          <div class="label">{{ t('asset.ipv6') }}</div>
          <template v-if="card.eth_ipv6_list">
            <div class="value" :title="card.eth_ipv6_list.join('、')">
              {{ card.eth_ipv6_list.join('、') || '-' }}
            </div>
          </template>
          <template v-else>
            <div class="value">-</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import netCardDetail from '../netCardDetail/index';

  defineProps({
    netcardList: {
      type: Array as PropType<{ [k: string]: any }[]>,
      rquired: true,
    },
    selectedCardMac: {
      type: String,
      required: true,
    },
  });
  const emit = defineEmits(['update:selectedCardMac']);
  const { t } = useI18n();
  // 选择网卡
  const selectCard = (netcardMac) => {
    emit('update:selectedCardMac', netcardMac);
  };
  // 查看网卡详情
  const showCardDetail = (card) => {
    useModal(
      {
        title: `${t('asset.netCard')}: ${card.eth_name}`,
        width: 800,
        footer: false,
        contentProps: {
          cardInfo: card,
          selectCard,
        },
        wrapClassName: 'noheadModal',
      },
      netCardDetail,
    );
  };
</script>

<style lang="less" scoped>
  .cardList {
    width: 280px;
    // 560px - 48px -48px = 464px
    height: 552px;
    overflow: auto;
    .selectedCard {
      background: rgba(0, 0, 0, 0.08);
    }
    .card {
      // width: 280px;
      width: 100%;
      height: 168px;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      margin-bottom: 16px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      .cardTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .cardName {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        }
        .detailButton {
          font-size: 12px;
          font-weight: 400;
          color: @primary-color;
          cursor: pointer;
        }
      }
      .columnOne {
        margin-bottom: 16px;
      }
      .columnTwo {
        display: flex;

        .halfBox {
          flex: 0 0 50%;
          padding-right: 8px;
        }
      }
      .label {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
        margin-bottom: 8px;
      }
      .macValue {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
      .value {
        // (280px - 32px - 16px - 2px) / 2 = 115px;
        width: 115px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
