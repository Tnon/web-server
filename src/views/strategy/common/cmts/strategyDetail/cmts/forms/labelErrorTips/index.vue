<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 21:00:32
 * @LastEditTime: 2023-10-13 15:16:53
-->
<template>
  <div class="label">
    <custom-icon
      class="icon"
      :class="{ iconColorSuceess: colorSuceess }"
      :type="checkInfo.label.icon"
    />
    <span class="name" :class="{ nameColorSuceess: colorSuceess }">
      {{ checkInfo.label.title }}
    </span>
    <!-- 问号提示 start -->
    <a-tooltip placement="right" color="#fff" destroyTooltipOnHide v-if="checkInfo.label.tips">
      <template #title>
        <template v-if="isString(checkInfo.label.tips)">
          <span class="labelmsg_icon" v-html="checkInfo.label.tips"></span>
        </template>
        <template v-else>
          <component :is="checkInfo.label.tips" />
        </template>
      </template>
      <QuestionCircleOutlined />
    </a-tooltip>
    <!-- 问号提示 end -->
    <transition name="zoom-fade" mode="out-in" appear>
      <span class="errortips" :label="checkInfo.label.title" v-if="showErrTips">
        <template v-if="checkInfo.optionType === OptionType.InputNumber">
          {{ t('ngav.qpigjfz') }}
        </template>
        <template v-else-if="checkInfo.optionType === OptionType.Asset">
          {{ t('ngav.qpigjfza') }}
        </template>
        <template v-else>
          {{ t('ngav.lastonecfg') }}
        </template>
      </span>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed, VNode } from 'vue';
  import { Ctype, HttpData, OptionType } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { SwitchMode } from '@/views/strategy/common/types';
  import { useI18n } from 'vue-i18n';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { isString } from '@/utils/is';
  import { E_Round_Type } from '@/views/reinforce/baseline/views/task/cmts/taskForm/type';
  const { t } = useI18n();
  const props = defineProps({
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
          tips?: string | VNode;
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
  //计算是否显示错误提示
  const showErrTips = computed(() => {
    if (props.checkInfo.optionType === OptionType.Checkbox) {
      return (
        props.switchInfo &&
        props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Open &&
        (props.strategyData[props.nodeKey][props.checkInfo.name].value as any).length === 0
      );
    }
    if (props.checkInfo.optionType === OptionType.InputNumber) {
      return (
        props.switchInfo &&
        props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Open &&
        !(props.strategyData[props.nodeKey][props.checkInfo.name].value as any)
      );
    }
    if (props.checkInfo.optionType === OptionType.Asset) {
      if (props.strategyData[props.nodeKey][props.checkInfo.name + '-period'].value) {
        if (
          props.strategyData[props.nodeKey][props.checkInfo.name + '-period'].value ===
          E_Round_Type.Day
        ) {
          return !(
            props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value &&
            (props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value as string[])
              .length
          );
        } else {
          return !(
            props.strategyData[props.nodeKey][props.checkInfo.name + '-day'].value &&
            (props.strategyData[props.nodeKey][props.checkInfo.name + '-day'].value as number[])
              .length &&
            props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value &&
            (props.strategyData[props.nodeKey][props.checkInfo.name + '-time'].value as string[])
              .length
          );
        }
      } else {
        return true;
      }
    }
    return !!(
      props.switchInfo &&
      props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Open &&
      props.strategyData[props.nodeKey][props.checkInfo.name].value === undefined
    );
  });
  //计算图标的颜色
  const colorSuceess = computed(() => {
    if (props.switchInfo) {
      if (props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Open) {
        if (props.checkInfo.optionType === OptionType.Checkbox) {
          return (props.strategyData[props.nodeKey][props.checkInfo.name].value as any).length;
        } else {
          return props.strategyData[props.nodeKey][props.checkInfo.name].value !== undefined;
        }
      } else {
        return false;
      }
    } else {
      if (props.checkInfo.optionType === OptionType.Checkbox) {
        return (props.strategyData[props.nodeKey]?.[props.checkInfo.name].value as any)?.length;
      } else if (props.checkInfo.optionType === OptionType.Asset) {
        return (
          props.strategyData[props.nodeKey]?.[props.checkInfo.name + '-time']?.value as string[]
        ).length;
      } else {
        return props.strategyData[props.nodeKey]?.[props.checkInfo.name]?.value !== undefined;
      }
    }
  });
</script>

<style scoped lang="less">
  .label {
    padding-left: 96px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    .icon {
      font-size: @fz15 !important;
      margin-right: 8px;
      color: rgba(24, 186, 121, 0.5);
      transition: all 0.3s;
    }
    .name {
      font-size: @fz12;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      margin-right: 8px;
    }
    .errortips {
      font-size: @fz12;
      font-weight: 400;
      color: #f75555;
      margin-left: 16px;
    }
  }
  .nameColorSuceess {
    color: rgba(0, 0, 0, 0.8) !important;
  }
  .iconColorSuceess {
    color: rgba(24, 186, 121, 1) !important;
  }
  .labelmsg_icon {
    color: rgba(0, 0, 0, 0.8);
    padding: 4px;
  }
</style>
