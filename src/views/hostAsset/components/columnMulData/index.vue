<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 19:54:21
 * @LastEditTime: 2023-10-13 16:15:16
-->
<template>
  <div class="container">
    <!-- 前三条数据 start -->
    <div class="textItem" v-for="item in showData" :title="item" :key="item">
      {{ item }}
    </div>
    <!-- 前三条数据 end -->
    <!-- 剩余数据 start -->
    <div v-show="allVisible">
      <div class="textItem" v-for="item in hideData" :title="item" :key="item">
        {{ item }}
      </div>
    </div>
    <!-- 剩余数据 end -->
    <div @click="changeShow">
      <div class="iconAction" v-if="hideData.length && !allVisible">
        <down-outlined />
        <div>{{ t('asset.expendAll') }}</div>
      </div>
      <!-- 可通过旋转实现 -->
      <div class="iconAction" v-if="allVisible">
        <up-outlined />
        <div>{{ t('asset.fold') }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, PropType, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    dataList: {
      type: Array as PropType<string[]>,
      required: true,
    },
  });
  const { t } = useI18n();
  const showData = ref<string[]>([]); // 前三条数据
  const hideData = ref<string[]>([]); // 剩余隐藏数据
  const allVisible = ref<boolean>(false); // 是否所有可见

  watchEffect(() => {
    if (props.dataList && props.dataList.length > 3) {
      showData.value = props.dataList.slice(0, 3);
      hideData.value = props.dataList.slice(3);
    } else {
      showData.value = props.dataList ?? [];
    }
  });
  // 显隐切换
  const changeShow = () => {
    allVisible.value = !allVisible.value;
  };
</script>
<style lang="less" scoped>
  .textItem {
    margin-bottom: 4px;
    word-break: break-all;
  }
  .iconAction {
    width: fit-content;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: @primary-color;
  }
</style>
