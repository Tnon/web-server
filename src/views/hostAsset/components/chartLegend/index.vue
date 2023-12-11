<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-09-13 10:53:34
 * @LastEditTime: 2022-09-29 16:38:27
-->
<template>
  <div>
    <div
      v-for="item in legendData"
      :key="item.name"
      class="legendItem"
      :class="{ grayItem: !item.itemStyle.isShow }"
      @click="changeLegend(item)"
    >
      <a-badge :color="item.itemStyle.isShow ? item.itemStyle.color : '#c3c3c3'" class="labBad" />
      <span class="label">{{ item.name }}：</span>
      <span class="value">
        <countTo class="childnumber" :endVal="item.value" />
        {{ t('asset.set') }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ChartNode } from '@/views/hostAsset/views/overview/type';
  defineProps({
    legendData: {
      type: Array as PropType<ChartNode[]>,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['changeLegend']);
  //选择legend
  const changeLegend = (item) => {
    // 选中状态切换时，对颜色变化做出响应
    item.itemStyle.isShow = !item.itemStyle.isShow;
    emit('changeLegend', item.name);
  };
</script>
<style lang="less" scoped>
  .legendItem {
    width: fit-content;
    margin: 12px 0;
    height: 24px;
    font-size: @fz14;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
  .grayItem {
    color: #c3c3c3;
  }
</style>
