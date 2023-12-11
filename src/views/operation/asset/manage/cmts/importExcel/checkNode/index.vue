<template>
  <div class="nodes">
    <div class="title">
      {{ nodes.title }}
    </div>
    <a-radio-group v-model:value="state[nodes.key]" class="cnt" :name="nodes.key">
      <template v-for="item in nodes.checkes" :key="item.value">
        <div class="mrRadio">
          <a-radio :value="item.value">{{ item.lable }}</a-radio>
        </div>
      </template>
    </a-radio-group>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { NodeItems } from '../formContent';
  defineProps({
    nodes: {
      type: Object as PropType<NodeItems>,
      required: true,
    },
    state: Object,
  });
</script>

<style lang="less" scoped>
  .nodes {
    padding: 16px;
    height: 85px;
    background: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 16px;
    .title {
      font-size: @fz12;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }
    .cnt {
      display: block;
    }
    .mrRadio {
      width: 50%;
      display: inline-block;
    }
  }
</style>
