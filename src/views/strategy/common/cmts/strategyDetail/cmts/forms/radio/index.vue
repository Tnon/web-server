<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:16
 * @LastEditTime: 2023-10-13 14:17:14
-->
<template>
  <a-radio-group
    :disabled="isDisabled"
    class="selectGroup"
    v-model:value="strategyData[nodeKey][checkInfo.name].value"
  >
    <template v-for="check in checkInfo.options" :key="check.value">
      <a-radio :value="check.value">{{ check.label }}</a-radio>
      <buttom-mode
        v-if="check && check.configValues"
        :isEditing="isEditing"
        :strategyData="strategyData"
        :nodeKey="nodeKey"
        :switchInfo="switchInfo"
        :checkInfo="checkInfo"
        :configValues="check.configValues"
      />
    </template>
  </a-radio-group>
</template>

<script setup lang="ts">
  import { PropType, computed, VNode, unref } from 'vue';
  import {
    Ctype,
    HttpData,
    Modes,
    OptionType,
  } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { SwitchMode } from '@/views/strategy/common/types';
  import buttomMode from '../button';
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
          configValues?: {
            //要弹窗的组件
            component: VNode;
            //根据哪个值显示
            byValue: string | number;
            //数据
            data: {
              //字段标识
              name: string;
              //ctype
              ctype: Ctype;
            }[];
          };
        }[];
        name: string;
        ctype?: Ctype;
      }>,
      required: true,
    },
  });
  //特殊：ACDR事件分析仅上报模式下，事件拦截深度不可选择
  const isNgav = computed(() => {
    return (
      props.nodeKey === 'ngav-engine-event-analysis' &&
      props.checkInfo.name === 'interception-depth' &&
      props.strategyData[props.nodeKey].mode.value === Modes.OnlyReport
    );
  });
  //计算是否是禁用状态

  const isDisabled = computed(() => {
    return (
      !props.isEditing ||
      (props.switchInfo &&
        props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Close) ||
      unref(isNgav)
    );
  });
</script>

<style scoped lang="less">
  .selectGroup {
    padding-left: 124px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .ant-radio-wrapper {
      margin-right: 16px;
    }

    :deep(.ant-radio-disabled + span) {
      color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
