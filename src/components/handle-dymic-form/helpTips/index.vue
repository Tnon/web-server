<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 15:22:45
 * @LastEditTime: 2023-02-08 15:20:28
-->
<template>
  <a-popover
    placement="bottomRight"
    trigger="click"
    overlayClassName="popNoPad"
    destroyTooltipOnHide
  >
    <template #content>
      <div class="content">
        <!-- 头部 start -->
        <div class="header">{{ t('arcomn.helptps') }}</div>
        <!-- 头部 end -->
        <div class="ctt">
          <!-- 开关以及提示 start -->
          <div class="switch">
            <a-switch v-model:checked="openHelpCmp" />
            <span class="text">{{ t('arcomn.swytes') }}</span>
          </div>
          <!-- 开关以及提示 end -->
          <!-- 提示具体内容 start -->
          <template v-for="(item, key) in staticConfigs" :key="key">
            <div class="title">{{ t('arcomn.key' + key) }}</div>
            <template v-for="node in item" :key="node.label">
              <div class="formitem">
                <div class="label">{{ t('arcomn.' + node) }}</div>
                <div class="value" v-html="t('arcomn.' + node + '_tips')"></div>
              </div>
            </template>
          </template>
          <!-- 提示具体内容 end -->
        </div>
      </div>
    </template>
    <a-button type="text">
      <template #icon>
        <question-circle-outlined />
      </template>

      {{ t('arcomn.helptps') }}
    </a-button>
  </a-popover>
</template>

<script setup lang="ts">
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue';
  import { useStaticConfigs } from '.';
  const { t } = useI18n();
  const props = defineProps({
    openHelp: {
      type: Boolean,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  });
  //派发值
  const emit = defineEmits(['update:openHelp']);
  //计算属性
  const openHelpCmp = computed({
    get: () => props.openHelp,
    set: (v) => emit('update:openHelp', v),
  });
  //配置大全
  const staticConfigs = useStaticConfigs(props.type);
</script>

<style scoped lang="less">
  .content {
    width: 640px;
    max-height: 600px;
    overflow: auto;
    .header {
      height: 48px;
      padding: 0 16px;
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
    }
    .ctt {
      padding: 0 16px 16px 16px;
      .switch {
        padding: 8px 0 20px 0;
        border-bottom: 1px solid #f0f0f0;
        .text {
          font-size: @fz14;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          margin-left: 16px;
        }
      }
      .title {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin: 16px 0;
      }
      .formitem {
        margin-bottom: 8px;
        display: flex;
        align-items: flex-start;
        .label {
          flex: 120px 0 0;
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);
        }
        .value {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);
          white-space: pre-line;
        }
      }
    }
  }
</style>
