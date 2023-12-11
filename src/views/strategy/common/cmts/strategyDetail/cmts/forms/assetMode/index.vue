<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:16
 * @LastEditTime: 2023-11-02 18:34:19
-->
<template>
  <div class="selectGroup" :class="{ successColor: !isDisabled }">
    <span class="label">{{ t('strategy.zxzq') }}</span>
    <!-- 周期类型 start -->
    <a-select
      size="small"
      class="select"
      :disabled="isDisabled"
      v-model:value="strategyData[nodeKey][checkInfo.name + '-period'].value"
      :options="period"
      :placeholder="t('ngav.zxkfs')"
    />
    <!-- 周期类型 start -->

    <!-- 周几 start -->
    <a-select
      v-if="strategyData[nodeKey][checkInfo.name + '-period'].value === 2"
      size="small"
      mode="multiple"
      :maxTagCount="3"
      class="select"
      :disabled="isDisabled"
      v-model:value="strategyData[nodeKey][checkInfo.name + '-day'].value"
      :options="day"
      :placeholder="t('ngav.zxkfs')"
    />
    <!-- 周几 start -->
    <!-- 时间 start -->
    <a-time-picker
      :disabled="isDisabled"
      v-model:value="currentTime"
      format="HH:mm"
      class="tiemPicker select"
      @change="addTime"
      value-format="HH:mm"
      :placeholder="t('strategy.riksjg')"
    />
    <!-- 时间 end -->

    <!-- 时间标签 start -->
    <div class="timeTags" :class="{ isDisabled }">
      <template
        v-for="(item, index) in strategyData[nodeKey][checkInfo.name + '-time'].value"
        :key="item"
      >
        <a-tag
          class="tagSelf"
          :class="{ dymicTag: !isDisabled }"
          :closable="!isDisabled"
          @close="closeTag(index)"
        >
          {{ item }}
        </a-tag>
      </template>
    </div>
    <!-- 时间标签 end -->
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed, ref, watch } from 'vue';
  import {
    AssetModes,
    Ctype,
    HttpData,
    OptionType,
  } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { SwitchMode } from '@/views/strategy/common/types';
  import { useI18n } from 'vue-i18n';
  import { getPeriod } from './index';
  import { customSome, timeHHMMbetween } from '@/utils/tools';
  import { message } from 'ant-design-vue';
  const props = defineProps({
    isEditing: {
      type: Boolean,
      required: true,
    },
    strategyData: {
      type: Object as PropType<HttpData>,
      required: true,
    },
    nodeKey: {
      type: String,
      required: true,
    },
    switchInfo: {
      type: Object as PropType<{ title: string; tips: string; name: 'switch'; ctype: Ctype }>,
    },
    checkInfo: {
      type: Object as PropType<{
        label: {
          icon: string;
          title: string;
        };
        optionType: OptionType;
        selectText?: string | undefined;
        options?: {
          label: string;
          value: string | number;
        }[];
        name: string;
        ctype?: Ctype;
      }>,
      required: true,
    },
  });
  const { t } = useI18n();
  const { period, day } = getPeriod(t);
  //当前的时间
  const currentTime = ref(null);

  //删除
  const closeTag = (index) => {
    (props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value as string[]).splice(
      index,
      1,
    );
  };

  //增加
  const addTime = (v) => {
    if (v) {
      let isLittle15 = false;
      isLittle15 = customSome(
        props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value as string[],
        (ele) => timeHHMMbetween([{ begin: v, end: ele }], 15),
      );
      if (!isLittle15) {
        (props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value as string[]).push(
          v,
        );
        currentTime.value = null;
      } else {
        currentTime.value = null;
        message.error(t('strategy.lisg15'));
      }
    }
  };
  //如果选择了推荐模式，默认2小时
  watch(
    () => props.strategyData[props.nodeKey].mode.value,
    (v) => {
      //推荐设置，
      if (v === AssetModes.Recommend) {
        props.strategyData[props.nodeKey][props.checkInfo.name + '-period'].value = 1;
        props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value = ['00:00'];
      }
    },
  );
  //计算是否disabled
  const isDisabled = computed(() => {
    return (
      !props.isEditing ||
      (props.switchInfo &&
        props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Close) ||
      props.strategyData[props.nodeKey].mode.value === AssetModes.Recommend
    );
  });
</script>

<style scoped lang="less">
  .selectGroup {
    padding-left: 124px;
    color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    .label {
      margin-right: 16px;
    }
    .select {
      margin-right: 16px;
      width: 160px;
    }
    :deep(.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
      color: rgba(0, 0, 0, 0.5);
    }
    .tiemPicker {
      height: 24px;
    }
    .isDisabled {
      .tagSelf {
        color: rgba(0, 0, 0, 0.25);
      }
    }
    .tagSelf {
      display: inline-block;
      cursor: pointer;
      position: relative;
      line-height: 22px;
      height: 24px;
      padding-right: 7px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      ::v-deep(.anticon) {
        transition: all 0.4s;
        position: absolute;
        right: 3px;
        top: 8px;
        transform: scale(0);
      }
    }
    .dymicTag {
      &:hover {
        padding-right: 20px;
        ::v-deep(.anticon) {
          transform: scale(1);
        }
      }
    }
  }
  .successColor {
    color: rgba(0, 0, 0, 0.8);
  }
</style>
