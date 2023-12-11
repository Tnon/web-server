<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-27 15:24:28
 * @LastEditTime: 2023-03-17 17:21:26
-->
<template>
  <div class="container">
    <template v-for="item in showItems" :key="item">
      <template v-if="isString(showItems[0])">
        <div class="node" :class="{ canClick: !!itemCallback }" @click="jumpTo(item)">
          {{ item }}
        </div>
      </template>
      <template v-else>
        <div class="node" :class="{ canClick: !!itemCallback }" @click="jumpTo((item as any).id)">
          {{ (item as any).name }}
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { isString } from 'lodash';
  import { PropType } from 'vue';

  const props = defineProps({
    showItems: {
      type: Array as PropType<string[] | { id: number; name: string }[]>,
      required: true,
    },
    itemCallback: Function,
  });
  //跳转
  const jumpTo = (ip) => {
    props.itemCallback && props.itemCallback(ip);
  };
</script>

<style scoped lang="less">
  .container {
    min-height: 100px;
    max-height: 500px;
    overflow: auto;
  }
  .node {
    display: inline-block;
    padding: 2px 10px;
    background-color: #eee;
    border-radius: 6px;
    margin: 0 8px 8px 0;
  }

  .canClick {
    cursor: pointer;
    color: @primary-color;
  }
</style>
