<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:16
 * @LastEditTime: 2023-10-13 11:35:52
-->
<template>
  <a-button
    :class="{ errortipsBtn: !isDisabled && !totalConfigNum }"
    :label="checkInfo.label.title"
    :danger="!totalConfigNum"
    :disabled="isDisabled"
    @click="configCustom(configValues)"
    class="btn"
  >
    <template #icon><SettingOutlined /></template>
    {{ t('strategy.config') + totalConfigNum }}
  </a-button>
</template>

<script setup lang="ts">
  import { computed, PropType, reactive, unref, VNode } from 'vue';
  import { Ctype, HttpData, OptionType } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { Rounds, SwitchMode } from '@/views/strategy/common/types';
  import { useModal } from '@/hooks';
  import { useI18n } from 'vue-i18n';
  import { SettingOutlined } from '@ant-design/icons-vue';
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
          configValues?: any;
        }[];
        name: string;
        ctype?: Ctype;
      }>,
      required: true,
    },
    configValues: {
      type: Object as PropType<{
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
      }>,
      required: true,
    },
  });
  const { t } = useI18n();
  //自定义配置
  const configCustom = (configValues) => {
    const modelData = reactive({});
    configValues.data.forEach((ele) => {
      modelData[ele.name] = props.strategyData[props.nodeKey][ele.name];
    });
    useModal(
      {
        title: t('ngav.config'),
        width: 800,
        wrapClassName: 'modalBodyNopad',
        contentProps: {
          modelData,
        },
        handleOk: async (contRef) => {
          //验证和其他（整理数据）
          await unref(contRef).validateAll();
          //将表单数据合并到结构体
          configValues.data.forEach((ele) => {
            props.strategyData[props.nodeKey][ele.name] = unref(contRef).strategyDetal[ele.name];
          });
        },
      },
      configValues.component,
    );
  };
  //计算按钮是否禁用
  const isDisabled = computed(() => {
    if (props.checkInfo.optionType === OptionType.Checkbox) {
      return (
        !props.isEditing ||
        (props.switchInfo &&
          props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Close) ||
        !(props.strategyData[props.nodeKey][props.checkInfo.name].value as any).includes(
          props.configValues.byValue,
        )
      );
    } else {
      return (
        !props.isEditing ||
        (props.switchInfo &&
          props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Close) ||
        props.strategyData[props.nodeKey][props.checkInfo.name].value !== props.configValues.byValue
      );
    }
  });
  //计算配置了多少条
  const totalConfigNum = computed(() => {
    let total = 0;
    props.configValues.data.forEach((ele) => {
      if (
        ele.name !== 'time-cycle' &&
        ele.name !== 'time-dom' &&
        ele.name !== 'time-dow' &&
        ele.name !== 'time-range' &&
        ele.name !== 'basic-pwdlen'
      ) {
        total = total + (props.strategyData[props.nodeKey]?.[ele.name].value as any)?.length;
      } else {
        if (ele.name === 'time-cycle') {
          if (props.strategyData[props.nodeKey]['time-cycle'].value === Rounds.EveryDay) {
            total = total + (props.strategyData[props.nodeKey]['time-range'].value as any).length;
          } else if (props.strategyData[props.nodeKey]['time-cycle'].value === Rounds.Weekly) {
            total =
              total +
              (props.strategyData[props.nodeKey]['time-dow'].value as any).length *
                (props.strategyData[props.nodeKey]['time-range'].value as any).length;
          } else if (props.strategyData[props.nodeKey]['time-cycle'].value === Rounds.Monthly) {
            total =
              total +
              (props.strategyData[props.nodeKey]['time-dom'].value as any).length *
                (props.strategyData[props.nodeKey]['time-range'].value as any).length;
          }
        }
      }
    });
    return total;
  });
</script>

<style scoped lang="less">
  .btn {
    margin: 0 16px 0 0;
    padding: 4px 8px;
    height: 24px;
    line-height: 16px;
  }
</style>
