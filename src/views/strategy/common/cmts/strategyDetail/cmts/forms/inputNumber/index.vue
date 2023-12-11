<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:16
 * @LastEditTime: 2023-10-13 11:36:43
-->
<template>
  <div class="selectGroup" :class="{ successColor: !isDisabled }">
    <!-- <a-select
      size="small"
      class="select"
      :disabled="isDisabled"
      v-model:value="strategyData[nodeKey][checkInfo.name].value"
      :options="checkInfo.options"
    /> -->
    <span>{{ checkInfo.selectText }}</span>
    <a-input-number
      size="small"
      class="select"
      :disabled="isDisabled"
      v-model:value="strategyData[nodeKey][checkInfo.name].value"
      :min="checkInfo.name === 'mem-usage' || checkInfo.name === 'cpu-usage' ? 1 : 51"
      :max="99"
    />
    %
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed, watch } from 'vue';
  import {
    AssetModes,
    Ctype,
    HttpData,
    OptionType,
  } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { SwitchMode } from '@/views/strategy/common/types';
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
  //如果选择了推荐模式，默认80%
  watch(
    () => props.strategyData[props.nodeKey].mode.value,
    (v) => {
      //推荐设置，默认2个小时
      if (v === AssetModes.Recommend) {
        // if (props.checkInfo.name === 'usage') {
        //   props.strategyData[props.nodeKey][props.checkInfo.name].value = 10;
        // } else if (props.checkInfo.name === 'account') {
        //   props.strategyData[props.nodeKey][props.checkInfo.name].value = 30;
        // } else {
        //   props.strategyData[props.nodeKey][props.checkInfo.name].value = 120;
        // }
        //cpu内存 熔断 推荐 90
        if (props.checkInfo.name === 'mem-usage' || props.checkInfo.name === 'cpu-usage') {
          props.strategyData[props.nodeKey][props.checkInfo.name].value = 90;
        } else {
          props.strategyData[props.nodeKey][props.checkInfo.name].value = 80;
        }
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
    .select {
      margin: 0 16px;
      border-radius: 8px;
    }
    :deep(.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .successColor {
    color: rgba(0, 0, 0, 0.8);
  }
</style>
