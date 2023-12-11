<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 19:54:21
 * @LastEditTime: 2023-10-13 16:15:22
-->
<template>
  <div class="container">
    <!-- 影响应用 start -->
    <div class="row">
      <div class="label">{{ t('reinforce.yxyy') }}</div>
      <div class="val">{{ dataSource.host_ip }}</div>
    </div>
    <!-- 影响应用 end-->
    <!-- 前三条数据 start -->
    <div class="textItem" v-for="item in showData" :title="item.name" :key="item.name">
      <!-- name start -->
      <div class="name">-{{ item.name }}</div>
      <!-- name end -->
      <!-- 当前版本 start -->
      <div class="labelVal">
        <div class="label">{{ t('reinforce.dqazbb') }}</div>
        <div class="val">{{ item.cur_version }}</div>
      </div>
      <!-- 当前版本 end -->
      <!-- 修复后版本 start -->
      <div class="labelVal">
        <div class="label">{{ t('reinforce.xfhbb') }}</div>
        <div class="val">{{ item.repaired_version }}</div>
      </div>
      <!-- 修复后版本 end -->
    </div>
    <!-- 前三条数据 end -->
    <!-- 剩余数据 start -->
    <div v-show="allVisible">
      <div class="textItem" v-for="item in hideData" :title="item.name" :key="item.name">
        <!-- name start -->
        <div class="name">-{{ item.name }}</div>
        <!-- name end -->
        <!-- 当前版本 start -->
        <div class="labelVal">
          <div class="label">{{ t('reinforce.dqazbb') }}</div>
          <div class="val">{{ item.cur_version }}</div>
        </div>
        <!-- 当前版本 end -->
        <!-- 修复后版本 start -->
        <div class="labelVal">
          <div class="label">{{ t('reinforce.xfhbb') }}</div>
          <div class="val">{{ item.repaired_version }}</div>
        </div>
        <!-- 修复后版本 end -->
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
  import { I_Apps } from './type';

  const props = defineProps({
    dataSource: {
      type: Object as PropType<{
        host_ip: string;
        apps: I_Apps[];
      }>,
      required: true,
    },
  });
  const { t } = useI18n();
  const showData = ref<I_Apps[]>([]); // 前三条数据
  const hideData = ref<I_Apps[]>([]); // 剩余隐藏数据
  const allVisible = ref<boolean>(false); // 是否所有可见

  watchEffect(() => {
    if (props.dataSource.apps.length > 3) {
      showData.value = props.dataSource.apps.slice(0, 3);
      hideData.value = props.dataSource.apps.slice(3);
    } else {
      showData.value = props.dataSource.apps;
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
  .row {
    display: flex;
    align-items: baseline;
    margin: 16px 0;
    .label {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 12px;
    }
  }
  .labelVal {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .label {
      margin: 0 12px;
    }
  }
  .name {
    font-weight: 600;
    margin-bottom: 12px;
    font-size: @fz14;
  }
</style>
