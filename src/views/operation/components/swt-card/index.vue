<!--
 * @Author: Delavin.TnT
 * @LastEditors: dailuxin
 * @Date: 2021-07-20 09:28:43
 * @LastEditTime: 2022-09-01 17:03:15
-->
<template>
  <div>
    <div class="header">
      <span class="title">
        <span>{{ t(title!) }}</span>
        <span class="subTitle" :title="subtitle">
          {{ subtitle }}
        </span>
        <span v-if="warning" class="warning">
          <InfoCircleOutlined />
          {{ warning }}
        </span>
      </span>
      <a-switch v-model:checked="isOpenCom" class="switchBox" @change="switchChange" />
    </div>
    <div class="content">
      <span class="fomlabel">{{ label }}</span>
      <span v-show="!isOpenCom" class="subTitle">
        {{ t('setting.setAOp') }}
      </span>
      <span v-show="isOpenCom">
        <slot></slot>
      </span>
      <a-button v-show="isOpenCom" class="cfmBtn" @click="confirm" type="primary">
        {{ t('common.save') }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    title: String,
    subtitle: String,
    label: String,
    isOpen: Boolean,
    warning: String,
  });
  const emit = defineEmits(['update:isOpen', 'confirm', 'switchChange']);
  const { t } = useI18n();
  const isOpenCom = computed({
    get: () => props.isOpen,
    set: (val) => emit('update:isOpen', val),
  });
  const confirm = () => {
    emit('confirm');
  };

  const switchChange = () => {
    emit('switchChange');
  };
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    padding: 0 24px;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    .title {
      display: flex;
    }
  }
  .content {
    padding: 24px 48px;
    display: flex;
    align-items: baseline;
  }
  .subTitle {
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    margin-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    // max-width: 500px;
    display: inline-flex;
  }
  .warning {
    font-size: @fz12;
    font-weight: 500;
    color: #f8a04c;
    // line-height: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    max-width: 400px;
    display: inline-block;
    margin-left: 10px;
  }
  .fomlabel {
    line-height: 34px;
    // width: 160px;
  }
  .cfmBtn {
    margin-left: 20px;
  }
</style>
