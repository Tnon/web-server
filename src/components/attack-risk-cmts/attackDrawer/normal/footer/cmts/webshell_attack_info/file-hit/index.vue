<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-28 19:01:59
 * @LastEditTime: 2023-04-19 17:25:56
-->
<template>
  <pre>
    <component :is="vnodeDom" />
  </pre>
</template>

<script setup lang="ts">
  import { bin2String } from '@/utils/tools';
  import { createVNode, PropType, ref, unref, VNode } from 'vue';
  import { moreIcon } from '.';
  const props = defineProps({
    fileContent: {
      type: Array as PropType<number[]>,
      required: true,
    },
    strings: {
      type: Array,
      required: true,
    },
  });
  //   //位置和长度的数组
  const positionArr = props.strings
    .map(({ offset, data }) => ({ offset, length: data.length }))
    .sort((pre, next) => pre.offset - next.offset);

  //vnode片段
  const vnodeArr = ref<{ content: string; flag: boolean }[]>([]);

  const finalPosArr: any = [];
  positionArr.forEach(({ offset, length }) => {
    const finalLast = finalPosArr[finalPosArr.length - 1];
    if (finalPosArr.length) {
      if (offset <= finalLast.offset + finalLast.length) {
        finalLast.length = length + offset - finalLast.offset;
      } else {
        finalPosArr.push({ offset, length });
      }
    } else {
      finalPosArr.push({ offset, length });
    }
  });

  let sliceNumber = 0;
  finalPosArr.forEach(({ offset, length }, index) => {
    if (offset - sliceNumber > 1000) {
      unref(vnodeArr).push({
        content: bin2String(props.fileContent.slice(sliceNumber, sliceNumber + 100)),
        flag: false,
      });
      unref(vnodeArr).push({
        content: '......',
        flag: false,
      });
      unref(vnodeArr).push({
        content: bin2String(props.fileContent.slice(offset - 100, offset)),
        flag: false,
      });
    } else {
      unref(vnodeArr).push({
        content: bin2String(props.fileContent.slice(sliceNumber, offset)),
        flag: false,
      });
    }

    unref(vnodeArr).push({
      content: bin2String(props.fileContent.slice(offset, offset + length)),
      flag: true,
    });
    sliceNumber = offset + length;
    if (index === finalPosArr.length - 1) {
      unref(vnodeArr).push({
        content: bin2String(props.fileContent.slice(sliceNumber, sliceNumber + 300)),
        flag: false,
      });
      unref(vnodeArr).push({
        content: '......',
        flag: false,
      });
    }
  });
  const renderVNodeDom = () => {
    const VNodeArr: VNode[] = [];
    unref(vnodeArr).forEach(({ content, flag }) => {
      if (content === '......') {
        VNodeArr.push(createVNode(moreIcon));
      } else {
        VNodeArr.push(createVNode('span', { style: { color: flag ? 'red' : '' } }, content));
      }
    });
    return VNodeArr;
  };
  //节点的虚拟dom
  const vnodeDom: VNode = createVNode('span', null, renderVNodeDom());
</script>
