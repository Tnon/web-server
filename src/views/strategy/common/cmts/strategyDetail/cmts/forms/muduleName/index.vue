<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-17 12:38:25
 * @LastEditTime: 2022-10-20 15:16:50
-->
<template>
  <div class="modulename">
    <custom-icon class="icon" :class="{ iconSuccessColor: successColor }" :type="moduleInfo.icon" />
    <span class="name" :class="{ nameSuccessColor: successColor }">{{ moduleInfo.title }}</span>
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed, ref } from 'vue';
  import { HttpData, StrategyPackage } from '@/views/strategy/common/cmts/strategyDetail/type';
  import { SwitchMode } from '@/views/strategy/common/types';
  const props = defineProps({
    strategyData: {
      type: Object as PropType<HttpData>,
      required: true,
    },
    moduleInfo: {
      type: Object as PropType<StrategyPackage>,
      required: true,
    },
  });
  //计算图标和name的颜色
  const successColor = computed(() => {
    const switchValueArr = ref<number[]>([]);
    props.moduleInfo.types.forEach((module) => {
      module.nodes.forEach((node) => {
        if (node.switch) {
          switchValueArr.value.push(props.strategyData[node.key]?.switch?.value as number);
        }
      });
    });
    if (switchValueArr.value.length) {
      return !switchValueArr.value.every((ele) => ele === SwitchMode.Close);
    } else {
      return true;
    }
  });
</script>

<style scoped lang="less">
  .modulename {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 16px 16px 0;
    .icon {
      margin-right: 8px;
      font-size: @fz18 !important;
      color: rgba(24, 186, 121, 0.5);
      transition: all 0.3s;
    }
    .name {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
    }
    .iconSuccessColor {
      color: rgba(24, 186, 121, 1) !important;
    }
    .nameSuccessColor {
      color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
