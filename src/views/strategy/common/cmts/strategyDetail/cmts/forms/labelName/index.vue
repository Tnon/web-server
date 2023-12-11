<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-17 12:38:25
 * @LastEditTime: 2022-10-20 15:17:40
-->
<template>
  <div class="labelname" :class="{ successColor }">{{ typesInfo.title }}</div>
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
    typesInfo: {
      type: Object as PropType<StrategyPackage['types'][number]>,
      required: true,
    },
  });
  //计算labelname的颜色
  const successColor = computed(() => {
    const switchValueArr = ref<number[]>([]);
    props.typesInfo.nodes.forEach((node) => {
      if (node.switch) {
        switchValueArr.value.push(props.strategyData[node.key]?.switch?.value as number);
      }
    });
    if (switchValueArr.value.length) {
      return !switchValueArr.value.every((ele) => ele === SwitchMode.Close);
    } else {
      return true;
    }
  });
</script>

<style scoped lang="less">
  .labelname {
    margin: 8px 0;
    padding-left: 48px;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
  }
  .successColor {
    color: rgba(0, 0, 0, 0.8);
  }
</style>
