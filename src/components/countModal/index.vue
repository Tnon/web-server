<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-27 15:18:25
 * @LastEditTime: 2023-03-17 17:11:15
-->
<template>
  <div>
    <template v-if="showItems && showItems.length">
      <template v-if="showItems.length === 1">
        <template v-if="isString(showItems[0])">
          <div class="rowTd" :title="showItems[0]" @click="jumpTo(showItems![0])">
            {{ label }}
            <span :class="{ canClick: !!itemCallback }"> {{ showItems[0] }}</span>
          </div>
        </template>
        <template v-else>
          <div class="rowTd" :title="showItems[0].name" @click="jumpTo((showItems![0] as any).id)">
            {{ label }}
            <span :class="{ canClick: !!itemCallback }"> {{ showItems[0].name }}</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="count" @click="showAllItems">{{ label }}{{ showItems.length }} </div>
      </template>
    </template>
    <template v-else> - </template>
  </div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { isString } from 'lodash';
  import { PropType, createVNode } from 'vue';
  import allItems from './allItems.vue';
  const props = defineProps({
    showItems: {
      type: Array as PropType<string[] | { id: number; name: string }[]>,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    label: String,
    itemCallback: Function,
  });
  const showAllItems = () => {
    useModal(
      {
        title: props.title,
        contentProps: {
          showItems: props.showItems,
          itemCallback: props.itemCallback,
        },
        footer: false,
      },
      createVNode(allItems),
    );
  };

  //跳转
  const jumpTo = (ip) => {
    props.itemCallback && props.itemCallback(ip);
  };
</script>

<style scoped lang="less">
  .count {
    cursor: pointer;
    color: @primary-color;
  }
  .rowTd {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .canClick {
    cursor: pointer;
    color: @primary-color;
  }
</style>
