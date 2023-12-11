<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-06-29 11:49:51
-->
<template>
  <div class="content" @click="openDetails">
    <span class="border"></span>
    <span class="title">{{ t('overview.statistics') }}</span>
    <DownOutlined :class="!fold ? 'isFold' : ''" class="arrow" />
    <div class="details">
      <staticDetail v-if="!fold" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { staticDetail } from './cmts';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    fold: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  });
  const emit = defineEmits(['update:fold']);
  const { t } = useI18n();
  const openDetails = () => {
    emit('update:fold', !props.fold);
  };
</script>
<style lang="less" scoped>
  .content {
    min-width: 130px;
    height: 40px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    cursor: pointer;
    position: relative;
    .border {
      display: inline-block;
      width: 4px;
      height: 16px;
      background: @danger-color;
      border-radius: 8px;
    }
    .title {
      font-size: @fz12;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin: 0 8px;
    }
    .arrow {
      font-size: @fz12;
      color: #666;
      transition: all 0.2s;
    }
    .isFold {
      transform: rotateZ(180deg);
    }
    .details {
      width: 100%;
      background: #fff;
      position: absolute;
      z-index: 11;
      top: 41px;
      left: 0;
      overflow: auto;
      box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.08);
      border-radius: 0 0 8px 8px;
    }
  }
</style>
