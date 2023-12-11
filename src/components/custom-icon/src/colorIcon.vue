<template>
  <svg class="svg-icon icon" aria-hidden="true" :style="style">
    <use :xlink:href="type" />
  </svg>
</template>
<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 14,
    },
  });
  const style = {
    fontSize: `${Number(props.size)}px`,
  };
</script>
<style lang="less" scoped>
  .svg-icon {
    cursor: pointer;
  }
</style>
