<template>
  <a-popover trigger="click" overlayClassName="popNoPad" placement="bottom" destroyTooltipOnHide>
    <template #content>
      <div class="hidContent">{{ text }}</div>
    </template>
    <div class="label">{{ text }}</div>
  </a-popover>
</template>

<script setup lang="ts">
  defineProps<{
    text: string;
  }>();
</script>

<style scoped lang="less">
  .label {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .hidContent {
    max-width: 300px;
    max-height: 300px;
    overflow: auto;
    word-break: break-all;
    padding: 8px;
  }
</style>
