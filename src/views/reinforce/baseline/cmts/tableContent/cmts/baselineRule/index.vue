<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-23 14:33:43
 * @LastEditTime: 2023-03-21 12:04:56
-->
<template>
  <div :class="{ name: !!session_id }" @click="openRuleDetail" :title="label">{{ label }} </div>
</template>

<script setup lang="ts">
  import { getRulePartChecks } from '@/api/reinforce';
  import { useModal } from '@/hooks';
  import { createVNode } from 'vue';
  import baseDetail from '../baseDetail';
  const props = defineProps({
    title: String,
    desc: String,
    label: String,
    session_id: Number,
  });
  const openRuleDetail = () => {
    props.session_id &&
      useModal(
        {
          title: 'reinforce.jxtitle',
          footer: false,
          wrapClassName: 'noheadModal',
          width: 800,
          contentProps: {
            title: props.title,
            desc: props.desc,
            session_id: props.session_id,
            tableApi: getRulePartChecks,
          },
        },
        createVNode(baseDetail),
      );
  };
</script>

<style scoped lang="less">
  .name {
    cursor: pointer;
    color: @primary-color;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
