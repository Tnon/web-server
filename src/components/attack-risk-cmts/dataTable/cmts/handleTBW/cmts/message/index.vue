<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-15 19:42:10
 * @LastEditTime: 2023-02-15 20:02:02
-->
<template>
  <span>
    <div class="fir">
      <check-circle-filled class="oc" />
      {{ message }}
    </div>
    <div class="sec">{{ tips }}</div>
  </span>
</template>

<script setup lang="ts">
  import { CheckCircleFilled } from '@ant-design/icons-vue';
  defineProps({
    message: String,
    tips: String,
  });
</script>

<style scoped lang="less">
  .fir {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .sec {
    color: @warn-color;
  }
  .oc {
    color: @primary-color;
    margin-right: 3px;
  }
</style>
