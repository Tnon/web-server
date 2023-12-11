<template>
  <i :class="`axsj ${type}`" class="iIcon" :style="style"></i>
</template>
<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: [Number, String],
      default: 14,
    },
  });
  const style = {
    fontSize: `${Number(props.size)}px`,
    color: props.color,
  };
</script>
<style lang="less" scoped>
  .iIcon {
    cursor: pointer;
  }
</style>
