<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-04 09:38:07
 * @LastEditTime: 2021-08-04 09:41:55
-->
<template>
  <a-select
    :placeholder="placehodler"
    @change="changeSelect"
    :allowClear="allowClear"
    v-model:value="valueCmp"
    class="selectS"
  >
    <a-select-option v-for="item in options" :value="item.id" :key="item.id">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
  import { computed, ref, unref, watchEffect } from 'vue';

  const props = defineProps({
    options: [Object, Array],
    placehodler: String,
    value: [String, Number],
    allowClear: Boolean,
  });
  const emit = defineEmits(['changeValue', 'update:value']);
  //是否为默认策略
  const isInitPolicy = ref<boolean>(false);
  //判断列表中有没行数据的policy_id
  watchEffect(() => {
    isInitPolicy.value = props.options?.some((ele) => ele.id === props.value);
  });
  const changeSelect = (v) => {
    emit('changeValue', v);
  };
  const valueCmp = computed({
    get: () => {
      if (!unref(isInitPolicy)) {
        return undefined;
      }
      return props.value ?? undefined;
    },
    set: (val) => emit('update:value', val),
  });
</script>
<style lang="less" scoped>
  .selectS {
    width: 100%;
  }
</style>
