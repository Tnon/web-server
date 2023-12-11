<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:16
 * @LastEditTime: 2023-10-13 11:35:41
-->
<template>
  <a-checkbox-group
    :disabled="isDisabled"
    class="selectGroup"
    :value="strategyData[nodeKey]?.[checkInfo.name].value"
    @change="changeValue"
  >
    <template v-for="check in checkInfo.options" :key="check.value">
      <a-checkbox :value="check.value">{{ check.label }}</a-checkbox>
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
  </a-checkbox-group>
</template>

<script setup lang="ts">
  import { PropType, computed, createVNode, VNode } from 'vue';
  import { Ctype, HttpData, OptionType } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { SwitchMode } from '@/views/strategy/common/types';
  import { useModal } from '@/hooks';
  import { useI18n } from 'vue-i18n';
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
  const { t } = useI18n();
  const isDisabled = computed(() => {
    return (
      !props.isEditing ||
      (props.switchInfo &&
        props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Close)
    );
  });
  const changeValue = (v) => {
    //ngav采集点取消钩子
    if (props.checkInfo.name === 'behavior-collector') {
      if (
        v.length < (props.strategyData[props.nodeKey][props.checkInfo.name].value as any).length
      ) {
        useModal(
          {
            title: t('ngav.confirm'),
            handleOk: () => {
              props.strategyData[props.nodeKey][props.checkInfo.name].value = v;
            },
          },
          createVNode('span', null, t('ngav.cancjsf')),
        );
      } else {
        props.strategyData[props.nodeKey][props.checkInfo.name].value = v;
      }
    } else {
      props.strategyData[props.nodeKey][props.checkInfo.name].value = v;
    }
  };
</script>

<style scoped lang="less">
  .selectGroup {
    padding-left: 124px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .ant-checkbox-wrapper {
      margin-left: 0;
      margin-right: 16px;
    }
    :deep(.ant-checkbox-disabled + span) {
      color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
