<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 14:33:43
 * @LastEditTime: 2023-03-13 09:58:44
-->
<template>
  <div :class="{ name: !!rule_code }" @click="jumpto"> {{ percent }}</div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps({
    percent: String,
    rule_code: String,
    id: Number,
  });
  const router = useRouter();
  const jumpto = () => {
    props.rule_code &&
      router.push({
        name: 'reinforce-layout-baseline-detail',
        query: {
          id: props.id,
          type: 'check',
          rule_code: props.rule_code,
        },
      });
  };
</script>

<style scoped lang="less">
  .name {
    cursor: pointer;
    color: @primary-color;
  }
</style>
