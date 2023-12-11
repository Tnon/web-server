<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 20:40:16
 * @LastEditTime: 2023-07-19 12:19:54
-->
<template>
  <a-radio-group
    class="cusRadio"
    :disabled="isDisabled"
    v-model:value="strategyData[nodeKey][modeInfo!.name].value"
  >
    <template v-for="mode in modeInfo!.options" :key="mode.value">
      <a-radio :value="mode.value">{{ mode.label }}</a-radio>
    </template>
  </a-radio-group>
</template>

<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { Ctype, HttpData } from '@/views/strategy/common/cmts/strategyDetail/type';
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
    modeInfo: {
      type: Object as PropType<{
        options: {
          label: string;
          value: string | number;
        }[];
        name: string;
        ctype: Ctype;
      }>,
    },
  });
  //计算是否禁用
  const isDisabled = computed(() => {
    return (
      !props.isEditing ||
      (props.switchInfo &&
        props.strategyData[props.nodeKey][props.switchInfo.name].value === SwitchMode.Close)
    );
  });
</script>

<style scoped lang="less">
  .cusRadio {
    :deep(.ant-radio-disabled + span) {
      color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
