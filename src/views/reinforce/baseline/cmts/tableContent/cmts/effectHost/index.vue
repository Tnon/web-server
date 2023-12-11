<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 14:33:43
 * @LastEditTime: 2023-03-02 18:40:01
-->
<template>
  <div :class="{ name: !!rule_code }" @click="jumpto">{{ effect + ' / ' + total }} </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps({
    effect: Number,
    total: Number,
    id: Number,
    rule_code: String,
  });
  const router = useRouter();
  const jumpto = () => {
    props.rule_code &&
      router.push({
        name: 'reinforce-layout-baseline-detail',
        query: {
          id: props.id,
          type: 'ip',
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
