<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:00:47
 * @LastEditTime: 2023-08-29 11:34:47
-->
<template>
  <a-drawer
    :rootStyle="{ filter: 'none' }"
    :title="title"
    :width="width ?? 640"
    :height="height ?? 640"
    :placement="placement ?? 'right'"
    :rootClassName="contentProps?.drawClass"
    v-model:open="open"
    :destroyOnClose="true"
    @after-open-change="openChange"
  >
    <component :is="content" v-bind="contentProps" :closeDraw="closeDraw" />
  </a-drawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const props = defineProps({
    remove: {
      type: Function,
    },
    title: {
      type: [String, Object],
    },
    contentProps: {
      type: Object,
    },
    content: Object,
    width: Number,
    height: Number,
    placement: String,
  });
  const open = ref<boolean>(true);
  const openChange = (v) => {
    if (!v) props.remove!();
  };
  const closeDraw = () => {
    open.value = false;
  };
</script>
